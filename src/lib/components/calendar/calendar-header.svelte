<script lang="ts">
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
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>

			<button
				onclick={onnext}
				disabled={currentMonth === 11}
				aria-label="Next month"
				class="w-9 h-9 rounded-full flex items-center justify-center text-body hover:text-heading hover:bg-elevated transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="9 6 15 12 9 18" />
				</svg>
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
