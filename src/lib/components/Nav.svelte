<script lang="ts">
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	const navLinks = [
		{ label: 'Services', href: '#services' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	] as const;

	function handleScroll() {
		scrolled = window.scrollY > 0;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class={[
		'fixed top-0 left-0 w-full z-50 transition-all duration-300',
		'bg-navy/80 backdrop-blur-md',
		scrolled && 'border-b border-teal/30'
	]}
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<!-- Wordmark -->
		<a href="/" class="font-syne text-2xl font-bold text-white">
			Account<span class="text-teal">tech</span>
		</a>

		<!-- Desktop links -->
		<ul class="hidden items-center gap-8 md:flex">
			{#each navLinks as { label, href } (href)}
				<li>
					<a
						{href}
						class="font-outfit text-sm tracking-wide text-slate-300 transition-colors duration-200 hover:text-teal"
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>

		<!-- Mobile hamburger -->
		<button
			type="button"
			class="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
		>
			<span
				class={[
					'block h-0.5 w-6 rounded-full bg-white transition-all duration-300',
					mobileMenuOpen && 'translate-y-2 rotate-45'
				]}
			></span>
			<span
				class={[
					'block h-0.5 w-6 rounded-full bg-white transition-all duration-300',
					mobileMenuOpen && 'scale-x-0 opacity-0'
				]}
			></span>
			<span
				class={[
					'block h-0.5 w-6 rounded-full bg-white transition-all duration-300',
					mobileMenuOpen && '-translate-y-2 -rotate-45'
				]}
			></span>
		</button>
	</div>

	<!-- Mobile menu -->
	<div
		class={[
			'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
			mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
		]}
	>
		<ul class="flex flex-col gap-4 border-t border-teal/10 bg-navy/95 px-6 py-6 backdrop-blur-md">
			{#each navLinks as { label, href } (href)}
				<li>
					<a
						{href}
						class="font-outfit block text-base text-slate-300 transition-colors duration-200 hover:text-teal"
						onclick={closeMobileMenu}
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
