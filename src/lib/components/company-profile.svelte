<script lang="ts">
	const tabs = ['History', 'Vision', 'Mission', 'Values'] as const;
	let activeTab = $state(0);

	const values = [
		{
			title: 'Values',
			body: 'Strong ethical principles — honesty, respect, fairness and transparency in every engagement.'
		},
		{
			title: 'Excellence',
			body: 'Unparalleled service and exceptional quality, applied to ledgers, audits and code alike.'
		},
		{
			title: 'Integrity',
			body: 'Honesty, reliability and accountability in every dealing with clients and regulators.'
		},
		{
			title: 'Continual Improvement',
			body: 'Embracing innovation to adapt to evolving market demands and client needs.'
		},
		{
			title: 'Development',
			body: 'A committed investment in the growth, skill enhancement and career advancement of our people.'
		},
		{
			title: 'Responsibility',
			body: 'Contributing positively to society through ethical and sustainable practice.'
		}
	];
</script>

<section
	id="company"
	class="relative bg-paper px-6 sm:px-8 py-24 sm:py-36"
>
	<div class="mx-auto max-w-310">
		<div class="gap-x-6 gap-y-10 grid grid-cols-12 mb-16 sm:mb-20">
			<div class="col-span-12 md:col-span-4">
				<div class="flex items-center gap-3">
					<span class="font-mono text-[11px] text-seal uppercase tracking-[0.2em]">⊟ Profile</span>
					<span class="flex-1 bg-rule h-px"></span>
				</div>
				<p class="mt-6 max-w-[28ch] font-serif text-ink-soft text-lg italic leading-[1.45]">
					AccounTech Business Management Services. A practice rooted in Oriental
					Mindoro since 2017.
				</p>
			</div>
			<div class="col-span-12 md:col-span-8">
				<h2 class="font-serif font-light text-[clamp(2.25rem,5.5vw,4.5rem)] text-ink leading-[1.02] tracking-[-0.02em]">
					The four-part<br />
					<em class="font-medium not-italic">colophon</em>.
				</h2>
			</div>
		</div>

		<div class="relative border-ink/15 dark:border-rule border-t" role="tablist">
			<div class="flex gap-0 overflow-x-auto scrollbar-none">
				{#each tabs as tab, i (tab)}
					<button
						type="button"
						role="tab"
						aria-selected={activeTab === i}
						id="tab-{i}"
						onclick={() => (activeTab = i)}
						class="group relative px-5 sm:px-7 py-5 sm:py-6 first:pl-0 press shrink-0"
					>
						<div class="flex items-baseline gap-2.5">
							<span
								class={[
									'font-mono lining text-[11px] tracking-[0.16em] uppercase transition-colors duration-300',
									activeTab === i ? 'text-seal' : 'text-ink-faint'
								]}
								style="transition-timing-function: var(--ease-out-strong);"
							>
								0{i + 1}
							</span>
							<span
								class={[
									'font-serif text-xl font-light tracking-[-0.01em] transition-colors duration-300 sm:text-[1.6rem]',
									activeTab === i ? 'text-ink' : 'text-ink-muted'
								]}
								style="transition-timing-function: var(--ease-out-strong);"
							>
								{tab}
							</span>
						</div>
						<span
							class={[
								'absolute bottom-0 left-0 h-px bg-seal transition-[width] duration-400',
								activeTab === i ? 'w-full' : 'w-0'
							]}
							style="transition-timing-function: var(--ease-out-strong);"
							aria-hidden="true"
						></span>
					</button>
				{/each}
			</div>
		</div>

		<div class="gap-x-6 grid grid-cols-12 pt-12 sm:pt-16" role="tabpanel" aria-labelledby="tab-{activeTab}">
			{#key activeTab}
				<div class="col-span-12 reveal-up">
					{#if activeTab === 0}
						<div class="gap-x-6 gap-y-10 grid grid-cols-12">
							<div class="col-span-12 sm:col-span-3">
								<p class="font-mono font-light text-seal text-5xl sm:text-7xl lining">2017</p>
								<p class="mt-2 font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
									Established
								</p>
							</div>
							<div class="col-span-12 sm:col-span-9">
								<div class="space-y-5 max-w-[68ch] font-serif text-ink-soft text-lg sm:text-xl leading-[1.6]">
									<p>
										Established in 2017 as <em>DebitExpress Business Solutions</em>,
										our journey began modestly in Roxas, Oriental Mindoro — focused on
										tax compliance, consultancy and audit work for local businesses.
									</p>
									<p>
										Through deliberate study and a commitment to learning, our practice
										widened. The work taught us where ledgers ended and software needed
										to begin, laying the groundwork for what AccounTech does today.
									</p>
									<p>
										Now we offer integrated accounting, audit, tax compliance and
										system development across Oriental Mindoro and beyond — ledger work
										and software, one practice.
									</p>
								</div>
							</div>
						</div>
					{:else if activeTab === 1}
						<div class="gap-x-6 gap-y-10 grid grid-cols-12">
							<div class="col-span-12 sm:col-span-3">
								<p class="font-serif font-light text-seal text-3xl sm:text-4xl italic">
									Vision
								</p>
								<p class="mt-2 font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
									Where we're going
								</p>
							</div>
							<div class="col-span-12 sm:col-span-9">
								<div class="space-y-5 max-w-[68ch] font-serif text-ink-soft text-lg sm:text-xl leading-[1.6]">
									<p>
										To be a leading provider of comprehensive business management
										solutions — accounting, tax, audit and software — for businesses of
										every scale, from a first-month startup to a multi-branch
										enterprise.
									</p>
									<p>
										Streamlined assistance, end-to-end: business registration,
										meticulous tax compliance, advanced accounting practice and
										innovative system development, packaged as one engagement.
									</p>
								</div>
							</div>
						</div>
					{:else if activeTab === 2}
						<div class="gap-x-6 gap-y-10 grid grid-cols-12">
							<div class="col-span-12 sm:col-span-3">
								<p class="font-serif font-light text-seal text-3xl sm:text-4xl italic">
									Mission
								</p>
								<p class="mt-2 font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
									What we do daily
								</p>
							</div>
							<div class="col-span-12 sm:col-span-9">
								<div class="space-y-5 max-w-[68ch] font-serif text-ink-soft text-lg sm:text-xl leading-[1.6]">
									<p>
										Revolutionise and optimise accounting methodology — helping
										businesses achieve greater efficiency and accuracy in their
										financial operations, while alleviating the burden of regulatory
										compliance.
									</p>
									<p>
										Through high-quality financial audit and fortified business
										systems, we deliver assessments and guidance that aren't only
										compliant, but strategically tailored — instilling confidence and
										control over the financial process.
									</p>
								</div>
							</div>
						</div>
					{:else if activeTab === 3}
						<div class="gap-x-6 gap-y-2 grid grid-cols-12">
							{#each values as { title, body }, i (title)}
								<div class="gap-x-6 grid grid-cols-12 col-span-12 sm:col-span-12 py-6 border-rule-subtle border-b last:border-b-0">
									<div class="flex items-baseline gap-3 col-span-12 sm:col-span-4">
										<span class="font-mono text-[11px] text-ink-faint uppercase tracking-[0.16em] lining">
											0{i + 1}
										</span>
										<span class="font-serif font-light text-ink text-2xl tracking-[-0.01em]">
											{title}
										</span>
									</div>
									<p class="col-span-12 sm:col-span-8 mt-2 sm:mt-0 max-w-[58ch] text-[0.95rem] text-ink-soft sm:text-base leading-[1.6]">
										{body}
									</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/key}
		</div>
	</div>
</section>
