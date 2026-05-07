<script lang="ts" generics="T extends string">
	import { untrack } from 'svelte';

	type Option = { value: T; label: string };

	interface Props {
		value: T;
		options: Option[];
		size?: 'sm' | 'md';
		ariaLabel?: string;
	}

	let { value = $bindable(), options, size = 'md', ariaLabel }: Props = $props();

	let scroller = $state<HTMLDivElement | null>(null);
	let container = $state<HTMLDivElement | null>(null);
	let indicatorEl = $state<HTMLSpanElement | null>(null);

	let prev = { x: 0, w: 0 };
	let ready = false;

	const STRETCH_DURATION = 420;
	const STRETCH_EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

	function update() {
		if (!container || !indicatorEl) return;
		const idx = options.findIndex((o) => o.value === value);
		if (idx < 0) return;
		const buttons = container.querySelectorAll<HTMLButtonElement>('[data-pill]');
		const btn = buttons[idx];
		if (!btn) return;

		const next = { x: btn.offsetLeft, w: btn.offsetWidth };

		indicatorEl.getAnimations().forEach((a) => a.cancel());

		if (!ready) {
			indicatorEl.animate(
				[{ transform: `translateX(${next.x}px)`, width: `${next.w}px`, opacity: 1 }],
				{ duration: 0, fill: 'forwards' }
			);
			ready = true;
		} else if (prev.x !== next.x || prev.w !== next.w) {
			const minLeft = Math.min(prev.x, next.x);
			const maxRight = Math.max(prev.x + prev.w, next.x + next.w);
			const spanW = maxRight - minLeft;

			indicatorEl.animate(
				[
					{ transform: `translateX(${prev.x}px)`, width: `${prev.w}px`, opacity: 1 },
					{
						transform: `translateX(${minLeft}px)`,
						width: `${spanW}px`,
						opacity: 1,
						offset: 0.5
					},
					{ transform: `translateX(${next.x}px)`, width: `${next.w}px`, opacity: 1 }
				],
				{ duration: STRETCH_DURATION, easing: STRETCH_EASING, fill: 'forwards' }
			);
		} else {
			indicatorEl.animate(
				[{ transform: `translateX(${next.x}px)`, width: `${next.w}px`, opacity: 1 }],
				{ duration: 0, fill: 'forwards' }
			);
		}

		prev = next;

		if (scroller && scroller.scrollWidth > scroller.clientWidth) {
			const target = btn.offsetLeft - (scroller.clientWidth - btn.offsetWidth) / 2;
			scroller.scrollTo({
				left: Math.max(0, target),
				behavior: 'smooth'
			});
		}
	}

	$effect(() => {
		void value;
		void container;
		void indicatorEl;
		untrack(update);
	});

	$effect(() => {
		if (!container || typeof ResizeObserver === 'undefined') return;
		const ro = new ResizeObserver(() => untrack(update));
		ro.observe(container);
		return () => ro.disconnect();
	});

	const padCls = $derived(size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm');
</script>

<div bind:this={scroller} class="period-scroll -mx-1 px-1 overflow-x-auto scrollbar-none">
	<div
		bind:this={container}
		class="period-toggle relative inline-flex items-center bg-elevated p-1 border border-divider-subtle rounded-full"
		role="radiogroup"
		aria-label={ariaLabel}
	>
		<span
			bind:this={indicatorEl}
			class="period-indicator pointer-events-none absolute top-1 bottom-1 left-0 bg-teal rounded-full"
			aria-hidden="true"
		></span>

		{#each options as opt (opt.value)}
			<button
				type="button"
				role="radio"
				data-pill
				aria-checked={value === opt.value}
				onclick={() => (value = opt.value)}
				class="period-btn relative z-10 shrink-0 whitespace-nowrap rounded-full font-medium tracking-tight transition-colors duration-200 {padCls}"
				class:is-active={value === opt.value}
			>
				{opt.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.period-toggle {
		isolation: isolate;
	}

	.period-indicator {
		opacity: 0;
		width: 0;
		transform: translateX(0);
		will-change: transform, width;
	}

	.period-btn {
		color: var(--color-body);
	}

	.period-btn:hover {
		color: var(--color-heading);
	}

	.period-btn.is-active {
		color: var(--color-navy-dark);
	}

	.period-btn:focus-visible {
		outline: 2px solid var(--seal);
		outline-offset: 2px;
		border-radius: 9999px;
	}

	.period-btn:active {
		transform: scale(0.97);
		transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
	}
</style>
