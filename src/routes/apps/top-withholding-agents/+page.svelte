<script lang="ts">
	import { Select, Tooltip } from 'bits-ui';
	import { browser } from '$app/environment';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import taxpayers from '$lib/data/taxpayers.json';

	type Taxpayer = { name: string; rdo: string; type: string; date: string; state: string };

	const data: Taxpayer[] = taxpayers as Taxpayer[];
	const pageSize = 50;

	// Extract unique RDOs and dates for dropdowns (static, computed once)
	const uniqueRdos = [...new Set(data.map((t) => t.rdo))].sort((a, b) => parseInt(a) - parseInt(b));
	const uniqueDates = [...new Set(data.map((t) => t.date))].sort();
	const validTypes = new Set(['all', 'Individual', 'Non-Individual']);
	const validStates = new Set(['all', 'added', 'removed', 'existing']);
	const validRdos = new Set(['all', ...uniqueRdos]);
	const validDates = new Set(['all', ...uniqueDates]);
	const validSortCols = new Set(['name', 'rdo', 'type', 'date', 'state']);

	// Initialize from URL params
	function getInitialParams() {
		if (!browser) return {};
		const p = new URLSearchParams(window.location.search);
		return {
			q: p.get('q') ?? '',
			type: validTypes.has(p.get('type') ?? '') ? p.get('type')! : 'all',
			state: validStates.has(p.get('state') ?? '') ? p.get('state')! : 'all',
			rdo: validRdos.has(p.get('rdo') ?? '') ? p.get('rdo')! : 'all',
			date: validDates.has(p.get('date') ?? '') ? p.get('date')! : 'all',
			sort: validSortCols.has(p.get('sort') ?? '') ? p.get('sort')! : 'name',
			dir: p.get('dir') === 'desc' ? 'desc' as const : 'asc' as const,
			page: Math.max(1, parseInt(p.get('page') ?? '1', 10) || 1)
		};
	}

	const init = getInitialParams();

	// Items arrays for bits-ui Select
	const typeItems = [
		{ value: 'all', label: 'All Types' },
		{ value: 'Individual', label: 'Individual' },
		{ value: 'Non-Individual', label: 'Non-Individual' }
	];
	const rdoItems = [
		{ value: 'all', label: 'All RDOs' },
		...uniqueRdos.map((r) => ({ value: r, label: r }))
	];
	const stateItems = [
		{ value: 'all', label: 'All Status' },
		{ value: 'added', label: 'Added' },
		{ value: 'removed', label: 'Removed' },
		{ value: 'existing', label: 'Existing' }
	];
	const dateItems = [
		{ value: 'all', label: 'All Dates' },
		...uniqueDates.map((d) => ({ value: d, label: formatDate(d) }))
	];

	function labelFor(items: { value: string; label: string }[], value: string): string {
		return items.find((i) => i.value === value)?.label ?? '';
	}

	// Filter state
	let searchInput = $state(init.q ?? '');
	let debouncedSearch = $state(init.q ?? '');
	let typeFilter = $state<'all' | 'Individual' | 'Non-Individual'>((init.type ?? 'all') as 'all' | 'Individual' | 'Non-Individual');
	let stateFilter = $state<'all' | 'added' | 'removed' | 'existing'>((init.state ?? 'all') as 'all' | 'added' | 'removed' | 'existing');
	let dateFilter = $state(init.date ?? 'all');
	let rdoFilter = $state(init.rdo ?? 'all');
	let sortColumn = $state<'name' | 'rdo' | 'type' | 'date' | 'state'>((init.sort ?? 'name') as 'name' | 'rdo' | 'type' | 'date' | 'state');
	let sortDirection = $state<'asc' | 'desc'>(init.dir ?? 'asc');
	let currentPage = $state(init.page ?? 1);

	// Debounce search input
	$effect(() => {
		const value = searchInput;
		const timeout = setTimeout(() => {
			debouncedSearch = value;
		}, 300);
		return () => clearTimeout(timeout);
	});

	// Sync state to URL
	$effect(() => {
		if (!browser) return;
		const url = new URL(window.location.href);
		const params = url.searchParams;

		// Read all reactive values
		const q = debouncedSearch;
		const t = typeFilter;
		const s = stateFilter;
		const d = dateFilter;
		const r = rdoFilter;
		const sc = sortColumn;
		const sd = sortDirection;
		const p = currentPage;

		// Set or delete params (omit defaults)
		q ? params.set('q', q) : params.delete('q');
		t !== 'all' ? params.set('type', t) : params.delete('type');
		s !== 'all' ? params.set('state', s) : params.delete('state');
		d !== 'all' ? params.set('date', d) : params.delete('date');
		r !== 'all' ? params.set('rdo', r) : params.delete('rdo');
		sc !== 'name' ? params.set('sort', sc) : params.delete('sort');
		sd !== 'asc' ? params.set('dir', sd) : params.delete('dir');
		p > 1 ? params.set('page', String(p)) : params.delete('page');

		window.history.replaceState({}, '', url);
	});

	// Filtered data with fuzzy search scores
	let filtered = $derived.by(() => {
		let result: (Taxpayer & { _fuzzyScore?: number })[] = data;

		if (debouncedSearch) {
			result = result
				.map((t) => ({ ...t, _fuzzyScore: fuzzyMatch(debouncedSearch, t.name) }))
				.filter((t) => t._fuzzyScore! >= 0);
		}

		if (typeFilter !== 'all') {
			result = result.filter((t) => t.type === typeFilter);
		}

		if (stateFilter !== 'all') {
			result = result.filter((t) => t.state === stateFilter);
		}

		if (dateFilter !== 'all') {
			result = result.filter((t) => t.date === dateFilter);
		}

		if (rdoFilter !== 'all') {
			result = result.filter((t) => t.rdo === rdoFilter);
		}

		return result;
	});

	// Reset page when filters change (but not on initial load)
	let filtersInitialized = false;
	$effect(() => {
		debouncedSearch;
		typeFilter;
		stateFilter;
		dateFilter;
		rdoFilter;
		if (filtersInitialized) {
			currentPage = 1;
		}
		filtersInitialized = true;
	});

	// Sorted data (fuzzy score takes priority when searching)
	let sorted = $derived.by(() => {
		const col = sortColumn;
		const dir = sortDirection;
		const isSearching = !!debouncedSearch;
		return [...filtered].sort((a, b) => {
			// When searching, best fuzzy matches come first
			if (isSearching) {
				const scoreDiff = (a._fuzzyScore ?? 0) - (b._fuzzyScore ?? 0);
				if (scoreDiff !== 0) return scoreDiff;
			}
			let cmp: number;
			if (col === 'rdo') {
				cmp = parseInt(a.rdo) - parseInt(b.rdo);
			} else {
				const aVal = a[col];
				const bVal = b[col];
				if (aVal < bVal) cmp = -1;
				else if (aVal > bVal) cmp = 1;
				else cmp = 0;
			}
			return dir === 'asc' ? cmp : -cmp;
		});
	});

	let totalPages = $derived(Math.ceil(filtered.length / pageSize));

	let paginated = $derived.by(() => {
		const start = (currentPage - 1) * pageSize;
		return sorted.slice(start, start + pageSize);
	});

	let hasActiveFilters = $derived(
		searchInput !== '' ||
			typeFilter !== 'all' ||
			stateFilter !== 'all' ||
			dateFilter !== 'all' ||
			rdoFilter !== 'all'
	);

	function toggleSort(column: typeof sortColumn) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'asc';
		}
	}

	function clearFilters() {
		searchInput = '';
		debouncedSearch = '';
		typeFilter = 'all';
		stateFilter = 'all';
		dateFilter = 'all';
		rdoFilter = 'all';
	}

	function formatDate(iso: string): string {
		const d = new Date(iso + 'T00:00:00');
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	/** Fuzzy match: returns a score (lower = better) or -1 if no match. */
	function fuzzyMatch(query: string, target: string): number {
		const q = query.toLowerCase();
		const t = target.toLowerCase();
		let qi = 0;
		let score = 0;
		let lastMatchIndex = -1;

		for (let ti = 0; ti < t.length && qi < q.length; ti++) {
			if (t[ti] === q[qi]) {
				score += ti === lastMatchIndex + 1 ? 0 : ti - (lastMatchIndex + 1);
				lastMatchIndex = ti;
				qi++;
			}
		}

		return qi === q.length ? score : -1;
	}

	function sortIndicator(column: typeof sortColumn): string {
		if (sortColumn !== column) return '';
		return sortDirection === 'asc' ? ' \u2191' : ' \u2193';
	}
</script>

<Seo
	title="Top Withholding Agents | AccounTech"
	description="Searchable directory of BIR-designated Top Withholding Agents in the Philippines. Filter by name, RDO, type, status, or publication date."
/>

<Nav />

<main class="bg-base min-h-screen">
	<div class="mx-auto px-5 sm:px-6 pt-28 pb-20 max-w-7xl">
		<!-- Breadcrumb -->
		<nav class="relative mb-6 text-sm" aria-label="Breadcrumb">
			<ol class="flex items-center gap-2 text-muted">
				<li><a href="/apps" class="hover:text-heading transition-colors">Apps</a></li>
				<li class="text-faint">/</li>
				<li class="text-heading">Top Withholding Agents</li>
			</ol>
		</nav>

		<!-- Page header -->
		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">BIR Reference</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				Top Withholding Agents
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				Searchable directory of BIR-designated Top Withholding Agents in the Philippines. Filter by
				name, RDO, type, status, or publication date.
			</p>
			<p class="mt-3 max-w-2xl text-muted text-xs">
				Note: Names and RDOs may contain errors as this data was extracted from
				<a href="https://www.bir.gov.ph/list" target="_blank" rel="noopener noreferrer" class="text-teal hover:underline">BIR PDF documents</a>. Make sure to check your nearest RDO for details.
			</p>
		</header>

		<!-- Filter bar -->
		<div class="flex flex-wrap items-center gap-3 mb-6">
			<!-- Name search -->
			<div class="relative">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="top-1/2 left-3 absolute text-muted -translate-y-1/2 pointer-events-none"
				>
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
				<input
					type="text"
					placeholder="Fuzzy search by name..."
					bind:value={searchInput}
					class="bg-field py-2 pr-3 pl-9 border border-divider focus:border-teal rounded-full focus:outline-none w-64 text-heading placeholder:text-muted text-sm"
				/>
			</div>

			<!-- Type dropdown -->
			<Select.Root type="single" items={typeItems} bind:value={typeFilter}>
				<Select.Trigger class="inline-flex items-center gap-2 bg-field px-3 py-2 border border-divider data-[state=open]:border-teal rounded-full text-heading text-sm cursor-pointer">
					{labelFor(typeItems, typeFilter)}
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><polyline points="6 9 12 15 18 9" /></svg>
				</Select.Trigger>
				<Select.Portal>
					<Select.Content class="z-50 bg-surface shadow-black/20 shadow-lg p-1 border border-divider rounded-lg" sideOffset={4}>
						<Select.Viewport class="max-h-60 overflow-y-auto">
							{#each typeItems as item (item.value)}
								<Select.Item value={item.value} label={item.label} class="data-highlighted:bg-elevated px-3 py-1.5 rounded-md outline-none text-body data-highlighted:text-heading data-selected:text-teal text-sm cursor-pointer">
									{item.label}
								</Select.Item>
							{/each}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>

			<!-- RDO dropdown -->
			<Select.Root type="single" items={rdoItems} bind:value={rdoFilter}>
				<Select.Trigger class="inline-flex items-center gap-2 bg-field px-3 py-2 border border-divider data-[state=open]:border-teal rounded-full max-w-64 text-heading text-sm truncate cursor-pointer">
					<span class="truncate">{labelFor(rdoItems, rdoFilter)}</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted shrink-0"><polyline points="6 9 12 15 18 9" /></svg>
				</Select.Trigger>
				<Select.Portal>
					<Select.Content class="z-50 bg-surface shadow-black/20 shadow-lg p-1 border border-divider rounded-lg" sideOffset={4}>
						<Select.ScrollUpButton class="flex justify-center py-1 text-muted">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
						</Select.ScrollUpButton>
						<Select.Viewport class="max-h-60 overflow-y-auto">
							{#each rdoItems as item (item.value)}
								<Select.Item value={item.value} label={item.label} class="data-highlighted:bg-elevated px-3 py-1.5 rounded-md outline-none text-body data-highlighted:text-heading data-selected:text-teal text-sm cursor-pointer">
									{item.label}
								</Select.Item>
							{/each}
						</Select.Viewport>
						<Select.ScrollDownButton class="flex justify-center py-1 text-muted">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
						</Select.ScrollDownButton>
					</Select.Content>
				</Select.Portal>
			</Select.Root>

			<!-- State dropdown -->
			<Select.Root type="single" items={stateItems} bind:value={stateFilter}>
				<Select.Trigger class="inline-flex items-center gap-2 bg-field px-3 py-2 border border-divider data-[state=open]:border-teal rounded-full text-heading text-sm cursor-pointer">
					{labelFor(stateItems, stateFilter)}
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><polyline points="6 9 12 15 18 9" /></svg>
				</Select.Trigger>
				<Select.Portal>
					<Select.Content class="z-50 bg-surface shadow-black/20 shadow-lg p-1 border border-divider rounded-lg" sideOffset={4}>
						<Select.Viewport class="max-h-60 overflow-y-auto">
							{#each stateItems as item (item.value)}
								<Select.Item value={item.value} label={item.label} class="data-highlighted:bg-elevated px-3 py-1.5 rounded-md outline-none text-body data-highlighted:text-heading data-selected:text-teal text-sm cursor-pointer">
									{item.label}
								</Select.Item>
							{/each}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>

			<!-- Date dropdown -->
			<Select.Root type="single" items={dateItems} bind:value={dateFilter}>
				<Select.Trigger class="inline-flex items-center gap-2 bg-field px-3 py-2 border border-divider data-[state=open]:border-teal rounded-full text-heading text-sm cursor-pointer">
					{labelFor(dateItems, dateFilter)}
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><polyline points="6 9 12 15 18 9" /></svg>
				</Select.Trigger>
				<Select.Portal>
					<Select.Content class="z-50 bg-surface shadow-black/20 shadow-lg p-1 border border-divider rounded-lg" sideOffset={4}>
						<Select.Viewport class="max-h-60 overflow-y-auto">
							{#each dateItems as item (item.value)}
								<Select.Item value={item.value} label={item.label} class="data-highlighted:bg-elevated px-3 py-1.5 rounded-md outline-none text-body data-highlighted:text-heading data-selected:text-teal text-sm cursor-pointer">
									{item.label}
								</Select.Item>
							{/each}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>

			<!-- Clear filters -->
			{#if hasActiveFilters}
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger
							onclick={clearFilters}
							class="flex justify-center items-center bg-field border border-divider hover:border-red-400/40 rounded-full w-9 h-9 text-muted hover:text-red-400 transition-colors cursor-pointer"
							aria-label="Clear filters"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
						</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content class="z-50 bg-surface shadow-lg px-3 py-1.5 border border-divider rounded-lg text-heading text-xs" sideOffset={6}>
								Clear filters
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider>
			{/if}
		</div>

		<!-- Mobile cards -->
		<div class="md:hidden flex flex-col gap-3">
			{#each paginated as row (row.name + row.rdo + row.date + row.state)}
				<div class="bg-surface px-4 py-3 border border-divider-subtle rounded-xl">
					<div class="flex items-start justify-between gap-3 mb-2">
						<p class="font-medium text-heading text-sm leading-snug">{row.name}</p>
						{#if row.state === 'added'}
							<span class="shrink-0 bg-green-500/10 px-2 py-0.5 rounded-full font-medium text-green-400 text-xs">Added</span>
						{:else if row.state === 'removed'}
							<span class="shrink-0 bg-red-500/10 px-2 py-0.5 rounded-full font-medium text-red-400 text-xs">Removed</span>
						{:else}
							<span class="shrink-0 bg-elevated px-2 py-0.5 rounded-full font-medium text-muted text-xs">Existing</span>
						{/if}
					</div>
					<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
						<span>RDO {row.rdo}</span>
						<span class="text-faint">&middot;</span>
						{#if row.type === 'Individual'}
							<span class="text-teal">Individual</span>
						{:else}
							<span class="text-purple-400">Non-Individual</span>
						{/if}
						<span class="text-faint">&middot;</span>
						<span>{formatDate(row.date)}</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- Desktop table -->
		<div class="hidden md:block border border-divider-subtle rounded-xl overflow-x-auto">
			<table class="w-full text-sm text-left">
				<thead>
					<tr class="bg-surface">
						<th
							class="px-4 py-3 font-medium text-muted hover:text-heading text-xs uppercase tracking-wider transition-colors cursor-pointer select-none"
							onclick={() => toggleSort('name')}
						>
							Name{sortIndicator('name')}
						</th>
						<th
							class="px-4 py-3 font-medium text-muted hover:text-heading text-xs uppercase tracking-wider transition-colors cursor-pointer select-none"
							onclick={() => toggleSort('rdo')}
						>
							RDO{sortIndicator('rdo')}
						</th>
						<th
							class="px-4 py-3 font-medium text-muted hover:text-heading text-xs uppercase text-nowrap tracking-wider transition-colors cursor-pointer select-none"
							onclick={() => toggleSort('type')}
						>
							Type{sortIndicator('type')}
						</th>
						<th
							class="px-4 py-3 font-medium text-muted hover:text-heading text-xs uppercase tracking-wider transition-colors cursor-pointer select-none"
							onclick={() => toggleSort('date')}
						>
							Date{sortIndicator('date')}
						</th>
						<th
							class="px-4 py-3 font-medium text-muted hover:text-heading text-xs uppercase text-nowrap tracking-wider transition-colors cursor-pointer select-none"
							onclick={() => toggleSort('state')}
						>
							Status{sortIndicator('state')}
						</th>
					</tr>
				</thead>
				<tbody>
					{#each paginated as row (row.name + row.rdo + row.date + row.state)}
						<tr class="even:bg-surface/50 border-divider-subtle border-b">
							<td class="px-4 py-3 font-medium text-heading">{row.name}</td>
							<td class="px-4 py-3 text-body text-nowrap">{row.rdo}</td>
							<td class="px-4 py-3 text-nowrap">
								{#if row.type === 'Individual'}
									<span
										class="inline-block bg-teal/10 px-2.5 py-0.5 rounded-full font-medium text-teal text-xs"
									>
										Individual
									</span>
								{:else}
									<span
										class="inline-block bg-purple-500/10 px-2.5 py-0.5 rounded-full font-medium text-purple-400 text-xs"
									>
										Non-Individual
									</span>
								{/if}
							</td>
							<td class="px-4 py-3 text-muted text-nowrap">{formatDate(row.date)}</td>
							<td class="px-4 py-3">
								{#if row.state === 'added'}
									<span
										class="inline-block bg-green-500/10 px-2.5 py-0.5 rounded-full font-medium text-green-400 text-xs"
									>
										Added
									</span>
								{:else if row.state === 'removed'}
									<span
										class="inline-block bg-red-500/10 px-2.5 py-0.5 rounded-full font-medium text-red-400 text-xs"
									>
										Removed
									</span>
								{:else}
									<span
										class="inline-block bg-elevated px-2.5 py-0.5 rounded-full font-medium text-muted text-xs"
									>
										Existing
									</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		<div class="flex justify-between items-center mt-6">
			<div class="flex items-center gap-3">
				<span class="text-muted text-sm">
					Page {currentPage} of {totalPages.toLocaleString()}
				</span>
				<span class="bg-surface px-3 py-1 border border-divider-subtle rounded-full text-muted text-xs">
					{filtered.length.toLocaleString()} of {data.length.toLocaleString()} records
				</span>
			</div>
			<div class="flex items-center gap-2">
				<button
					onclick={() => (currentPage = Math.max(1, currentPage - 1))}
					disabled={currentPage <= 1}
					class="flex justify-center items-center bg-surface hover:bg-elevated disabled:opacity-40 border border-divider rounded-full w-9 h-9 text-heading transition-colors disabled:cursor-not-allowed"
					aria-label="Previous page"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
				</button>
				<button
					onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
					disabled={currentPage >= totalPages}
					class="flex justify-center items-center bg-surface hover:bg-elevated disabled:opacity-40 border border-divider rounded-full w-9 h-9 text-heading transition-colors disabled:cursor-not-allowed"
					aria-label="Next page"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
				</button>
			</div>
		</div>
	</div>
</main>

<Footer />
