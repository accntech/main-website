<script lang="ts">
	const quickLinks = [
		{ label: 'Services', href: '#services' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	] as const;

	const currentYear = new Date().getFullYear();
</script>

<footer class="relative bg-base">
	<!-- Top gradient line -->
	<div class="h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent"></div>

	<div class="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-16">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-12">
			<!-- Brand -->
			<div class="md:col-span-5">
				<a href="/" class="font-rajdhani text-xl font-bold text-heading">
					accoun<span class="text-teal">tech</span><span class="text-teal">.</span>
				</a>
				<p class="mt-3 max-w-xs text-sm leading-relaxed text-muted">
					Where Accounting Meets Technology. Empowering businesses with integrated financial and tech solutions.
				</p>
			</div>

			<!-- Quick Links -->
			<div class="md:col-span-3">
				<h3 class="text-xs font-bold uppercase tracking-widest text-body">
					Navigation
				</h3>
				<ul class="mt-4 space-y-3">
					{#each quickLinks as { label, href } (href)}
						<li>
							<a {href} class="text-sm text-muted transition-colors duration-200 hover:text-teal">
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div class="md:col-span-4">
				<h3 class="text-xs font-bold uppercase tracking-widest text-body">
					Contact
				</h3>
				<ul class="mt-4 space-y-3 text-sm text-muted">
					<li>
						<a href="mailto:accntech.dev@gmail.com" class="transition-colors hover:text-teal">
							accntech.dev@gmail.com
						</a>
					</li>
					<li>+63 995 294 2417</li>
					<li>Oriental Mindoro, Philippines</li>
				</ul>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-12 border-t border-divider-subtle pt-8">
			<p class="text-center text-xs text-faint sm:text-left">
				&copy; {currentYear} Accountech. All rights reserved.
			</p>
		</div>
	</div>
</footer>
