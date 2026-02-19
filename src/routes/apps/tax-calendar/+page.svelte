<script lang="ts">
	import type { ActionType } from '$lib/types/tax-calendar';
	import { CALENDAR_MAP } from '$lib/data/tax-calendar';
	import { SvelteSet } from 'svelte/reactivity';
	import { browser } from '$app/environment';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import CalendarHeader from '$lib/components/calendar/calendar-header.svelte';
	import CalendarGrid from '$lib/components/calendar/calendar-grid.svelte';
	import DeadlinePanel from '$lib/components/calendar/deadline-panel.svelte';
	import FilterBar from '$lib/components/calendar/filter-bar.svelte';

	let currentMonth = $state(new Date().getMonth());
	const currentYear = 2026;
	let selectedDate = $state<string | null>(null);
	let shouldScrollToPanel = $state(false);
	let searchQuery = $state('');
	let activeFilters: SvelteSet<ActionType> = new SvelteSet();

	if (browser) {
		const dateParam = new URLSearchParams(window.location.search).get('date');
		if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
			selectedDate = dateParam;
			const month = parseInt(dateParam.split('-')[1], 10) - 1;
			if (month >= 0 && month <= 11) currentMonth = month;
		}
	}

	$effect(() => {
		if (!browser) return;
		const url = new URL(window.location.href);
		if (selectedDate) {
			url.searchParams.set('date', selectedDate);
		} else {
			url.searchParams.delete('date');
		}
		window.history.replaceState(window.history.state, '', url);
	});

	let hasActiveFilters = $derived(searchQuery.trim().length > 0 || activeFilters.size > 0);

	let filteredDateSet = $derived.by(() => {
		const dates = new SvelteSet<string>();
		for (const [date, day] of CALENDAR_MAP) {
			const matchesFilter =
				activeFilters.size === 0 || day.deadlines.some((d) => activeFilters.has(d.action));
			const matchesSearch =
				!searchQuery.trim() ||
				day.deadlines.some((d) => {
					const q = searchQuery.trim().toLowerCase();
					return (
						d.description.toLowerCase().includes(q) ||
						d.formNumbers.some((f) => f.toLowerCase().includes(q))
					);
				});
			if (matchesFilter && matchesSearch) dates.add(date);
		}
		return dates;
	});

	function prevMonth() {
		if (currentMonth > 0) {
			currentMonth--;
			const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
			selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
		}
	}

	function nextMonth() {
		if (currentMonth < 11) {
			currentMonth++;
			selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
		}
	}

	function goToToday() {
		const now = new Date();
		currentMonth = now.getFullYear() === 2026 ? now.getMonth() : 0;
		const y = 2026;
		const m = currentMonth;
		const d = now.getFullYear() === 2026 ? now.getDate() : 1;
		selectedDate = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
	}

	function selectDate(date: string) {
		selectedDate = date;
		shouldScrollToPanel = true;
		const month = parseInt(date.split('-')[1], 10) - 1;
		if (month !== currentMonth) currentMonth = month;
	}

	function handleSearch(query: string) {
		searchQuery = query;
	}

	function toggleFilter(filter: ActionType) {
		if (activeFilters.has(filter)) {
			activeFilters.delete(filter);
		} else {
			activeFilters.add(filter);
		}
	}

	function clearFilters() {
		searchQuery = '';
		activeFilters.clear();
	}

	$effect(() => {
		if (selectedDate && shouldScrollToPanel && typeof window !== 'undefined') {
			shouldScrollToPanel = false;
			const el = document.getElementById('deadline-panel');
			el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') selectedDate = null; }} />

<Seo
	title="2026 BIR Tax Calendar | AccounTech"
	description="Interactive 2026 BIR Tax Calendar with all filing deadlines, form references, and compliance dates. Never miss a BIR deadline."
/>

<Nav />

<main class="relative bg-base min-h-screen">
	<div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 80% 50% at 70% 40%, rgba(6, 182, 212, 0.04), transparent);"></div>
	<div class="relative mx-auto px-5 sm:px-6 pt-28 pb-20 max-w-7xl">

		<nav class="relative mb-6 text-sm" aria-label="Breadcrumb">
			<ol class="flex items-center gap-2 text-muted">
				<li><a href="/apps" class="hover:text-heading transition-colors">Apps</a></li>
				<li class="text-faint">/</li>
				<li class="text-heading">Tax Calendar</li>
			</ol>
		</nav>

		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">Tax Compliance Tool</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				2026 BIR Tax Calendar
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				All BIR filing deadlines, compliance dates, and form references for the 2026 tax year.
			</p>
		</header>

		<FilterBar
			{searchQuery}
			{activeFilters}
			onsearch={handleSearch}
			ontogglefilter={toggleFilter}
			onclear={clearFilters}
		/>

		<div class="relative space-y-6 mx-auto mt-8 max-w-7xl">
			<div>
				<CalendarHeader
					{currentMonth}
					{currentYear}
					onprev={prevMonth}
					onnext={nextMonth}
					ontoday={goToToday}
				/>
				<div class="mt-4">
					{#key currentMonth}
						<div class="animate-fade-in">
							<CalendarGrid
								{currentMonth}
								{currentYear}
								{selectedDate}
								{filteredDateSet}
								{hasActiveFilters}
								onselect={selectDate}
							/>
						</div>
					{/key}
				</div>
			</div>
			<div>
				<DeadlinePanel
					{selectedDate}
					{searchQuery}
					{activeFilters}
					onnavigate={selectDate}
				/>
			</div>
		</div>
	</div>
</main>

<Footer />
