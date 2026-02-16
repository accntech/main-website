<script lang="ts">
	const services = [
		{
			title: 'Tax Compliance',
			description:
				'Ensure your business meets all BIR requirements. We handle tax filings, returns, and regulatory compliance so you can focus on growing your business.',
			icon: 'clipboard'
		},
		{
			title: 'Tax Advisory',
			description:
				'Strategic tax planning to minimize liabilities and maximize savings. Expert guidance on tax-efficient business structures and transactions.',
			icon: 'lightbulb'
		},
		{
			title: 'Business Registrations',
			description:
				'From SEC/DTI registration to BIR and local permits, we handle the full registration process to get your business legally operational.',
			icon: 'building'
		},
		{
			title: 'Management Advisory',
			description:
				'Data-driven insights and strategic advice to improve operations, optimize processes, and drive sustainable business growth.',
			icon: 'trending-up'
		},
		{
			title: 'System Development',
			description:
				'Custom web and desktop applications tailored to your business needs. Modern, scalable solutions built with cutting-edge technology.',
			icon: 'code'
		},
		{
			title: 'Accounting Software',
			description:
				'Streamlined accounting solutions that automate bookkeeping, financial reporting, and compliance tracking for businesses of all sizes.',
			icon: 'calculator'
		}
	] as const;
</script>

<section id="services" class="bg-navy-dark py-24 px-6">
	<div class="mx-auto max-w-6xl">
		<!-- Section header -->
		<div class="mb-16 text-center">
			<h2
				class="font-[family-name:var(--font-syne)] text-4xl font-bold text-white md:text-5xl"
			>
				Our Services
			</h2>
			<div class="mx-auto mt-4 h-1 w-16 rounded-full bg-teal"></div>
			<p
				class="mx-auto mt-6 max-w-xl font-[family-name:var(--font-outfit)] text-lg text-slate-400"
			>
				Comprehensive solutions for modern businesses
			</p>
		</div>

		<!-- Service cards grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as service, i (service.title)}
				<div
					class="service-card group rounded-xl border border-slate-700/50 bg-navy-light p-8 transition-all duration-300"
					style="animation-delay: {i * 100}ms"
				>
					<!-- Icon -->
					<div class="mb-5 text-teal">
						{#if service.icon === 'clipboard'}
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-12 w-12"
							>
								<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
								<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
								<path d="M9 14l2 2 4-4" />
							</svg>
						{:else if service.icon === 'lightbulb'}
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-12 w-12"
							>
								<path d="M9 18h6" />
								<path d="M10 22h4" />
								<path
									d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"
								/>
							</svg>
						{:else if service.icon === 'building'}
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-12 w-12"
							>
								<rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
								<path d="M9 22v-4h6v4" />
								<path d="M8 6h.01" />
								<path d="M16 6h.01" />
								<path d="M12 6h.01" />
								<path d="M12 10h.01" />
								<path d="M12 14h.01" />
								<path d="M16 10h.01" />
								<path d="M16 14h.01" />
								<path d="M8 10h.01" />
								<path d="M8 14h.01" />
							</svg>
						{:else if service.icon === 'trending-up'}
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-12 w-12"
							>
								<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
								<polyline points="16 7 22 7 22 13" />
							</svg>
						{:else if service.icon === 'code'}
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-12 w-12"
							>
								<polyline points="16 18 22 12 16 6" />
								<polyline points="8 6 2 12 8 18" />
								<line x1="14" y1="4" x2="10" y2="20" />
							</svg>
						{:else if service.icon === 'calculator'}
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-12 w-12"
							>
								<rect x="4" y="2" width="16" height="20" rx="2" />
								<line x1="8" y1="6" x2="16" y2="6" />
								<line x1="16" y1="14" x2="16" y2="18" />
								<path d="M16 10h.01" />
								<path d="M12 10h.01" />
								<path d="M8 10h.01" />
								<path d="M12 14h.01" />
								<path d="M8 14h.01" />
								<path d="M12 18h.01" />
								<path d="M8 18h.01" />
							</svg>
						{/if}
					</div>

					<!-- Title -->
					<h3
						class="mb-3 font-[family-name:var(--font-syne)] text-xl font-bold text-white"
					>
						{service.title}
					</h3>

					<!-- Description -->
					<p
						class="font-[family-name:var(--font-outfit)] text-sm leading-relaxed text-slate-400"
					>
						{service.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Scroll-triggered stagger animation */
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

	.service-card {
		opacity: 0;
		animation: serviceCardIn 0.6s ease-out forwards;
		animation-timeline: view();
		animation-range: entry 0% entry 30%;
	}

	/* Hover effects */
	.service-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-teal);
		box-shadow:
			0 -2px 12px -2px rgba(6, 182, 212, 0.25),
			0 8px 24px -4px rgba(0, 0, 0, 0.3);
	}
</style>
