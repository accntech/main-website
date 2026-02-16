<script lang="ts">
	const quickLinks = [
		{ label: 'Services', href: '#services' },
		{ label: 'Company', href: '#company' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	] as const;

	const currentYear = new Date().getFullYear();
</script>

<footer class="relative bg-base">
	<div class="bg-linear-to-r from-transparent via-teal/30 to-transparent h-px"></div>

	<div class="mx-auto px-5 sm:px-6 py-10 sm:py-16 max-w-6xl">
		<div class="gap-12 grid grid-cols-1 md:grid-cols-12">
			<div class="md:col-span-5">
				<a href="/" class="font-rajdhani font-bold text-heading text-xl">
					accoun<span class="text-teal">tech</span><span class="text-teal">.</span>
				</a>
				<p class="mt-3 max-w-xs text-muted text-sm leading-relaxed">
					Where Accounting Meets Technology. Empowering businesses with integrated financial and tech solutions.
				</p>
			</div>

			<div class="md:col-span-3">
				<h3 class="font-bold text-body text-xs uppercase tracking-widest">
					Navigation
				</h3>
				<ul class="space-y-3 mt-4">
					{#each quickLinks as { label, href } (href)}
						<li>
							<a {href} class="text-muted hover:text-teal text-sm transition-colors duration-200">
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="md:col-span-4">
				<h3 class="font-bold text-body text-xs uppercase tracking-widest">
					Contact
				</h3>
				<ul class="space-y-3 mt-4 text-muted text-sm">
					<li>
						<a href="mailto:accntech.dev@gmail.com" class="hover:text-teal transition-colors">
							accntech.dev@gmail.com
						</a>
					</li>
					<li>+63 995 294 2417</li>
					<li>Oriental Mindoro, Philippines</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 pt-8 border-divider-subtle border-t">
			<p class="text-faint text-xs sm:text-left text-center">
				&copy; {currentYear} AccounTech. All rights reserved.
			</p>
		</div>
	</div>
</footer>
