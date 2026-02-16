<script lang="ts">
	// No reactive state needed — this is a presentational component
</script>

<section
	id="hero"
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-dark"
>
	<!-- Geometric grid pattern overlay -->
	<div
		class="pointer-events-none absolute inset-0"
		aria-hidden="true"
		style="
			background-image:
				repeating-linear-gradient(0deg, var(--color-teal) 0px, transparent 1px, transparent 60px),
				repeating-linear-gradient(90deg, var(--color-teal) 0px, transparent 1px, transparent 60px),
				repeating-linear-gradient(0deg, var(--color-teal) 0px, transparent 1px, transparent 180px),
				repeating-linear-gradient(90deg, var(--color-teal) 0px, transparent 1px, transparent 180px);
			opacity: 0.04;
		"
	></div>

	<!-- Diagonal trace accents (circuit board feel) -->
	<div
		class="pointer-events-none absolute inset-0"
		aria-hidden="true"
		style="
			background-image:
				repeating-linear-gradient(45deg, var(--color-teal) 0px, transparent 1px, transparent 120px),
				repeating-linear-gradient(-45deg, var(--color-teal) 0px, transparent 1px, transparent 120px);
			opacity: 0.025;
		"
	></div>

	<!-- Content -->
	<div class="relative z-10 mx-auto max-w-4xl px-6 text-center">
		<h1
			class="hero-fade-in font-[family-name:var(--font-syne)] text-5xl font-[800] leading-tight text-white md:text-7xl"
		>
			Where Accounting Meets
			<span class="bg-gradient-to-r from-teal to-teal-light bg-clip-text text-transparent">
				Technology
			</span>
		</h1>

		<p
			class="hero-fade-in animation-delay-200 mx-auto mt-6 max-w-2xl font-[family-name:var(--font-outfit)] text-lg text-slate-400 md:text-xl"
		>
			We bridge traditional accounting expertise with modern technology solutions to help
			businesses thrive in the digital age.
		</p>

		<div class="hero-fade-in animation-delay-400 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="#contact"
				class="inline-block rounded-lg bg-teal px-8 py-4 font-[family-name:var(--font-outfit)] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal/30"
			>
				Get in Touch
			</a>
			<a
				href="#services"
				class="inline-block rounded-lg border border-teal px-8 py-4 font-[family-name:var(--font-outfit)] font-semibold text-teal transition-all duration-300 hover:bg-teal hover:text-white"
			>
				Our Services
			</a>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-8 left-1/2 -translate-x-1/2"
		aria-hidden="true"
	>
		<div class="scroll-bounce flex flex-col items-center gap-1">
			<span class="font-[family-name:var(--font-outfit)] text-xs tracking-widest text-slate-500 uppercase">
				Scroll
			</span>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="text-slate-500"
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		</div>
	</div>
</section>

<style>
	/* Staggered fade-in animation */
	@keyframes heroFadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-fade-in {
		opacity: 0;
		animation: heroFadeIn 0.8s ease-out forwards;
	}

	.animation-delay-200 {
		animation-delay: 200ms;
	}

	.animation-delay-400 {
		animation-delay: 400ms;
	}

	/* Scroll indicator bounce */
	@keyframes scrollBounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6px);
		}
	}

	.scroll-bounce {
		animation: scrollBounce 2s ease-in-out infinite;
	}
</style>
