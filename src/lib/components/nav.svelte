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

	function handleKey(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
		}
	}

	$effect(() => {
		if (typeof document === 'undefined') return;
		const body = document.body;
		if (mobileMenuOpen) {
			body.classList.add('no-scroll');
		} else {
			body.classList.remove('no-scroll');
		}
		return () => body.classList.remove('no-scroll');
	});
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKey} />

<nav
	class={[
		'fixed top-0 left-0 z-50 w-full border-b transition-[background-color,backdrop-filter,border-color] duration-300',
		scrolled
			? 'border-rule-subtle bg-paper-90 backdrop-blur-xl'
			: 'border-transparent bg-transparent'
	]}
	style="transition-timing-function: var(--ease-out-strong);"
>
	<div class="flex justify-between items-center mx-auto px-6 sm:px-8 py-3 sm:py-5 max-w-310">
		<a
			href="/"
			class="group inline-flex items-baseline -mx-2 px-2 py-1.5 font-sans font-bold text-[1.5rem] lowercase leading-none tracking-[-0.025em]"
			onclick={closeMobileMenu}
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
					class="group inline-flex items-center gap-2 bg-seal hover:bg-seal-deep shadow-sm px-4 py-2 border border-seal hover:border-seal-deep rounded-md font-mono text-[11px] text-paper dark:text-ink uppercase tracking-[0.16em] transition-[background-color,border-color,box-shadow] duration-200 press"
				>
					Engage
					<span class="nav-engage-rule" aria-hidden="true"></span>
				</a>
			</div>
		</div>

		<div class="md:hidden flex items-center gap-1 -mr-3">
			<button
				type="button"
				onclick={toggleMode}
				aria-label="Toggle theme"
				class="flex justify-center items-center rounded-full w-11 h-11 text-ink-muted hover:text-ink transition-colors press"
			>
				{#if mode.current === 'dark'}
					<Icon icon="solar:moon-linear" width="17" height="17" aria-hidden="true" />
				{:else}
					<Icon icon="solar:sun-linear" width="17" height="17" aria-hidden="true" />
				{/if}
			</button>
			<button
				type="button"
				class="z-50 relative flex flex-col justify-center items-center gap-1.5 w-11 h-11 press"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
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
		id="mobile-menu"
		class={[
			'grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 md:hidden',
			mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
		]}
		style="transition-timing-function: var(--ease-drawer);"
		aria-hidden={!mobileMenuOpen}
	>
		<div class="min-h-0">
			<div class="bg-paper backdrop-blur-xl px-6 pt-3 pb-8 border-rule-subtle border-t min-h-[calc(100dvh-3.5rem)]">
				<ul class="flex flex-col">
					{#each navLinks as { label, href } (href)}
						<li class="border-b border-rule-subtle last:border-b-0">
							<a
								{href}
								class="flex items-baseline justify-between gap-4 py-4 font-serif font-medium text-ink hover:text-seal text-2xl transition-colors press"
								onclick={closeMobileMenu}
								tabindex={mobileMenuOpen ? 0 : -1}
							>
								<span>{label}</span>
								<Icon
									icon="solar:arrow-right-linear"
									width="16"
									height="16"
									class="text-ink-faint"
									aria-hidden="true"
								/>
							</a>
						</li>
					{/each}
				</ul>
				<a
					href="/#contact"
					class="inline-flex items-center justify-center gap-2 bg-seal shadow-sm mt-6 px-5 py-3.5 border border-seal rounded-md w-full font-mono text-[11px] text-paper dark:text-ink uppercase tracking-[0.16em] press"
					onclick={closeMobileMenu}
					tabindex={mobileMenuOpen ? 0 : -1}
				>
					Engage
					<Icon
						icon="solar:arrow-right-linear"
						width="14"
						height="14"
						aria-hidden="true"
					/>
				</a>

				<div class="mt-10 pt-6 border-t border-rule-subtle">
					<p class="font-mono text-[10px] text-ink-faint uppercase tracking-[0.2em]">
						Direct line
					</p>
					<a
						href="mailto:accntech.dev@gmail.com"
						class="mt-3 block font-serif text-[1.1rem] text-ink hover:text-seal break-all transition-colors"
						onclick={closeMobileMenu}
						tabindex={mobileMenuOpen ? 0 : -1}
					>
						accntech.dev@gmail.com
					</a>
					<a
						href="tel:+639952942417"
						class="mt-1.5 block font-serif text-[1.1rem] text-ink-soft hover:text-seal transition-colors"
						onclick={closeMobileMenu}
						tabindex={mobileMenuOpen ? 0 : -1}
					>
						+63 995 294 2417
					</a>
					<p class="mt-4 font-mono text-[10px] text-ink-faint uppercase tracking-[0.18em]">
						Roxas · Mansalay · Oriental Mindoro
					</p>
				</div>
			</div>
		</div>
	</div>
</nav>

<style>
	.nav-engage-rule {
		display: block;
		width: 12px;
		height: 1px;
		background: currentColor;
		transform-origin: left;
		transition: transform 280ms var(--ease-out-strong);
	}

	@media (hover: hover) and (pointer: fine) {
		a:hover .nav-engage-rule {
			transform: scaleX(1.6);
		}
	}
</style>
