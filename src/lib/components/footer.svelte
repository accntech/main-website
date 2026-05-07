<script lang="ts">
	const quickLinks = [
		{ label: 'Services', href: '/#services' },
		{ label: 'Profile', href: '/#company' },
		{ label: 'Founder', href: '/#about' },
		{ label: 'Contact', href: '/#contact' },
		{ label: 'Apps', href: '/apps' }
	] as const;

	const currentYear = new Date().getFullYear();
</script>

<footer class="relative bg-paper">
	<div class="mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-10 sm:pb-12 max-w-310">
		<div class="gap-x-6 gap-y-10 sm:gap-y-12 grid grid-cols-12 pt-10 sm:pt-12 border-ink/15 dark:border-rule border-t">
			<div class="col-span-12 md:col-span-5">
				<a
					href="/"
					class="inline-flex items-baseline font-sans font-bold text-[1.5rem] lowercase leading-none tracking-[-0.025em]"
				>
					<span class="text-ink">accoun</span><span class="text-seal">tech<span>.</span></span>
				</a>
				<p class="mt-5 max-w-[42ch] font-serif text-ink-soft text-base sm:text-lg italic leading-[1.5] sm:leading-[1.45]">
					Where accounting meets technology. A licensed CPA practice that also writes
					the software it depends on.
				</p>
				<p class="mt-5 font-mono text-[10.5px] sm:text-[11px] text-ink-muted uppercase tracking-[0.16em]">
					Established 2017 · Oriental Mindoro · Philippines
				</p>
			</div>

			<div class="col-span-6 md:col-span-3">
				<h3 class="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
					Sections
				</h3>
				<ul class="mt-4 sm:mt-5 -mx-1">
					{#each quickLinks as { label, href } (href)}
						<li>
							<a
								{href}
								class="inline-flex items-center font-serif text-ink hover:text-seal text-lg transition-colors rule-grow px-1 py-1.5"
							>
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="col-span-6 md:col-span-4">
				<h3 class="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
					Direct
				</h3>
				<ul class="mt-4 sm:mt-5 -mx-1 font-serif text-ink text-lg">
					<li>
						<a
							href="mailto:accntech.dev@gmail.com"
							class="inline-flex items-center hover:text-seal transition-colors rule-grow break-all px-1 py-1.5"
						>
							accntech.dev@gmail.com
						</a>
					</li>
					<li>
						<a
							href="tel:+639952942417"
							class="inline-flex items-center hover:text-seal transition-colors rule-grow px-1 py-1.5"
						>
							+63 995 294 2417
						</a>
					</li>
					<li class="text-ink-soft px-1 py-1.5">Roxas · Mansalay</li>
				</ul>
			</div>
		</div>

		<div class="items-baseline gap-x-6 gap-y-3 grid grid-cols-12 mt-16 pt-6 border-rule-subtle border-t">
			<p class="col-span-12 sm:col-span-6 font-mono text-[10px] text-ink-faint uppercase tracking-[0.18em]">
				© {currentYear} AccounTech Business Management Services
			</p>
			<p class="col-span-12 sm:col-span-6 font-mono text-[10px] text-ink-faint sm:text-right uppercase tracking-[0.18em]">
				Set in Source Serif &amp; Geist · Volume 008
			</p>
		</div>
	</div>
</footer>
