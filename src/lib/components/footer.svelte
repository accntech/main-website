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
	<div class="mx-auto max-w-[1240px] px-6 pt-20 pb-10 sm:px-8 sm:pt-28 sm:pb-12">
		<div class="grid grid-cols-12 gap-x-6 gap-y-12 border-t border-ink/15 pt-12 dark:border-rule">
			<div class="col-span-12 md:col-span-5">
				<a
					href="/"
					class="inline-flex items-baseline font-sans text-[1.5rem] leading-none font-bold tracking-[-0.025em] lowercase"
				>
					<span class="text-ink">accoun</span><span class="text-seal">tech<span>.</span></span>
				</a>
				<p class="mt-6 max-w-[42ch] font-serif text-lg leading-[1.45] text-ink-soft italic">
					Where accounting meets technology. A licensed CPA practice that also writes
					the software it depends on.
				</p>
				<p class="mt-6 font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
					Established 2017 · Oriental Mindoro · Philippines
				</p>
			</div>

			<div class="col-span-6 md:col-span-3">
				<h3 class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
					Sections
				</h3>
				<ul class="mt-5 space-y-3">
					{#each quickLinks as { label, href } (href)}
						<li>
							<a {href} class="rule-grow font-serif text-lg text-ink transition-colors hover:text-seal">
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="col-span-6 md:col-span-4">
				<h3 class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
					Direct
				</h3>
				<ul class="mt-5 space-y-3 font-serif text-lg text-ink">
					<li>
						<a href="mailto:accntech.dev@gmail.com" class="rule-grow transition-colors hover:text-seal">
							accntech.dev@gmail.com
						</a>
					</li>
					<li>
						<a href="tel:+639952942417" class="rule-grow transition-colors hover:text-seal">
							+63 995 294 2417
						</a>
					</li>
					<li class="text-ink-soft">Roxas · Mansalay</li>
				</ul>
			</div>
		</div>

		<div class="mt-16 grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-rule-subtle pt-6">
			<p class="col-span-12 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase sm:col-span-6">
				© {currentYear} AccounTech Business Management Services
			</p>
			<p class="col-span-12 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase sm:col-span-6 sm:text-right">
				Set in Source Serif &amp; Geist · Volume 008
			</p>
		</div>
	</div>
</footer>
