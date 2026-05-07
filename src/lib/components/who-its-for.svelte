<script lang="ts">
	const audiences = [
		{
			num: 'A',
			label: 'Startups & New Businesses',
			question: 'I want to register, but the BIR/SEC paperwork keeps stalling me.',
			answer:
				'We run incorporation end-to-end — SEC or DTI, BIR registration, and the rest of the launch paperwork — so you spend the launch month building, not queueing.'
		},
		{
			num: 'B',
			label: 'Growing SMEs',
			question: 'My books live in spreadsheets. I have no idea what my real margin is.',
			answer:
				'We migrate you onto a proper ledger, set up monthly close, and report the numbers in a way that finally answers strategic questions.'
		},
		{
			num: 'C',
			label: 'Corporations & Cooperatives',
			question: 'We need an audit partner who actually understands our sector.',
			answer:
				'Independent audit and assurance work for corporate entities and cooperatives, with the documentation and follow-through that boards and regulators expect.'
		},
		{
			num: 'D',
			label: 'Schools & Institutions',
			question: 'Education-sector audits have rules generic firms get wrong.',
			answer:
				'Specialised audit and compliance work for schools and academic organisations — calibrated to the unique financial reporting they answer to.'
		}
	];
</script>

<section class="relative bg-surface px-6 py-24 sm:px-8 sm:py-36">
	<div class="mx-auto max-w-[1240px]">
		<div class="grid grid-cols-12 gap-x-6 gap-y-10 mb-16 sm:mb-20">
			<div class="col-span-12 md:col-span-4">
				<div class="flex items-center gap-3">
					<span class="font-mono text-[11px] tracking-[0.2em] text-seal uppercase">¶ Audience</span>
					<span class="h-px flex-1 bg-rule"></span>
				</div>
			</div>
			<div class="col-span-12 md:col-span-8">
				<h2 class="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink">
					Four conversations<br />
					we have <em class="font-medium not-italic">most weeks</em>.
				</h2>
				<p class="mt-6 max-w-[55ch] text-base leading-[1.6] text-ink-soft sm:text-lg">
					If one of these reads like your inbox right now, it's not coincidence — it's
					the same set of problems we've been quietly solving since 2017.
				</p>
			</div>
		</div>

		<div class="border-t border-ink/15 dark:border-rule">
			{#each audiences as { num, label, question, answer }, i (num)}
				<div class="grid grid-cols-12 gap-x-6 gap-y-4 border-b border-rule-subtle py-10 sm:py-12">
					<div class="col-span-12 sm:col-span-3">
						<div class="flex items-baseline gap-3">
							<span class="font-serif text-4xl font-light text-seal sm:text-5xl">{num}</span>
							<span class="font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
								Case {String(i + 1).padStart(2, '0')}
							</span>
						</div>
						<p class="mt-4 font-mono text-[11px] leading-[1.5] tracking-[0.16em] text-ink uppercase">
							{label}
						</p>
					</div>

					<div class="col-span-12 sm:col-span-9">
						<p class="font-serif text-2xl leading-[1.25] text-ink italic sm:text-3xl">
							"{question}"
						</p>
						<p class="mt-5 max-w-[60ch] text-[0.95rem] leading-[1.6] text-ink-soft sm:text-base">
							{answer}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
