<script lang="ts">
	import { CALENDAR_MAP, HOLIDAY_MAP } from '$lib/data/tax-calendar';

	interface Props {
		currentMonth: number;
		currentYear: number;
		selectedDate: string | null;
		filteredDateSet: Set<string>;
		hasActiveFilters: boolean;
		onselect: (date: string) => void;
	}

	let { currentMonth, currentYear, selectedDate, filteredDateSet, hasActiveFilters, onselect }: Props = $props();

	function toISODate(year: number, month: number, day: number): string {
		return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	}

	const DAY_HEADERS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const DAY_HEADERS_FULL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	let firstDayOfMonth = $derived(new Date(currentYear, currentMonth, 1).getDay());
	let daysInMonth = $derived(new Date(currentYear, currentMonth + 1, 0).getDate());

	let today = $derived.by(() => {
		const now = new Date();
		return toISODate(now.getFullYear(), now.getMonth(), now.getDate());
	});

	let days = $derived.by(() => {
		const result: Array<{
			date: string;
			day: number;
			hasDeadlines: boolean;
			isHoliday: boolean;
			isToday: boolean;
			isSelected: boolean;
			isDimmed: boolean;
		}> = [];

		for (let d = 1; d <= daysInMonth; d++) {
			const date = toISODate(currentYear, currentMonth, d);
			const hasDeadlines = CALENDAR_MAP.has(date);
			const isHoliday = HOLIDAY_MAP.has(date);

			result.push({
				date,
				day: d,
				hasDeadlines,
				isHoliday,
				isToday: date === today,
				isSelected: date === selectedDate,
				isDimmed: hasActiveFilters && !filteredDateSet.has(date) && hasDeadlines
			});
		}

		return result;
	});

	let trailingCells = $derived.by(() => {
		const totalCells = firstDayOfMonth + daysInMonth;
		const remainder = totalCells % 7;
		return remainder === 0 ? 0 : 7 - remainder;
	});
</script>

<div>
	<div class="grid grid-cols-7">
		{#each DAY_HEADERS_FULL as full, i (i)}
			<div class="text-center text-xs font-medium text-muted py-2">
				<span class="hidden sm:inline">{full}</span>
				<span class="sm:hidden">{DAY_HEADERS_SHORT[i]}</span>
			</div>
		{/each}
	</div>

	<div class="grid grid-cols-7 gap-px bg-divider-subtle border border-divider-subtle rounded-xl overflow-hidden shadow-lg dark:shadow-[0_8px_32px_rgba(6,182,212,0.08)]">
		{#each { length: firstDayOfMonth }, i}
			<div class="bg-base"></div>
		{/each}

		{#each days as day, i (day.date)}
			{@const colIndex = (firstDayOfMonth + i) % 7}
			{@const isWeekend = colIndex === 0 || colIndex === 6}
			<button
				type="button"
				aria-pressed={day.isSelected}
				aria-label={day.isToday ? `Today, ${day.day}` : `${day.day}`}
				class={[
					'cursor-pointer transition-colors relative p-2 sm:p-3 min-h-[3rem] sm:min-h-[3.5rem] text-left',
					'focus:outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-inset',
					day.isSelected
						? 'bg-teal ring-2 ring-inset ring-navy-dark/30 focus-visible:ring-navy-dark'
						: day.isToday
							? 'bg-seal-tint hover:bg-elevated focus-visible:ring-teal'
							: 'bg-base hover:bg-elevated focus-visible:ring-teal',
					day.isDimmed && 'opacity-30'
				]}
				onclick={() => onselect(day.date)}
			>
				{#if day.isToday}
					<span
						aria-hidden="true"
						class={[
							'absolute top-1 right-1 px-1 rounded text-[9px] font-bold uppercase tracking-wider leading-[1.4]',
							day.isSelected ? 'bg-navy-dark/25 text-navy-dark' : 'bg-teal text-navy-dark'
						]}
					>Today</span>
				{/if}

				<span
					class={[
						'tabular',
						day.isSelected
							? 'text-navy-dark font-bold text-base'
							: day.isToday
								? 'text-teal font-bold text-sm'
								: isWeekend
									? 'text-muted text-sm font-medium'
									: 'text-heading text-sm font-medium'
					]}
				>
					{day.day}
				</span>

				{#if day.hasDeadlines || day.isHoliday}
					<div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
						{#if day.hasDeadlines}
							<span class={['w-3 h-1.5 rounded-sm', day.isSelected ? 'bg-navy-dark' : 'bg-teal']}></span>
						{/if}
						{#if day.isHoliday}
							<span class="w-3 h-1.5 rounded-sm bg-rose-400"></span>
						{/if}
					</div>
				{/if}
			</button>
		{/each}

		{#each { length: trailingCells }, i}
			<div class="bg-base"></div>
		{/each}
	</div>
</div>
