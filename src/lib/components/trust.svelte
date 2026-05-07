<script lang="ts">
	const ledger = [
		{ value: '08+', label: 'Years in practice' },
		{ value: 'CPA', label: 'PRC-board licensed' },
		{ value: '06', label: 'Service pillars' },
		{ value: '04+', label: 'Entity types served' }
	];

	const pillars = [
		{
			label: 'Licensed & Compliant',
			body: 'Certified Public Accountant licensed by the Philippine Board of Accountancy. Every engagement follows professional standards and current regulatory requirements.'
		},
		{
			label: 'Industry Speaker',
			body: 'An active speaker and trainer on accounting and taxation, sharing practical knowledge at seminars and workshops for professionals and organisations.'
		},
		{
			label: 'Tech-Forward',
			body: 'Unlike traditional firms, we build the software too — combining deep financial expertise with modern engineering practice in a single team.'
		}
	];
</script>

<section class="relative bg-paper px-6 py-24 sm:px-8 sm:py-36">
	<div class="mx-auto max-w-[1240px]">
		<div class="grid grid-cols-12 gap-x-6 gap-y-10 mb-16 sm:mb-20">
			<div class="col-span-12 md:col-span-4">
				<div class="flex items-center gap-3">
					<span class="font-mono text-[11px] tracking-[0.2em] text-seal uppercase">
						† Footnotes
					</span>
					<span class="h-px flex-1 bg-rule"></span>
				</div>
			</div>
			<div class="col-span-12 md:col-span-8">
				<h2 class="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink">
					Why this practice<br />
					is <em class="font-medium not-italic">credible</em>.
				</h2>
				<p class="mt-6 max-w-[55ch] text-base leading-[1.6] text-ink-soft sm:text-lg">
					Real credentials, real engagements, and a track record across Oriental
					Mindoro and the businesses that operate beyond it.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-2 border-t border-b border-ink/15 dark:border-rule lg:grid-cols-4">
			{#each ledger as { value, label }, i (label)}
				<div
					class={[
						'p-6 sm:p-8',
						i % 2 !== 0 && 'border-l border-rule-subtle',
						i < 2 && 'border-b border-rule-subtle lg:border-b-0',
						i >= 2 && i !== 2 && 'lg:border-l lg:border-rule-subtle',
						i === 2 && 'lg:border-l lg:border-rule-subtle',
						i === 1 && 'lg:border-l lg:border-rule-subtle'
					]}
				>
					<p class="font-mono lining text-5xl font-light tracking-[-0.02em] text-ink sm:text-6xl">
						{value}
					</p>
					<p class="mt-3 font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
						{label}
					</p>
				</div>
			{/each}
		</div>

		<div class="mt-20 grid grid-cols-12 gap-x-6 gap-y-12">
			{#each pillars as { label, body }, i (label)}
				<div class="col-span-12 sm:col-span-12 md:col-span-4">
					<div class="flex items-baseline gap-3">
						<span class="font-mono lining text-[11px] tracking-[0.16em] text-seal uppercase">
							0{i + 1}
						</span>
						<span class="font-mono text-[11px] tracking-[0.16em] text-ink-muted uppercase">
							Pillar
						</span>
					</div>
					<h3 class="mt-4 font-serif text-2xl font-light tracking-[-0.01em] text-ink sm:text-3xl">
						{label}
					</h3>
					<p class="mt-4 max-w-[42ch] text-[0.95rem] leading-[1.6] text-ink-soft sm:text-base">
						{body}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
