<script lang="ts">
	import Icon from '@iconify/svelte';

	const services = [
		{
			num: '01',
			title: 'Tax Compliance',
			description:
				'BIR filings, returns and regulatory paperwork — kept on time and audit-ready. We translate the tax code into a calendar you can actually live with.',
			tags: ['Monthly · Quarterly', '1701 · 1702 · 2550', 'Withholding']
		},
		{
			num: '02',
			title: 'Tax Advisory',
			description:
				'Strategic structuring to minimise liabilities, before they become a problem. Tax-efficient planning grounded in current Philippine practice.',
			tags: ['Structuring', 'Position Papers', 'BIR Letters']
		},
		{
			num: '03',
			title: 'Business Registration',
			description:
				'SEC, DTI, BIR and local permits — the full incorporation process taken end-to-end so you can launch instead of queue.',
			tags: ['SEC · DTI', 'BIR · COR', 'ATP']
		},
		{
			num: '04',
			title: 'Management Advisory',
			description:
				'Reading the numbers as a story about the business. Operational reviews, financial modelling and decisions backed by the ledger.',
			tags: ['Cash Flow', 'KPI Design', 'Cost Studies']
		},
		{
			num: '05',
			title: 'System Development',
			description:
				'Custom web and desktop applications, written by a CPA-led engineering team. The systems we build understand the books they post into.',
			tags: ['Web · Desktop', 'Internal Tools', 'Migrations']
		},
		{
			num: '06',
			title: 'Accounting Software',
			description:
				'Off-the-shelf and bespoke accounting software, configured to your chart of accounts. Bookkeeping, reporting and compliance in one stack.',
			tags: ['Bookkeeping', 'Reporting', 'Compliance']
		}
	];
</script>

<section
	id="services"
	class="relative bg-paper px-6 py-24 sm:px-8 sm:py-36"
>
	<div class="mx-auto max-w-[1240px]">
		<div class="grid grid-cols-12 gap-x-6 gap-y-10 mb-16 sm:mb-24">
			<div class="col-span-12 md:col-span-4">
				<div class="flex items-center gap-3">
					<span class="font-mono text-[11px] tracking-[0.2em] text-seal uppercase">§ Index</span>
					<span class="h-px flex-1 bg-rule"></span>
				</div>
				<p class="mt-6 font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
					Six pillars · 2025
				</p>
			</div>
			<div class="col-span-12 md:col-span-8">
				<h2 class="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink">
					Services, written like a<br />
					<em class="font-medium not-italic">table of contents</em>.
				</h2>
				<p class="mt-6 max-w-[55ch] text-base leading-[1.6] text-ink-soft sm:text-lg">
					Six interlocking practice areas. Most clients engage two or three at once —
					compliance with advisory, registration with software, audit with operational
					review.
				</p>
			</div>
		</div>

		<ol class="border-t border-ink/15 dark:border-rule">
			{#each services as service (service.num)}
				<li>
					<a
						href="#contact"
						class="group grid grid-cols-12 items-start gap-x-6 gap-y-3 border-b border-rule-subtle py-7 sm:py-10 transition-colors duration-300"
						style="transition-timing-function: var(--ease-out-strong);"
					>
						<div class="col-span-2 sm:col-span-1 pt-1 sm:pt-2">
							<span class="font-mono lining text-sm font-medium text-seal sm:text-base">
								{service.num}
							</span>
						</div>

						<div class="col-span-9 sm:col-span-7 lg:col-span-6">
							<h3 class="font-serif text-[1.65rem] leading-[1.1] font-light tracking-[-0.015em] text-ink transition-colors duration-300 group-hover:text-seal sm:text-4xl sm:leading-[1.05] lg:text-[2.75rem]" style="transition-timing-function: var(--ease-out-strong);">
								{service.title}
							</h3>
							<p class="mt-3 max-w-[58ch] text-[0.95rem] leading-[1.55] text-ink-soft sm:text-base">
								{service.description}
							</p>
						</div>

						<div class="col-span-1 sm:hidden flex justify-end pt-2 text-ink-faint group-hover:text-seal transition-colors duration-300">
							<Icon icon="solar:arrow-right-linear" width="16" height="16" aria-hidden="true" />
						</div>

						<div class="col-span-12 mt-1 flex flex-wrap gap-x-5 gap-y-2 sm:col-span-4 sm:mt-0 sm:flex-col sm:gap-y-2 lg:col-span-5 lg:pl-8">
							{#each service.tags as tag (tag)}
								<span class="font-mono text-[10.5px] tracking-[0.16em] text-ink-muted uppercase sm:text-[11px]">
									{tag}
								</span>
							{/each}
						</div>
					</a>
				</li>
			{/each}
		</ol>

		<div class="mt-10 flex flex-col-reverse sm:flex-row sm:flex-wrap items-stretch sm:items-center sm:justify-between gap-6 sm:mt-16">
			<p class="max-w-[40ch] font-serif text-lg leading-[1.45] text-ink-soft italic">
				Not sure which pillar maps to your problem? That's usually the answer to start
				the conversation.
			</p>
			<a
				href="#contact"
				class="press group inline-flex justify-center sm:justify-start items-center gap-3 rounded-md border border-seal bg-seal px-5 py-3.5 font-mono text-[11px] tracking-[0.18em] text-paper uppercase shadow-sm transition-[background-color,border-color,box-shadow] duration-200 hover:bg-seal-deep hover:border-seal-deep hover:shadow-md dark:text-ink"
			>
				Brief us
				<Icon
					icon="solar:arrow-right-linear"
					width="14"
					height="14"
					class="transition-transform duration-300 group-hover:translate-x-1"
					style="transition-timing-function: var(--ease-out-strong);"
					aria-hidden="true"
				/>
			</a>
		</div>
	</div>
</section>
