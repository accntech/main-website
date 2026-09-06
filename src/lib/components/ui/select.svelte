<script lang="ts" generics="T extends string">
	import { Select } from 'bits-ui';
	import Icon from '@iconify/svelte';

	type Props = {
		id: string;
		label: string;
		items: { value: T; label: string; description?: string }[];
		value: T;
		disabled?: boolean;
	};
	let { id, label, items, value = $bindable(), disabled = false }: Props = $props();
	let selected = $derived(items.find((item) => item.value === value));
</script>

<Select.Root type="single" {items} {disabled} allowDeselect={false} bind:value={() => value, (next) => { value = next as T; }}>
	<Select.Trigger {id} aria-label={label} class="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-divider bg-surface px-3 py-2.5 text-left text-sm text-heading transition-colors hover:border-teal/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal data-[state=open]:border-teal disabled:cursor-not-allowed disabled:opacity-45">
		<span class="truncate">{selected?.label}</span>
		<Icon icon="solar:alt-arrow-down-linear" width="16" height="16" class="shrink-0 text-muted" />
	</Select.Trigger>
	<!-- Keep the floating menu inside its native dialog's top layer. -->
	<Select.Content sideOffset={6} align="start" preventScroll={false} class="z-50 max-h-[var(--bits-select-content-available-height)] min-w-[var(--bits-select-anchor-width)] rounded-xl border border-divider bg-base p-1.5 shadow-xl outline-none">
		<Select.Viewport class="max-h-64 overflow-y-auto">
			{#each items as item (item.value)}
				<Select.Item value={item.value} label={item.label} class="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm text-body outline-none data-highlighted:bg-teal/10 data-highlighted:text-heading data-selected:text-teal">
					{#snippet children({ selected })}
						<span>
							<span class="block font-medium">{item.label}</span>
							{#if item.description}<span class="mt-0.5 block text-xs text-muted">{item.description}</span>{/if}
						</span>
						<span class="size-4 shrink-0">
							{#if selected}<Icon icon="solar:check-read-linear" width="16" height="16" />{/if}
						</span>
					{/snippet}
				</Select.Item>
			{/each}
		</Select.Viewport>
	</Select.Content>
</Select.Root>
