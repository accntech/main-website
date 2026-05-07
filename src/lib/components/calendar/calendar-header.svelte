<script lang="ts">
	import Icon from '@iconify/svelte';

	let {
		currentMonth,
		currentYear,
		onprev,
		onnext,
		ontoday
	}: {
		currentMonth: number;
		currentYear: number;
		onprev: () => void;
		onnext: () => void;
		ontoday: () => void;
	} = $props();

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
</script>

<header class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		<h2 class="font-rajdhani font-bold text-heading text-2xl">
			{monthNames[currentMonth]} {currentYear}
		</h2>

		<div class="flex items-center gap-1">
			<button
				onclick={onprev}
				disabled={currentMonth === 0}
				aria-label="Previous month"
				class="w-9 h-9 rounded-full flex items-center justify-center text-body hover:text-heading hover:bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
			>
				<Icon icon="solar:alt-arrow-left-linear" width="18" height="18" />
			</button>

			<button
				onclick={onnext}
				disabled={currentMonth === 11}
				aria-label="Next month"
				class="w-9 h-9 rounded-full flex items-center justify-center text-body hover:text-heading hover:bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
			>
				<Icon icon="solar:alt-arrow-right-linear" width="18" height="18" />
			</button>
		</div>
	</div>

	<button
		onclick={ontoday}
		class="px-3 py-1 text-xs font-medium rounded-full bg-teal/10 text-teal hover:bg-teal/20 transition-colors"
	>
		Today
	</button>
</header>
