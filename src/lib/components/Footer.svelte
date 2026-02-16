<script lang="ts">
	const quickLinks = [
		{ label: 'Services', href: '#services' },
		{ label: 'About', href: '#about' },
		{ label: 'Contact', href: '#contact' }
	] as const;

	const currentYear = new Date().getFullYear();
</script>

<footer class="bg-navy">
	<!-- Teal top border -->
	<div class="h-px bg-teal/30"></div>

	<div class="mx-auto max-w-6xl px-6 py-16">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Brand -->
			<div>
				<a href="/" class="font-syne text-xl font-bold text-white">
					Account<span class="text-teal">tech</span>
				</a>
				<p class="font-outfit mt-2 text-sm text-slate-500">
					Where Accounting Meets Technology
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="font-outfit mb-4 text-sm uppercase tracking-widest text-slate-400">
					Quick Links
				</h3>
				<ul class="space-y-3">
					{#each quickLinks as { label, href } (href)}
						<li>
							<a
								{href}
								class="font-outfit text-slate-400 transition-colors duration-200 hover:text-teal"
							>
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact -->
			<div>
				<h3 class="font-outfit mb-4 text-sm uppercase tracking-widest text-slate-400">
					Contact
				</h3>
				<ul class="space-y-3">
					<li class="font-outfit text-slate-400">hello@accountech.ph</li>
					<li class="font-outfit text-slate-400">+63 XXX XXX XXXX</li>
					<li class="font-outfit text-slate-400">Metro Manila, Philippines</li>
				</ul>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-12 border-t border-slate-800 pt-8 text-center">
			<p class="font-outfit text-sm text-slate-500">
				&copy; {currentYear} Accountech. All rights reserved.
			</p>
		</div>
	</div>
</footer>
