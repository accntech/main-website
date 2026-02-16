<script lang="ts">
	// Presentational component — no reactive state needed
</script>

<section id="about" class="relative overflow-hidden bg-navy py-24 px-6">
	<!-- Subtle geometric accent — diagonal teal line near top-left -->
	<div
		class="pointer-events-none absolute -left-16 top-32 h-px w-64 rotate-45 bg-gradient-to-r from-transparent via-teal/30 to-transparent lg:left-8"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -left-12 top-44 h-px w-48 rotate-45 bg-gradient-to-r from-transparent via-teal/15 to-transparent lg:left-12"
		aria-hidden="true"
	></div>

	<div class="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
		<!-- Left column: Photo placeholder -->
		<div class="flex justify-center lg:justify-end">
			<div class="relative">
				<!-- Decorative offset border -->
				<div
					class="absolute -right-3 -bottom-3 h-96 w-80 rounded-2xl border border-teal/20"
					aria-hidden="true"
				></div>

				<!-- Main photo placeholder -->
				<div
					class="relative flex h-96 w-80 flex-col items-center justify-center gap-4 rounded-2xl border border-teal/30 bg-navy-light"
				>
					<!-- Initials -->
					<span class="font-syne text-5xl font-bold text-teal">OG</span>

					<!-- User silhouette icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-16 w-16 text-teal/20"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>

				<!-- Diagonal teal accent near photo -->
				<div
					class="absolute -right-8 top-12 h-px w-24 -rotate-45 bg-gradient-to-r from-teal/40 to-transparent"
					aria-hidden="true"
				></div>
				<div
					class="absolute -left-6 bottom-20 h-px w-16 rotate-45 bg-gradient-to-r from-transparent to-teal/30"
					aria-hidden="true"
				></div>
			</div>
		</div>

		<!-- Right column: Bio content -->
		<div class="text-center lg:text-left">
			<p class="font-outfit text-sm font-medium uppercase tracking-widest text-teal">
				About the Founder
			</p>

			<h2 class="mt-4 font-syne text-4xl font-bold text-white">
				Ogie Galicia
			</h2>

			<p class="mt-2 font-outfit text-lg text-teal">
				Certified Public Accountant
			</p>

			<p class="mt-6 font-outfit text-base leading-relaxed text-slate-400">
				A licensed Certified Public Accountant in the Philippines, Ogie Galicia founded
				Accountech with a vision to bridge the gap between traditional accounting practices
				and modern technology. With expertise spanning tax compliance, business advisory, and
				software development, Accountech delivers holistic solutions that empower businesses
				to operate efficiently in the digital era.
			</p>

			<p class="mt-4 font-outfit text-base leading-relaxed text-slate-400">
				Our approach combines deep financial expertise with technical innovation, ensuring
				that every solution we deliver is both compliant and cutting-edge.
			</p>
		</div>
	</div>
</section>
