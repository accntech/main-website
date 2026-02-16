<script lang="ts">
	const tabs = ['History', 'Vision', 'Mission', 'Core Values'] as const;
	let activeTab = $state(0);
</script>

<section id="company" class="relative bg-base px-5 sm:px-6 py-16 sm:py-28 overflow-hidden">
	<div
		class="absolute inset-0 pointer-events-none"
		aria-hidden="true"
		style="background: radial-gradient(ellipse 50% 50% at 80% 50%, rgba(6, 182, 212, 0.05), transparent);"
	></div>

	<div class="relative mx-auto max-w-6xl">
		<div class="mb-12 sm:mb-16">
			<span class="font-rajdhani font-bold text-teal text-sm uppercase tracking-widest">Who We Are</span>
			<h2 class="mt-3 font-rajdhani font-bold text-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
				Company Profile
			</h2>
			<p class="mt-2 font-rajdhani font-semibold text-teal text-lg sm:text-xl">
				AccounTech Business Management Services
			</p>
			<p class="mt-4 max-w-lg text-body text-lg">
				Rooted in Oriental Mindoro since 2017, delivering quality accounting, audit, tax compliance, and system development services.
			</p>
		</div>

		<div class="flex gap-2 overflow-x-auto border-b border-divider-subtle pb-px mb-10 sm:mb-14" role="tablist" style="-webkit-overflow-scrolling: touch;">
			{#each tabs as tab, i (tab)}
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === i}
					id="tab-{i}"
					onclick={() => (activeTab = i)}
					class="font-rajdhani font-semibold text-sm uppercase tracking-widest px-4 py-3 transition-colors whitespace-nowrap border-b-2 {activeTab === i
						? 'text-teal border-teal'
						: 'text-muted hover:text-heading border-transparent'}"
				>
					{tab}
				</button>
			{/each}
		</div>

		{#key activeTab}
			<div class="tab-content" role="tabpanel" aria-labelledby="tab-{activeTab}">
				{#if activeTab === 0}
					<div class="flex items-start gap-6">
						<div class="hidden sm:flex flex-col items-center shrink-0">
							<span class="font-rajdhani font-bold text-teal text-4xl">2017</span>
							<span class="text-muted text-xs uppercase tracking-widest">Est.</span>
						</div>
						<div class="space-y-4 leading-relaxed">
							<p>Established in 2017 as 'DebitExpress Business Solutions,' our journey began humbly in Roxas, Oriental Mindoro. Initially focusing on providing tax compliance, consultancy, and audit services to local businesses, we started small.</p>
							<p>Through dedicated efforts and a commitment to learning, our expertise in accounting and taxation gradually evolved. This journey has equipped us with valuable insights and skills, laying a modest yet sturdy groundwork.</p>
							<p>Today, with gratitude for the experience gained, we strive to offer quality accounting, audit, tax compliance, and system development services within the Province of Oriental Mindoro.</p>
						</div>
					</div>
				{:else if activeTab === 1}
					<div class="max-w-3xl space-y-4 leading-relaxed">
						<p>A leading provider of comprehensive business management solutions. Specializing in accounting, tax, audit, and software development services, we support businesses of varying scales, from startups to larger enterprises.</p>
						<p>Our commitment lies in offering streamlined assistance, encompassing business registration, meticulous tax compliance, advanced accounting practices, and innovative system development, to empower businesses in today's dynamic market.</p>
					</div>
				{:else if activeTab === 2}
					<div class="max-w-3xl space-y-4 leading-relaxed">
						<p>We strive to revolutionize and optimize accounting methodologies, aiding businesses in achieving greater efficiency and accuracy in their financial operations — while alleviating the burden of governmental compliance to ensure a smoother regulatory process.</p>
						<p>Through top-notch financial audit services and fortified business systems, we deliver comprehensive and reliable financial assessments. Our holistic financial guidance encompasses not just compliance but strategic financial planning tailored to each business's unique needs, instilling confidence and fostering deeper control over financial processes.</p>
					</div>
				{:else if activeTab === 3}
					<div class="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						<div class="group flex items-start gap-3 bg-elevated/50 px-4 py-3 border border-divider-subtle rounded-xl">
							<div class="flex justify-center items-center bg-teal/10 mt-0.5 rounded-lg w-8 h-8 shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-teal" aria-hidden="true">
									<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
								</svg>
							</div>
							<div>
								<p class="font-rajdhani font-semibold text-heading text-sm">Values</p>
								<p class="text-muted text-xs leading-snug">Upholding strong ethical principles, honesty, respect, fairness, and transparency.</p>
							</div>
						</div>

						<div class="group flex items-start gap-3 bg-elevated/50 px-4 py-3 border border-divider-subtle rounded-xl">
							<div class="flex justify-center items-center bg-teal/10 mt-0.5 rounded-lg w-8 h-8 shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-teal" aria-hidden="true">
									<path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
								</svg>
							</div>
							<div>
								<p class="font-rajdhani font-semibold text-heading text-sm">Service & Quality Excellence</p>
								<p class="text-muted text-xs leading-snug">Delivering unparalleled service and exceptional quality in every aspect.</p>
							</div>
						</div>

						<div class="group flex items-start gap-3 bg-elevated/50 px-4 py-3 border border-divider-subtle rounded-xl">
							<div class="flex justify-center items-center bg-teal/10 mt-0.5 rounded-lg w-8 h-8 shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-teal" aria-hidden="true">
									<path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.932 9.563 12.348a.749.749 0 00.374 0c5.499-1.416 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516 11.209 11.209 0 01-7.877-3.08zm.338 7.244a.75.75 0 00-1.209-.888l-2.747 3.736a.75.75 0 01-1.088.09L6.87 11.48a.75.75 0 00-.98 1.137l1.614 1.39a2.25 2.25 0 003.264-.27l2.086-2.836v-.001z" clip-rule="evenodd" />
								</svg>
							</div>
							<div>
								<p class="font-rajdhani font-semibold text-heading text-sm">Integrity & Professionalism</p>
								<p class="text-muted text-xs leading-snug">Maintaining honesty, reliability, and accountability in all dealings.</p>
							</div>
						</div>

						<div class="group flex items-start gap-3 bg-elevated/50 px-4 py-3 border border-divider-subtle rounded-xl">
							<div class="flex justify-center items-center bg-teal/10 mt-0.5 rounded-lg w-8 h-8 shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-teal" aria-hidden="true">
									<path fill-rule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.431l5.942 2.28a.75.75 0 01.431.97l-2.28 5.941a.75.75 0 11-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 00-5.45 5.174.75.75 0 01-1.199.19L9 12.31l-6.22 6.22a.75.75 0 11-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l3.606 3.605a12.695 12.695 0 015.68-4.973l1.086-.484-4.251-1.631a.75.75 0 01-.432-.97z" clip-rule="evenodd" />
								</svg>
							</div>
							<div>
								<p class="font-rajdhani font-semibold text-heading text-sm">Continual Improvement</p>
								<p class="text-muted text-xs leading-snug">Embracing innovation to adapt to evolving market demands and client needs.</p>
							</div>
						</div>

						<div class="group flex items-start gap-3 bg-elevated/50 px-4 py-3 border border-divider-subtle rounded-xl">
							<div class="flex justify-center items-center bg-teal/10 mt-0.5 rounded-lg w-8 h-8 shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-teal" aria-hidden="true">
									<path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
									<path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
									<path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
								</svg>
							</div>
							<div>
								<p class="font-rajdhani font-semibold text-heading text-sm">Professional Development</p>
								<p class="text-muted text-xs leading-snug">Commitment to employee growth, skill enhancement, and career advancement.</p>
							</div>
						</div>

						<div class="group flex items-start gap-3 bg-elevated/50 px-4 py-3 border border-divider-subtle rounded-xl">
							<div class="flex justify-center items-center bg-teal/10 mt-0.5 rounded-lg w-8 h-8 shrink-0">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-teal" aria-hidden="true">
									<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clip-rule="evenodd" />
								</svg>
							</div>
							<div>
								<p class="font-rajdhani font-semibold text-heading text-sm">Social Responsibility</p>
								<p class="text-muted text-xs leading-snug">Contributing positively to society through ethical and sustainable practices.</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/key}
	</div>
</section>

<style>
	@keyframes tabFadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.tab-content {
		animation: tabFadeIn 0.3s ease-out;
	}
</style>
