<script lang="ts">
	import Icon from '@iconify/svelte';

	const experience = [
		{ label: 'Educator', body: 'Academic teaching in accounting and finance' },
		{ label: 'Speaker & Trainer', body: 'Accounting and tax seminars · workshops' },
		{ label: 'Sole Proprietorships', body: 'Auditing for owner-managed businesses' },
		{ label: 'Corporations', body: 'Auditing for corporate entities' },
		{ label: 'Cooperatives', body: 'Auditing for cooperative organisations' },
		{ label: 'Educational Institutions', body: 'Auditing for academic organisations' }
	];
</script>

<section
	id="about"
	class="relative overflow-hidden bg-surface px-6 py-24 sm:px-8 sm:py-36"
>
	<div class="mx-auto max-w-[1240px]">
		<div class="grid grid-cols-12 gap-x-6 gap-y-10 mb-16 sm:mb-20">
			<div class="col-span-12 md:col-span-4">
				<div class="flex items-center gap-3">
					<span class="font-mono text-[11px] tracking-[0.2em] text-seal uppercase">⌬ Bylines</span>
					<span class="h-px flex-1 bg-rule"></span>
				</div>
			</div>
			<div class="col-span-12 md:col-span-8">
				<h2 class="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink">
					On the founder.
				</h2>
			</div>
		</div>

		<div class="grid grid-cols-12 gap-x-6 gap-y-12">
			<div class="col-span-12 lg:col-span-5">
				<figure class="relative">
					<div class="relative overflow-hidden rounded-xl bg-elevated shadow-sm">
						<img
							src="https://res.cloudinary.com/accountech/image/upload/v1771235077/iuatksezjs7zfdgobo1m.png"
							alt="Ogie Galicia, CPA — Founder of AccounTech"
							class="aspect-[4/5] w-full object-cover"
						/>
						<div
							class="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.04] dark:mix-blend-screen dark:opacity-[0.08]"
							aria-hidden="true"
							style="background: repeating-linear-gradient(0deg, transparent 0px, transparent 2px, currentColor 2px, currentColor 3px);"
						></div>
					</div>

					<figcaption class="mt-4 grid grid-cols-[auto_1fr_auto] items-baseline gap-3">
						<span class="font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
							Plate I
						</span>
						<span class="h-px bg-rule-subtle"></span>
						<span class="font-mono text-[10px] tracking-[0.18em] text-ink-muted uppercase">
							Founder · CPA
						</span>
					</figcaption>
				</figure>
			</div>

			<div class="col-span-12 lg:col-span-7 lg:pl-8">
				<p class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
					Ogie Galicia
				</p>
				<h3 class="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] font-light tracking-[-0.02em] text-ink">
					Certified Public<br />
					Accountant<span class="text-seal">.</span>
				</h3>

				<div class="mt-8 max-w-[58ch] space-y-5 font-serif text-lg leading-[1.55] text-ink-soft sm:text-xl">
					<p>
						A licensed Certified Public Accountant in the Philippines, Ogie founded
						AccounTech to close the gap between traditional accounting practice and
						the software it now depends on.
					</p>
					<p>
						He works across tax compliance, business advisory and software
						development, leveraging the firm to deliver integrated solutions for
						businesses that have outgrown the spreadsheet stage. He is also an
						active speaker and trainer on accounting and taxation, sharing practical
						knowledge with professionals and organisations.
					</p>
				</div>

				<div class="mt-12">
					<div class="flex items-center gap-3">
						<span class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
							Practice areas
						</span>
						<span class="h-px flex-1 bg-rule-subtle"></span>
					</div>

					<dl class="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
						{#each experience as { label, body }, i (label)}
							<div class="grid grid-cols-[auto_1fr] items-baseline gap-3 border-t border-rule-subtle pt-3">
								<span class="font-mono lining text-[10px] tracking-[0.16em] text-ink-faint uppercase">
									{String(i + 1).padStart(2, '0')}
								</span>
								<div>
									<dt class="font-serif text-base font-medium text-ink">{label}</dt>
									<dd class="mt-0.5 text-sm leading-[1.45] text-ink-muted">{body}</dd>
								</div>
							</div>
						{/each}
					</dl>
				</div>

				<blockquote class="mt-12 max-w-[52ch] border-l border-seal pl-6">
					<p class="font-serif text-xl leading-[1.45] text-ink italic sm:text-2xl">
						Our approach combines deep financial expertise with technical innovation —
						ensuring every solution is both compliant and current.
					</p>
				</blockquote>

				<a
					href="/cv"
					class="rule-grow mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-ink uppercase transition-colors hover:text-seal"
				>
					Read the full CV
					<Icon icon="solar:arrow-right-linear" width="14" height="14" aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</section>
