<section class="relative bg-surface px-5 sm:px-6 py-16 sm:py-28">
	<div
		class="absolute inset-0 pointer-events-none"
		aria-hidden="true"
		style="background: radial-gradient(ellipse 60% 40% at 70% 30%, rgba(6, 182, 212, 0.04), transparent);"
	></div>

	<div class="relative mx-auto max-w-6xl">
		<div class="mb-12 sm:mb-16 text-center">
			<span class="font-rajdhani font-bold text-teal text-sm uppercase tracking-widest"
				>Who We Help</span
			>
			<h2
				class="mt-3 font-rajdhani font-bold text-heading text-3xl sm:text-4xl md:text-5xl"
			>
				Is This You?
			</h2>
			<p class="mx-auto mt-4 max-w-2xl text-body text-lg">
				Whether you're just starting out or scaling up, if any of these sound familiar, we
				can help.
			</p>
		</div>

		<div class="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
			<div
				class="group bg-base hover:bg-elevated p-6 border border-divider-subtle hover:border-teal/30 rounded-2xl transition-all duration-300 audience-card"
			>
				<div
					class="flex justify-center items-center bg-teal/10 mb-4 rounded-xl w-12 h-12"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-teal"
					>
						<path d="M12 2L2 7l10 5 10-5-10-5z" />
						<path d="M2 17l10 5 10-5" />
						<path d="M2 12l10 5 10-5" />
					</svg>
				</div>
				<h3 class="mb-2 font-rajdhani font-bold text-heading text-lg">
					Startups & New Businesses
				</h3>
				<p class="text-body text-sm leading-relaxed">
					Overwhelmed by SEC/DTI registration, BIR requirements, and permits? We handle
					the paperwork so you can launch faster.
				</p>
			</div>

			<div
				class="group bg-base hover:bg-elevated p-6 border border-divider-subtle hover:border-teal/30 rounded-2xl transition-all duration-300 audience-card"
			>
				<div
					class="flex justify-center items-center bg-teal/10 mb-4 rounded-xl w-12 h-12"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-teal"
					>
						<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
						<polyline points="16 7 22 7 22 13" />
					</svg>
				</div>
				<h3 class="mb-2 font-rajdhani font-bold text-heading text-lg">Growing SMEs</h3>
				<p class="text-body text-sm leading-relaxed">
					Outgrowing spreadsheets and manual bookkeeping? Get real-time financial
					visibility and tax-efficient structures.
				</p>
			</div>

			<div
				class="group bg-base hover:bg-elevated p-6 border border-divider-subtle hover:border-teal/30 rounded-2xl transition-all duration-300 audience-card"
			>
				<div
					class="flex justify-center items-center bg-teal/10 mb-4 rounded-xl w-12 h-12"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-teal"
					>
						<rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
						<path d="M9 22v-4h6v4" />
						<path
							d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"
						/>
					</svg>
				</div>
				<h3 class="mb-2 font-rajdhani font-bold text-heading text-lg">
					Corporations & Cooperatives
				</h3>
				<p class="text-body text-sm leading-relaxed">
					Need reliable audit services, compliance assurance, and strategic financial
					planning you can count on? That's our specialty.
				</p>
			</div>

			<div
				class="group bg-base hover:bg-elevated p-6 border border-divider-subtle hover:border-teal/30 rounded-2xl transition-all duration-300 audience-card"
			>
				<div
					class="flex justify-center items-center bg-teal/10 mb-4 rounded-xl w-12 h-12"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="text-teal"
					>
						<path d="M22 10v6M2 10l10-5 10 5-10 5z" />
						<path d="M6 12v5c3 3 9 3 12 0v-5" />
					</svg>
				</div>
				<h3 class="mb-2 font-rajdhani font-bold text-heading text-lg">
					Schools & Institutions
				</h3>
				<p class="text-body text-sm leading-relaxed">
					Looking for specialized auditing for educational organizations? We understand
					the unique requirements of academic institutions.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes audienceCardIn {
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
		.audience-card {
			opacity: 0;
			animation: audienceCardIn 0.6s ease-out forwards;
			animation-timeline: view();
			animation-range: entry 0% entry 30%;
		}
	}
</style>
