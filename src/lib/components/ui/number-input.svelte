<script lang="ts">
	import Icon from '@iconify/svelte';
	import { stepNumber } from '$lib/utils/measurements';

	type Props = {
		id: string;
		label: string;
		value: number | undefined;
		min?: number;
		max?: number;
		step?: number;
		unit?: string;
		disabled?: boolean;
	};
	let { id, label, value = $bindable(), min = 0, max = 100, step = 1, unit = '', disabled = false }: Props = $props();
	const control = 'flex min-h-11 w-8 shrink-0 cursor-pointer items-center justify-center text-muted transition-colors hover:bg-teal/10 hover:text-teal focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-35';

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
		event.preventDefault();
		value = stepNumber(value, event.key === 'ArrowUp' ? 1 : -1, step, min, max);
	}
</script>

<div class="flex min-h-11 overflow-hidden rounded-lg border border-divider bg-surface transition-colors focus-within:border-teal">
	<button type="button" aria-label="Decrease {label}" disabled={disabled || (value !== undefined && value <= min)} onclick={() => value = stepNumber(value, -1, step, min, max)} class="{control} border-r border-divider-subtle">
		<Icon icon="solar:minus-square-linear" width="16" height="16" />
	</button>
	<div class="flex min-w-0 flex-1 items-center">
		<input {id} aria-label={label} type="number" inputmode="decimal" {min} {max} step="any" required {disabled} bind:value={() => value, (next) => { value = next ?? undefined; }} onkeydown={handleKeydown} class="number-field min-h-11 w-full min-w-0 bg-transparent py-2 text-center text-sm tabular-nums text-heading focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal disabled:opacity-45" />
		{#if unit}<span aria-hidden="true" class="pr-2 text-xs text-muted">{unit}</span>{/if}
	</div>
	<button type="button" aria-label="Increase {label}" disabled={disabled || (value !== undefined && value >= max)} onclick={() => value = stepNumber(value, 1, step, min, max)} class="{control} border-l border-divider-subtle">
		<Icon icon="solar:add-square-linear" width="16" height="16" />
	</button>
</div>

<style>
	.number-field { appearance: textfield; -moz-appearance: textfield; }
	.number-field::-webkit-inner-spin-button,
	.number-field::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
</style>
