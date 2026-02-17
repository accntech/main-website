<script lang="ts">
	import { toggleMode } from 'mode-watcher';

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	const navLinks = [
		{ label: 'Services', href: '/#services' },
		{ label: 'Company', href: '/#company' },
		{ label: 'About', href: '/#about' },
		{ label: 'Contact', href: '/#contact' },
		{ label: 'Apps', href: '/apps' }
	] as const;

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class={[
		'fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b',
		scrolled
			? 'bg-base-90 backdrop-blur-xl border-teal/10 shadow-2xl shadow-black/5 dark:shadow-black/20'
			: 'bg-transparent border-transparent'
	]}
>
	<div class="flex justify-between items-center mx-auto px-5 sm:px-6 py-4 sm:py-5 max-w-7xl">
		<a href="/" class="group relative font-rajdhani font-bold text-heading text-2xl">
			accoun<span class="text-teal group-hover:text-teal-light transition-colors">tech</span><span class="text-teal">.</span>
		</a>

		<div class="hidden md:flex items-center gap-10">
			{#each navLinks as { label, href } (href)}
				<a
					{href}
					class="after:-bottom-1 after:left-0 after:absolute relative after:bg-teal after:w-0 hover:after:w-full after:h-px font-medium text-body hover:text-heading text-sm tracking-wide transition-colors after:transition-all duration-300 after:duration-300"
				>
					{label}
				</a>
			{/each}
			<button
				type="button"
				onclick={toggleMode}
				aria-label="Toggle theme"
				class="flex justify-center items-center rounded-full w-9 h-9 text-body hover:text-heading transition-colors duration-300"
			>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 3l0 18" /><path d="M12 9l4.65 -4.65" /><path d="M12 14.3l7.37 -7.37" /><path d="M12 19.6l8.85 -8.85" /></svg>
				<span class="sr-only">Toggle theme</span>
			</button>
			<a
				href="/#contact"
				class="bg-teal hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20 px-5 py-2 rounded-full font-semibold text-navy-dark text-sm text-nowrap transition-all duration-300"
			>
				Get Started
			</a>
		</div>

		<div class="md:hidden flex items-center gap-2">
			<button
				type="button"
				onclick={toggleMode}
				aria-label="Toggle theme"
				class="flex justify-center items-center rounded-full w-9 h-9 text-body hover:text-heading transition-colors duration-300"
			>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4.5"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 3l0 18" /><path d="M12 9l4.65 -4.65" /><path d="M12 14.3l7.37 -7.37" /><path d="M12 19.6l8.85 -8.85" /></svg>
				<span class="sr-only">Toggle theme</span>
			</button>
		<button
			type="button"
			class="md:hidden z-50 relative flex flex-col justify-center items-center gap-1.5 w-10 h-10"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
		>
			<span
				class={[
					'block h-0.5 w-6 rounded-full bg-heading transition-all duration-300 origin-center',
					mobileMenuOpen && 'translate-y-2 rotate-45'
				]}
			></span>
			<span
				class={[
					'block h-0.5 w-6 rounded-full bg-heading transition-all duration-300',
					mobileMenuOpen && 'scale-x-0 opacity-0'
				]}
			></span>
			<span
				class={[
					'block h-0.5 w-6 rounded-full bg-heading transition-all duration-300 origin-center',
					mobileMenuOpen && '-translate-y-2 -rotate-45'
				]}
			></span>
		</button>
		</div>
	</div>

	<div
		class={[
			'overflow-hidden transition-all duration-500 ease-in-out md:hidden',
			mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
		]}
	>
		<div class="bg-base-95 backdrop-blur-xl px-6 py-6 border-divider-subtle border-t">
			<div class="flex flex-col gap-5">
				{#each navLinks as { label, href } (href)}
					<a
						{href}
						class="font-medium text-secondary hover:text-teal text-lg transition-colors duration-200"
						onclick={closeMobileMenu}
					>
						{label}
					</a>
				{/each}
				<a
					href="/#contact"
					class="inline-block bg-teal mt-2 px-6 py-3 rounded-full font-semibold text-navy-dark text-sm text-center text-nowrap"
					onclick={closeMobileMenu}
				>
					Get Started
				</a>
			</div>
		</div>
	</div>
</nav>
