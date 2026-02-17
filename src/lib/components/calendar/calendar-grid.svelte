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
	<!-- Day-of-week headers -->
	<div class="grid grid-cols-7">
		{#each DAY_HEADERS_FULL as full, i (i)}
			<div class="text-center text-xs font-medium text-muted py-2">
				<span class="hidden sm:inline">{full}</span>
				<span class="sm:hidden">{DAY_HEADERS_SHORT[i]}</span>
			</div>
		{/each}
	</div>

	<!-- Calendar grid -->
	<div class="grid grid-cols-7 gap-px bg-divider-subtle border border-divider-subtle rounded-xl overflow-hidden shadow-lg dark:shadow-[0_8px_32px_rgba(6,182,212,0.08)]">
		<!-- Empty cells before day 1 -->
		{#each { length: firstDayOfMonth }, i}
			<div class="bg-base"></div>
		{/each}

		<!-- Day cells -->
		{#each days as day, i (day.date)}
			{@const colIndex = (firstDayOfMonth + i) % 7}
			{@const isWeekend = colIndex === 0 || colIndex === 6}
			<button
				type="button"
				class={[
					'bg-base hover:bg-elevated cursor-pointer transition-colors relative p-2 sm:p-3 min-h-[3rem] sm:min-h-[3.5rem] text-left',
					day.isSelected && 'bg-teal text-navy-dark',
					day.isToday && !day.isSelected && 'ring-2 ring-teal ring-inset',
					day.isDimmed && 'opacity-30'
				]}
				onclick={() => onselect(day.date)}
			>
				<span
					class={[
						'text-sm font-medium',
						day.isSelected ? 'text-navy-dark font-bold' : isWeekend ? 'text-muted' : 'text-heading'
					]}
				>
					{day.day}
				</span>

				{#if day.hasDeadlines || day.isHoliday}
					<div class="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
						{#if day.hasDeadlines}
							<span class={['w-3 h-1.5 rounded-sm', day.isSelected ? 'bg-cyan-200' : 'bg-teal']}></span>
						{/if}
						{#if day.isHoliday}
							<span class="w-3 h-1.5 rounded-sm bg-rose-400"></span>
						{/if}
					</div>
				{/if}
			</button>
		{/each}

		<!-- Empty cells after last day -->
		{#each { length: trailingCells }, i}
			<div class="bg-base"></div>
		{/each}
	</div>
</div>
