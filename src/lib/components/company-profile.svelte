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
	class="relative bg-paper px-6 py-24 sm:px-8 sm:py-36"
>
	<div class="mx-auto max-w-[1240px]">
		<div class="grid grid-cols-12 gap-x-6 gap-y-10 mb-16 sm:mb-20">
			<div class="col-span-12 md:col-span-4">
				<div class="flex items-center gap-3">
					<span class="font-mono text-[11px] tracking-[0.2em] text-seal uppercase">⊟ Profile</span>
					<span class="h-px flex-1 bg-rule"></span>
				</div>
				<p class="mt-6 max-w-[28ch] font-serif text-lg italic leading-[1.45] text-ink-soft">
					AccounTech Business Management Services. A practice rooted in Oriental
					Mindoro since 2017.
				</p>
			</div>
			<div class="col-span-12 md:col-span-8">
				<h2 class="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink">
					The four-part<br />
					<em class="font-medium not-italic">colophon</em>.
				</h2>
			</div>
		</div>

		<div class="relative border-t border-ink/15 dark:border-rule" role="tablist">
			<div class="flex gap-0 overflow-x-auto scrollbar-none">
				{#each tabs as tab, i (tab)}
					<button
						type="button"
						role="tab"
						aria-selected={activeTab === i}
						id="tab-{i}"
						onclick={() => (activeTab = i)}
						class="press group relative shrink-0 px-5 py-5 first:pl-0 sm:px-7 sm:py-6"
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

		<div class="grid grid-cols-12 gap-x-6 pt-12 sm:pt-16" role="tabpanel" aria-labelledby="tab-{activeTab}">
			{#key activeTab}
				<div class="col-span-12 reveal-up">
					{#if activeTab === 0}
						<div class="grid grid-cols-12 gap-x-6 gap-y-10">
							<div class="col-span-12 sm:col-span-3">
								<p class="font-mono lining text-5xl font-light text-seal sm:text-7xl">2017</p>
								<p class="mt-2 font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
									Established
								</p>
							</div>
							<div class="col-span-12 sm:col-span-9">
								<div class="space-y-5 max-w-[68ch] font-serif text-lg leading-[1.6] text-ink-soft sm:text-xl">
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
										system development across Oriental Mindoro and beyond — written by
										CPAs, supported by engineers.
									</p>
								</div>
							</div>
						</div>
					{:else if activeTab === 1}
						<div class="grid grid-cols-12 gap-x-6 gap-y-10">
							<div class="col-span-12 sm:col-span-3">
								<p class="font-serif text-3xl font-light italic text-seal sm:text-4xl">
									Vision
								</p>
								<p class="mt-2 font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
									Where we're going
								</p>
							</div>
							<div class="col-span-12 sm:col-span-9">
								<div class="space-y-5 max-w-[68ch] font-serif text-lg leading-[1.6] text-ink-soft sm:text-xl">
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
						<div class="grid grid-cols-12 gap-x-6 gap-y-10">
							<div class="col-span-12 sm:col-span-3">
								<p class="font-serif text-3xl font-light italic text-seal sm:text-4xl">
									Mission
								</p>
								<p class="mt-2 font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
									What we do daily
								</p>
							</div>
							<div class="col-span-12 sm:col-span-9">
								<div class="space-y-5 max-w-[68ch] font-serif text-lg leading-[1.6] text-ink-soft sm:text-xl">
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
						<div class="grid grid-cols-12 gap-x-6 gap-y-2">
							{#each values as { title, body }, i (title)}
								<div class="col-span-12 grid grid-cols-12 gap-x-6 border-b border-rule-subtle py-6 last:border-b-0 sm:col-span-12">
									<div class="col-span-12 flex items-baseline gap-3 sm:col-span-4">
										<span class="font-mono lining text-[11px] tracking-[0.16em] text-ink-faint uppercase">
											0{i + 1}
										</span>
										<span class="font-serif text-2xl font-light tracking-[-0.01em] text-ink">
											{title}
										</span>
									</div>
									<p class="col-span-12 mt-2 max-w-[58ch] text-[0.95rem] leading-[1.6] text-ink-soft sm:col-span-8 sm:mt-0 sm:text-base">
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
