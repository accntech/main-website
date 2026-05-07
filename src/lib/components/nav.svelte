<script lang="ts">
	import Icon from '@iconify/svelte';
	import { toggleMode, mode } from 'mode-watcher';

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	const navLinks = [
		{ label: 'Services', href: '/#services' },
		{ label: 'Profile', href: '/#company' },
		{ label: 'Founder', href: '/#about' },
		{ label: 'Apps', href: '/apps' }
	] as const;

	function handleScroll() {
		scrolled = window.scrollY > 12;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class={[
		'fixed top-0 left-0 z-50 w-full border-b transition-[background-color,backdrop-filter,border-color] duration-300',
		scrolled
			? 'border-rule-subtle bg-paper-90 backdrop-blur-xl'
			: 'border-transparent bg-transparent'
	]}
	style="transition-timing-function: var(--ease-out-strong);"
>
	<div class="flex justify-between items-center mx-auto px-6 sm:px-8 py-4 sm:py-5 max-w-310">
		<a
			href="/"
			class="group inline-flex items-baseline font-sans font-bold text-[1.5rem] lowercase leading-none tracking-[-0.025em]"
		>
			<span class="text-ink">accoun</span><span class="text-seal">tech<span>.</span></span>
		</a>

		<div class="hidden md:flex items-center gap-9">
			{#each navLinks as { label, href } (href)}
				<a
					{href}
					class="font-mono text-[11px] text-ink-muted hover:text-ink uppercase tracking-[0.18em] transition-colors duration-200"
				>
					{label}
				</a>
			{/each}

			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={toggleMode}
					aria-label="Toggle theme"
					class="flex justify-center items-center rounded-full w-8 h-8 text-ink-muted hover:text-ink transition-colors press"
				>
					{#if mode.current === 'dark'}
						<Icon icon="solar:moon-linear" width="15" height="15" aria-hidden="true" />
					{:else}
						<Icon icon="solar:sun-linear" width="15" height="15" aria-hidden="true" />
					{/if}
					<span class="sr-only">Toggle theme</span>
				</button>

				<a
					href="/#contact"
					class="group inline-flex items-center gap-2 bg-seal hover:bg-seal-deep shadow-sm px-4 py-2 border border-seal hover:border-seal-deep rounded-md font-mono text-[11px] text-paper dark:text-ink uppercase tracking-[0.16em] transition-all duration-200 press"
				>
					Engage
					<span class="block bg-current w-3 group-hover:w-5 h-px transition-all duration-300" style="transition-timing-function: var(--ease-out-strong);" aria-hidden="true"></span>
				</a>
			</div>
		</div>

		<div class="md:hidden flex items-center gap-1">
			<button
				type="button"
				onclick={toggleMode}
				aria-label="Toggle theme"
				class="flex justify-center items-center rounded-full w-9 h-9 text-ink-muted hover:text-ink transition-colors press"
			>
				{#if mode.current === 'dark'}
					<Icon icon="solar:moon-linear" width="16" height="16" aria-hidden="true" />
				{:else}
					<Icon icon="solar:sun-linear" width="16" height="16" aria-hidden="true" />
				{/if}
			</button>
			<button
				type="button"
				class="z-50 relative flex flex-col justify-center items-center gap-1.5 w-10 h-10 press"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileMenuOpen}
			>
				<span
					class={[
						'block h-px w-5 bg-ink transition-transform duration-300',
						mobileMenuOpen && 'translate-y-0.75 rotate-45'
					]}
					style="transition-timing-function: var(--ease-out-strong);"
				></span>
				<span
					class={[
						'block h-px w-5 bg-ink transition-transform duration-300',
						mobileMenuOpen && '-translate-y-0.75 -rotate-45'
					]}
					style="transition-timing-function: var(--ease-out-strong);"
				></span>
			</button>
		</div>
	</div>

	<div
		class={[
			'grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 md:hidden',
			mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
		]}
		style="transition-timing-function: var(--ease-drawer);"
	>
		<div class="min-h-0">
			<div class="bg-paper-95 backdrop-blur-xl px-6 py-8 border-rule-subtle border-t">
				<div class="flex flex-col gap-5">
					{#each navLinks as { label, href } (href)}
						<a
							{href}
							class="font-serif font-medium text-ink hover:text-seal text-2xl transition-colors"
							onclick={closeMobileMenu}
						>
							{label}
						</a>
					{/each}
					<a
						href="/#contact"
						class="inline-flex items-center self-start gap-2 bg-seal shadow-sm mt-2 px-5 py-2.5 border border-seal rounded-md font-mono text-[11px] text-paper dark:text-ink uppercase tracking-[0.16em] press"
						onclick={closeMobileMenu}
					>
						Engage
						<span class="block bg-current w-3 h-px" aria-hidden="true"></span>
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>
