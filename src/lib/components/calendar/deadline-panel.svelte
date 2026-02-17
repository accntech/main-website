<script lang="ts">
	import type { ActionType, TaxDeadline } from '$lib/types/tax-calendar';
	import { CALENDAR_MAP, HOLIDAY_MAP } from '$lib/data/tax-calendar';

	let {
		selectedDate,
		searchQuery,
		activeFilters,
		onnavigate,
	}: {
		selectedDate: string | null;
		searchQuery: string;
		activeFilters: Set<ActionType>;
		onnavigate: (date: string) => void;
	} = $props();

	const sortedDeadlineDates = $derived.by(() => {
		return [...CALENDAR_MAP.keys()].sort();
	});

	let prevDeadlineDate = $derived.by(() => {
		if (!selectedDate) return null;
		const dates = sortedDeadlineDates;
		for (let i = dates.length - 1; i >= 0; i--) {
			if (dates[i] < selectedDate) return dates[i];
		}
		return null;
	});

	let nextDeadlineDate = $derived.by(() => {
		if (!selectedDate) return null;
		const dates = sortedDeadlineDates;
		for (let i = 0; i < dates.length; i++) {
			if (dates[i] > selectedDate) return dates[i];
		}
		return null;
	});

	const ACTION_COLORS: Record<ActionType, string> = {
		'SUBMISSION': 'bg-amber-500/15 text-amber-500 border-amber-500/30',
		'e-FILING': 'bg-blue-500/15 text-blue-500 border-blue-500/30',
		'e-FILING & PAYMENT': 'bg-teal/15 text-teal border-teal/30',
		'e-PAYMENT': 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
		'e-SUBMISSION': 'bg-violet-500/15 text-violet-500 border-violet-500/30',
		'REGISTRATION': 'bg-rose-500/15 text-rose-500 border-rose-500/30',
		'DISTRIBUTION': 'bg-orange-500/15 text-orange-500 border-orange-500/30',
		'ONLINE REGISTRATION': 'bg-rose-500/15 text-rose-500 border-rose-500/30',
	};

	const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	let calendarDay = $derived.by(() => {
		if (!selectedDate) return null;
		return CALENDAR_MAP.get(selectedDate) ?? null;
	});

	let holiday = $derived.by(() => {
		if (!selectedDate) return null;
		return HOLIDAY_MAP.get(selectedDate) ?? null;
	});

	let dayOfWeek = $derived.by(() => {
		if (!selectedDate) return '';
		const date = new Date(selectedDate + 'T00:00:00');
		return DAYS_OF_WEEK[date.getDay()];
	});

	let formattedDate = $derived.by(() => {
		if (!selectedDate) return '';
		const date = new Date(selectedDate + 'T00:00:00');
		return new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		}).format(date);
	});

	let filteredDeadlines = $derived.by(() => {
		if (!calendarDay) return [];
		let deadlines = calendarDay.deadlines;

		if (searchQuery.trim()) {
			const query = searchQuery.trim().toLowerCase();
			deadlines = deadlines.filter((d) => {
				const matchesDescription = d.description.toLowerCase().includes(query);
				const matchesFormNumbers = d.formNumbers.some((f) => f.toLowerCase().includes(query));
				return matchesDescription || matchesFormNumbers;
			});
		}

		if (activeFilters.size > 0) {
			deadlines = deadlines.filter((d) => activeFilters.has(d.action));
		}

		return deadlines;
	});

	let isWeekend = $derived(dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday');

	let isHoliday = $derived(holiday !== null);

	let totalDeadlines = $derived(calendarDay?.deadlines.length ?? 0);

	let isFiltered = $derived(searchQuery.trim() !== '' || activeFilters.size > 0);

	let topNavEl = $state<HTMLElement | null>(null);
	let topNavVisible = $state(true);

	$effect(() => {
		if (!topNavEl) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				topNavVisible = entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		observer.observe(topNavEl);
		return () => observer.disconnect();
	});
</script>

<section id="deadline-panel" class="bg-surface border border-divider-subtle rounded-2xl p-5 sm:p-6">
	{#if !selectedDate}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="text-muted"
			>
				<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
				<line x1="16" y1="2" x2="16" y2="6" />
				<line x1="8" y1="2" x2="8" y2="6" />
				<line x1="3" y1="10" x2="21" y2="10" />
			</svg>
			<p class="text-muted text-sm mt-4">Select a date to view deadlines</p>
		</div>
	{:else}
		<div class="space-y-4">
			<div>
				<div bind:this={topNavEl} class="flex items-center justify-between gap-2">
					<button
						type="button"
						class="p-1.5 rounded-lg text-muted transition-colors {prevDeadlineDate ? 'hover:bg-elevated hover:text-heading cursor-pointer' : 'opacity-30 cursor-not-allowed'}"
						disabled={!prevDeadlineDate}
						onclick={() => prevDeadlineDate && onnavigate(prevDeadlineDate)}
						title={prevDeadlineDate ? `Previous deadline: ${prevDeadlineDate}` : 'No previous deadline'}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="15 18 9 12 15 6" />
						</svg>
					</button>
					<h2 class="font-rajdhani font-bold text-heading text-xl text-center">
						{formattedDate} &mdash; {dayOfWeek}
					</h2>
					<button
						type="button"
						class="p-1.5 rounded-lg text-muted transition-colors {nextDeadlineDate ? 'hover:bg-elevated hover:text-heading cursor-pointer' : 'opacity-30 cursor-not-allowed'}"
						disabled={!nextDeadlineDate}
						onclick={() => nextDeadlineDate && onnavigate(nextDeadlineDate)}
						title={nextDeadlineDate ? `Next deadline: ${nextDeadlineDate}` : 'No next deadline'}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="9 18 15 12 9 6" />
						</svg>
					</button>
				</div>

				{#if isHoliday}
					<span
						class="inline-block bg-rose-500/15 text-rose-400 text-xs font-medium px-2.5 py-1 rounded-full border border-rose-500/30 mt-2"
					>
						{holiday?.name}
					</span>
				{/if}

				{#if isWeekend || isHoliday}
					<p class="text-xs text-muted italic mt-2">
						Deadlines falling on this date may be moved to the next working day.
					</p>
				{/if}
			</div>

			{#if totalDeadlines === 0}
				<p class="text-muted text-sm">No filing deadlines on this date.</p>
			{:else if filteredDeadlines.length === 0}
				<p class="text-muted text-sm">No deadlines match your current filters.</p>
			{:else}
				<div class="space-y-3">
					{#each filteredDeadlines as deadline, i (i)}
						<div class="bg-surface border border-divider-subtle rounded-xl p-4 space-y-2">
							<div class="flex flex-wrap items-center gap-2">
								<span
									class="text-xs font-medium px-2 py-0.5 rounded-full border {ACTION_COLORS[deadline.action]}"
								>
									{deadline.action}
								</span>
							</div>

							{#if deadline.formNumbers.length > 0}
								<p class="text-teal font-semibold text-sm">
									{deadline.formNumbers.join(', ')}
								</p>
							{/if}

							<p class="text-body text-sm leading-relaxed">
								{deadline.description}
							</p>
						</div>
					{/each}
				</div>
			{/if}

			{#if totalDeadlines > 0}
				<p class="text-xs text-muted mt-4">
					{#if isFiltered}
						Showing {filteredDeadlines.length} of {totalDeadlines} deadlines
					{:else}
						{totalDeadlines} {totalDeadlines === 1 ? 'deadline' : 'deadlines'}
					{/if}
				</p>
			{/if}

			{#if !topNavVisible && (prevDeadlineDate || nextDeadlineDate)}
				<div class="flex items-center justify-between gap-2 pt-2 border-t border-divider-subtle">
					<button
						type="button"
						class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-muted transition-colors {prevDeadlineDate ? 'hover:bg-elevated hover:text-heading cursor-pointer' : 'opacity-30 cursor-not-allowed'}"
						disabled={!prevDeadlineDate}
						onclick={() => prevDeadlineDate && onnavigate(prevDeadlineDate)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="15 18 9 12 15 6" />
						</svg>
						Previous
					</button>
					<button
						type="button"
						class="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm text-muted transition-colors {nextDeadlineDate ? 'hover:bg-elevated hover:text-heading cursor-pointer' : 'opacity-30 cursor-not-allowed'}"
						disabled={!nextDeadlineDate}
						onclick={() => nextDeadlineDate && onnavigate(nextDeadlineDate)}
					>
						Next
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="9 18 15 12 9 6" />
						</svg>
					</button>
				</div>
			{/if}
		</div>
	{/if}
</section>
