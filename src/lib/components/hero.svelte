<script lang="ts">
	// Presentational component
</script>

<section
	id="hero"
	class="relative flex items-center bg-base min-h-dvh overflow-hidden"
>
	<!-- Background radial gradient -->
	<div
		class="absolute inset-0 pointer-events-none"
		aria-hidden="true"
		style="background: radial-gradient(ellipse 80% 50% at 70% 40%, rgba(6, 182, 212, 0.08), transparent);"
	></div>

	<!-- Fading calculator illustration -->
	<div class="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
		<svg
			class="top-1/2 right-[5%] lg:right-[8%] absolute w-md lg:w-xl xl:w-2xl h-112 lg:h-144 xl:h-168 text-teal/6 -translate-y-1/2 hero-calc"
			viewBox="0 0 120 160"
			fill="none"
			stroke="currentColor"
			stroke-width="0.8"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<!-- Body -->
			<rect x="10" y="5" width="100" height="150" rx="8" />
			<!-- Screen -->
			<rect x="20" y="15" width="80" height="30" rx="4" />
			<!-- Screen text -->
			<text x="90" y="38" font-family="var(--font-rajdhani)" font-size="16" fill="currentColor" stroke="none" text-anchor="end">1,024.00</text>
			<!-- Row 1 -->
			<rect x="20" y="55" width="16" height="16" rx="3" />
			<rect x="42" y="55" width="16" height="16" rx="3" />
			<rect x="64" y="55" width="16" height="16" rx="3" />
			<rect x="86" y="55" width="14" height="16" rx="3" />
			<!-- Row 2 -->
			<rect x="20" y="78" width="16" height="16" rx="3" />
			<rect x="42" y="78" width="16" height="16" rx="3" />
			<rect x="64" y="78" width="16" height="16" rx="3" />
			<rect x="86" y="78" width="14" height="16" rx="3" />
			<!-- Row 3 -->
			<rect x="20" y="101" width="16" height="16" rx="3" />
			<rect x="42" y="101" width="16" height="16" rx="3" />
			<rect x="64" y="101" width="16" height="16" rx="3" />
			<rect x="86" y="101" width="14" height="38" rx="3" />
			<!-- Row 4 -->
			<rect x="20" y="124" width="38" height="16" rx="3" />
			<rect x="64" y="124" width="16" height="16" rx="3" />
		</svg>
	</div>

	<!-- Floating geometric elements -->
	<div class="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
		<div class="top-1/4 -right-32 hero-float-slow absolute border border-teal/10 rounded-full w-96 h-96"></div>
		<div class="top-1/3 right-20 hero-float-medium absolute border border-teal/5 rounded-full w-48 h-48"></div>
		<div class="top-1/2 right-1/4 hero-float-fast absolute bg-teal/30 rounded-full w-2 h-2"></div>
		<div class="top-[45%] right-[30%] hero-float-slow absolute bg-teal/20 rounded-full w-1.5 h-1.5"></div>
		<div class="top-[55%] right-[22%] hero-float-medium absolute bg-teal/40 rounded-full w-1 h-1"></div>
		<div class="top-2/3 left-0 absolute bg-linear-to-r from-transparent via-teal/15 to-transparent w-1/3 h-px"></div>
		<div class="top-0 right-1/3 absolute bg-linear-to-b from-transparent via-teal/10 to-transparent w-px h-2/3"></div>
	</div>

	<!-- Content -->
	<div class="z-10 relative mx-auto px-5 sm:px-6 py-24 sm:py-32 w-full max-w-7xl">
		<div class="max-w-3xl">
			<!-- Eyebrow badge -->
			<div class="hero-animate" style="animation-delay: 0ms">
				<span class="inline-flex items-center gap-2 bg-teal/5 px-4 py-1.5 border border-teal/20 rounded-full font-medium text-teal text-xs uppercase tracking-widest">
					<span class="bg-teal rounded-full w-1.5 h-1.5 animate-pulse"></span>
					Accounting & Technology Solutions
				</span>
			</div>

			<!-- Main heading -->
			<h1
				class="mt-6 sm:mt-8 font-rajdhani font-bold text-[2.5rem] text-heading sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.3] sm:leading-[1.15] hero-animate"
				style="animation-delay: 150ms"
			>
				Where Accounting
				<br />
				Meets
				<span class="bg-clip-text bg-linear-to-r from-teal via-teal-light to-teal text-transparent">
					Technology
				</span>
			</h1>

			<!-- Subtext -->
			<p
				class="mt-5 sm:mt-6 max-w-xl text-body sm:text-lg md:text-xl leading-relaxed hero-animate"
				style="animation-delay: 300ms"
			>
				Bridging traditional accounting expertise with modern technology solutions
				to help businesses thrive in the digital age.
			</p>

			<!-- CTA buttons -->
			<div
				class="flex sm:flex-row flex-col sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10 hero-animate"
				style="animation-delay: 450ms"
			>
				<a
					href="#contact"
					class="group inline-flex justify-center items-center gap-2 bg-teal hover:bg-teal-light hover:shadow-teal/20 hover:shadow-xl px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-navy-dark text-sm transition-all duration-300"
				>
					Get in Touch
					<svg class="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</a>
				<a
					href="#services"
					class="inline-flex justify-center items-center px-6 sm:px-8 py-3.5 sm:py-4 border border-faint hover:border-teal/50 rounded-full font-semibold hover:text-teal text-sm transition-all duration-300"
				>
					Explore Services
				</a>
			</div>
		</div>

		<!-- Stats strip -->
		<div
			class="gap-4 sm:gap-8 grid grid-cols-3 mt-14 sm:mt-20 pt-8 sm:pt-10 border-divider-subtle border-t max-w-lg hero-animate"
			style="animation-delay: 600ms"
		>
			<div>
				<div class="font-rajdhani font-bold text-heading text-2xl sm:text-3xl">6+</div>
				<div class="mt-1 text-muted text-xs sm:text-sm">Core Services</div>
			</div>
			<div>
				<div class="font-rajdhani font-bold text-heading text-2xl sm:text-3xl">CPA</div>
				<div class="mt-1 text-muted text-xs sm:text-sm">Licensed</div>
			</div>
			<div>
				<div class="font-rajdhani font-bold text-heading text-2xl sm:text-3xl">PH</div>
				<div class="mt-1 text-muted text-xs sm:text-sm">Philippines</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes heroFadeInUp {
		from {
			opacity: 0;
			transform: translateY(1.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-animate {
		opacity: 0;
		animation: heroFadeInUp 0.8s ease-out forwards;
	}

	@keyframes floatSlow {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-10px, -15px); }
	}

	@keyframes floatMedium {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(8px, -12px); }
	}

	@keyframes floatFast {
		0%, 100% { transform: translate(0, 0); }
		50% { transform: translate(-5px, -8px); }
	}

	@keyframes calcFadeIn {
		from {
			opacity: 0;
			transform: translate(0, -50%) scale(0.92);
		}
		to {
			opacity: 1;
			transform: translate(0, -50%) scale(1);
		}
	}

	.hero-calc {
		opacity: 0;
		animation: calcFadeIn 1.2s ease-out 0.6s forwards;
	}

	.hero-float-slow { animation: floatSlow 8s ease-in-out infinite; }
	.hero-float-medium { animation: floatMedium 6s ease-in-out infinite; }
	.hero-float-fast { animation: floatFast 4s ease-in-out infinite; }
</style>
