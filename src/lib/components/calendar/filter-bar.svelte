<script lang="ts">
	import type { ActionType } from '$lib/types/tax-calendar';

	let {
		searchQuery,
		activeFilters,
		onsearch,
		ontogglefilter,
		onclear,
	}: {
		searchQuery: string;
		activeFilters: Set<ActionType>;
		onsearch: (query: string) => void;
		ontogglefilter: (filter: ActionType) => void;
		onclear: () => void;
	} = $props();

	const ACTION_TYPES: { type: ActionType; label: string }[] = [
		{ type: 'SUBMISSION', label: 'Submission' },
		{ type: 'e-FILING', label: 'e-Filing' },
		{ type: 'e-FILING & PAYMENT', label: 'e-Filing & Payment' },
		{ type: 'e-PAYMENT', label: 'e-Payment' },
		{ type: 'e-SUBMISSION', label: 'e-Submission' },
		{ type: 'REGISTRATION', label: 'Registration' },
		{ type: 'DISTRIBUTION', label: 'Distribution' },
		{ type: 'ONLINE REGISTRATION', label: 'Online Registration' },
	];

	let hasActiveFilters = $derived(searchQuery.length > 0 || activeFilters.size > 0);
</script>

<div class="space-y-3">
	<!-- Search input -->
	<div class="relative">
		<svg
			class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>
		<input
			type="text"
			placeholder="Search by form number or keyword..."
			value={searchQuery}
			oninput={(e) => onsearch(e.currentTarget.value)}
			class="rounded-full border border-divider bg-field px-4 py-2.5 pl-10 text-sm text-heading placeholder:text-muted w-full focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/30 transition-colors"
		/>
	</div>

	<!-- Filter chips and clear button -->
	<div class="flex items-center gap-2">
		<div class="flex gap-2 overflow-x-auto scrollbar-none">
			{#each ACTION_TYPES as { type, label } (type)}
				<button
					type="button"
					onclick={() => ontogglefilter(type)}
					class="px-3 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-colors {activeFilters.has(
						type
					)
						? 'bg-teal/15 text-teal border-teal/30'
						: 'bg-field text-muted border-divider-subtle'}"
				>
					{label}
				</button>
			{/each}
		</div>

		{#if hasActiveFilters}
			<button
				type="button"
				onclick={onclear}
				class="text-xs text-muted hover:text-heading transition-colors whitespace-nowrap"
			>
				Clear all
			</button>
		{/if}
	</div>
</div>
