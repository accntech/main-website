<script lang="ts">
	const services = [
		{
			num: '01',
			title: 'Tax Compliance',
			description: 'Ensure your business meets all BIR requirements. We handle tax filings, returns, and regulatory compliance.',
			icon: 'clipboard'
		},
		{
			num: '02',
			title: 'Tax Advisory',
			description: 'Strategic tax planning to minimize liabilities and maximize savings through tax-efficient structures.',
			icon: 'lightbulb'
		},
		{
			num: '03',
			title: 'Business Registrations',
			description: 'SEC/DTI registration to BIR and local permits — the full process to get your business operational.',
			icon: 'building'
		},
		{
			num: '04',
			title: 'Management Advisory',
			description: 'Data-driven insights and strategic advice to improve operations and drive sustainable growth.',
			icon: 'chart'
		},
		{
			num: '05',
			title: 'System Development',
			description: 'Custom web and desktop applications tailored to your needs, built with cutting-edge technology.',
			icon: 'code'
		},
		{
			num: '06',
			title: 'Accounting Software',
			description: 'Streamlined solutions that automate bookkeeping, reporting, and compliance tracking.',
			icon: 'calculator'
		}
	];
</script>

<section id="services" class="relative bg-surface px-5 sm:px-6 py-16 sm:py-28">
	<div
		class="absolute inset-0 pointer-events-none"
		aria-hidden="true"
		style="background: radial-gradient(ellipse 60% 40% at 30% 60%, rgba(6, 182, 212, 0.04), transparent);"
	></div>

	<div class="relative mx-auto max-w-6xl">
		<!-- Section header -->
		<div class="mb-12 sm:mb-20">
			<span class="font-rajdhani font-bold text-teal text-sm uppercase tracking-widest">What We Do</span>
			<h2 class="mt-3 font-rajdhani font-bold text-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
				Our Services
			</h2>
			<p class="mt-4 max-w-lg text-body text-lg">
				Comprehensive solutions that bridge accounting expertise with technological innovation.
			</p>
		</div>

		<!-- Service grid -->
		<div class="gap-px grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-divider-subtle border border-divider-subtle rounded-2xl overflow-hidden">
			{#each services as service (service.num)}
				<div class="group relative bg-surface hover:bg-elevated p-5 sm:p-8 transition-all duration-500 service-cell">
					<!-- Watermark number -->
					<span class="top-4 right-6 absolute font-rajdhani font-bold text-white/4 group-hover:text-teal/10 text-5xl transition-all duration-500 pointer-events-none select-none">
						{service.num}
					</span>

					<!-- Icon -->
					<div class="mb-6 text-teal/70 group-hover:text-teal transition-colors duration-300">
						{#if service.icon === 'clipboard'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
								<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
								<path d="M9 14l2 2 4-4" />
							</svg>
						{:else if service.icon === 'lightbulb'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<path d="M9 18h6" />
								<path d="M10 22h4" />
								<path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
							</svg>
						{:else if service.icon === 'building'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
								<path d="M9 22v-4h6v4" />
								<path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
							</svg>
						{:else if service.icon === 'chart'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
								<polyline points="16 7 22 7 22 13" />
							</svg>
						{:else if service.icon === 'code'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="16 18 22 12 16 6" />
								<polyline points="8 6 2 12 8 18" />
								<line x1="14" y1="4" x2="10" y2="20" />
							</svg>
						{:else if service.icon === 'calculator'}
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
								<rect x="4" y="2" width="16" height="20" rx="2" />
								<line x1="8" y1="6" x2="16" y2="6" />
								<line x1="16" y1="14" x2="16" y2="18" />
								<path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
							</svg>
						{/if}
					</div>

					<!-- Title -->
					<h3 class="mb-3 font-rajdhani font-bold text-heading text-lg">
						{service.title}
					</h3>

					<!-- Description -->
					<p class="text-body text-sm leading-relaxed">
						{service.description}
					</p>

					<!-- Hover accent line -->
					<div class="bottom-0 left-0 absolute bg-linear-to-r from-teal to-teal-light w-0 group-hover:w-full h-px transition-all duration-500"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	@keyframes serviceCardIn {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@supports (animation-timeline: view()) {
		.service-cell {
			opacity: 0;
			animation: serviceCardIn 0.6s ease-out forwards;
			animation-timeline: view();
			animation-range: entry 0% entry 30%;
		}
	}
</style>
