<script lang="ts">
	import { toggleMode } from 'mode-watcher';

	const experience = [
		{
			year: 'NOW',
			title: 'Partner',
			org: 'J.K. Mendeja and Co. CPAs',
			location: 'Bongabong, Oriental Mindoro'
		},
		{
			year: 'NOW',
			title: 'Owner / Chief Executive Officer',
			org: 'AccounTech Business Management Services',
			location: 'Mansalay, Oriental Mindoro'
		}
	] as const;

	const education = [
		{
			year: '2011',
			title: 'Certified Public Accountant',
			org: 'October 2011 CPA Licensure Examination'
		},
		{
			year: '2011',
			title: 'Bachelor of Science in Accountancy',
			org: 'Lyceum of the Philippines University \u2014 Batangas'
		}
	] as const;

	const organizations = [
		{
			year: '2020',
			title: 'Chapter President',
			org: 'Philippine Institute of Certified Public Accountant',
			chapter: 'Oriental Mindoro Chapter'
		},
		{
			year: '2021',
			title: 'Technical Support',
			org: 'Philippine Institute of Certified Public Accountant',
			chapter: 'Southern Tagalog Region'
		},
		{
			year: 'NOW',
			title: 'Adviser',
			org: 'Philippine Institute of Certified Public Accountant',
			chapter: 'Oriental Mindoro Chapter'
		}
	] as const;

	const technicalSkills = [
		{ name: 'Accounting & Financial Audit', pct: 95 },
		{ name: 'Tax Compliance & BIR Audit', pct: 90 },
		{ name: 'Business System Design', pct: 85 },
		{ name: 'Database Management', pct: 80 },
		{ name: '.NET Software Development', pct: 80 },
		{ name: 'MS Office Suite', pct: 90 },
		{ name: 'Photoshop', pct: 80 },
		{ name: 'Illustrator', pct: 85 }
	] as const;

	const personalSkills = [
		{ name: 'Team Work', rating: 5 },
		{ name: 'Communication', rating: 4 },
		{ name: 'Management', rating: 4 },
		{ name: 'Organization', rating: 4 },
		{ name: 'Creative', rating: 4 }
	] as const;

	const hobbies = [
		{
			label: 'System and software development',
			detail: 'Web Application, Desktop Application, Mobile Application'
		},
		{
			label: 'Graphic designs, reading books, chess',
			detail: ''
		}
	] as const;
</script>

<svelte:head>
	<title>Ogie Galicia &mdash; CV</title>
	<meta
		name="description"
		content="Curriculum vitae of Ogie Galicia, Certified Public Accountant and tech entrepreneur from the Philippines."
	/>
</svelte:head>

<!-- Top bar -->
<header class="top-0 left-0 z-50 fixed bg-base-95 backdrop-blur-xl border-divider-subtle border-b w-full">
	<div class="flex justify-between items-center mx-auto px-5 sm:px-6 py-3 max-w-4xl">
		<a
			href="/"
			class="group inline-flex items-center gap-2 font-medium text-body hover:text-teal text-sm transition-colors duration-300"
			aria-label="Back to home"
		>
			<svg
				class="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Home
		</a>
		<button
			type="button"
			onclick={toggleMode}
			aria-label="Toggle theme"
			class="flex justify-center items-center rounded-full w-9 h-9 text-body hover:text-heading transition-colors duration-300"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-4.5"
			>
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
				<path d="M12 3l0 18" />
				<path d="M12 9l4.65 -4.65" />
				<path d="M12 14.3l7.37 -7.37" />
				<path d="M12 19.6l8.85 -8.85" />
			</svg>
			<span class="sr-only">Toggle theme</span>
		</button>
	</div>
</header>

<main class="mx-auto px-5 sm:px-6 pt-24 pb-20 max-w-4xl">
	<!-- Profile Header -->
	<section class="flex sm:flex-row flex-col items-center sm:items-start gap-6 sm:gap-8 cv-animate" style="animation-delay: 0ms">
		<div class="shrink-0">
			<img
				src="https://res.cloudinary.com/accountech/image/upload/c_crop,g_face,w_500,h_500/v1771235077/iuatksezjs7zfdgobo1m.png"
				alt="Ogie Galicia"
				class="rounded-full ring-3 ring-teal/40 ring-offset-3 ring-offset-base sm:ring-offset-4 w-24 sm:w-32 h-24 sm:h-32 object-cover"
			/>
		</div>
		<div class="sm:text-left text-center">
			<h1 class="font-rajdhani font-bold text-heading text-3xl sm:text-4xl leading-tight">
				Ogie Galicia
			</h1>
			<p class="mt-1 font-medium text-teal text-lg tracking-wide">
				Certified Public Accountant
			</p>
			<div class="flex sm:flex-row flex-col sm:flex-wrap items-center sm:items-start gap-2 sm:gap-x-5 sm:gap-y-2 mt-4 text-body text-xs sm:text-sm">
				<a href="tel:+639952942417" class="inline-flex items-center gap-1.5 hover:text-teal transition-colors">
					<svg class="w-3.5 h-3.5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
					</svg>
					+63 995 294 2417
				</a>
				<a href="tel:+639306998117" class="inline-flex items-center gap-1.5 hover:text-teal transition-colors">
					<svg class="w-3.5 h-3.5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
					</svg>
					+63 930 699 8117
				</a>
				<a href="mailto:o.galicia.cpa@gmail.com" class="inline-flex items-center gap-1.5 hover:text-teal transition-colors">
					<svg class="w-3.5 h-3.5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					o.galicia.cpa@gmail.com
				</a>
				<span class="inline-flex items-center gap-1.5">
					<svg class="w-3.5 h-3.5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
					Odiong, Roxas, Oriental Mindoro, Philippines 5212
				</span>
			</div>
			<div class="flex justify-center sm:justify-start gap-4 mt-3">
				<a
					href="https://facebook.com/ogiegalicia"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted hover:text-teal transition-colors duration-300"
					aria-label="Facebook"
				>
					<svg class="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
					</svg>
				</a>
				<a
					href="https://github.com/cpa-coder"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted hover:text-teal transition-colors duration-300"
					aria-label="GitHub"
				>
					<svg class="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
					</svg>
				</a>
				<a
					href="https://accountech.dev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-muted hover:text-teal transition-colors duration-300"
					aria-label="Website"
				>
					<svg class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Divider -->
	<hr class="my-8 sm:my-10 border-divider-subtle" />

	<!-- Work Experience -->
	<section class="cv-animate" style="animation-delay: 100ms">
		<h2 class="mb-6 font-rajdhani font-bold text-teal text-xs uppercase tracking-widest">
			Work Experience
		</h2>
		<div class="relative ml-0 sm:ml-16 pl-6 sm:pl-8 border-teal/20 border-l-2">
			{#each experience as item, i (i)}
				<div class="relative mb-8 last:mb-0">
					<span class="top-1 -left-4.25 sm:-left-5.25 absolute bg-teal rounded-full ring-4 ring-base w-2.5 h-2.5"></span>
					<span class="hidden sm:block top-0 -left-5.25 absolute pr-4 font-rajdhani font-bold text-teal text-sm whitespace-nowrap -translate-x-full">
						{item.year}
					</span>
					<span class="sm:hidden block mb-1 font-rajdhani font-bold text-teal text-xs">{item.year}</span>
					<h3 class="font-semibold text-heading text-sm sm:text-base leading-snug">{item.title}</h3>
					<p class="mt-0.5 text-body text-xs sm:text-sm">{item.org}</p>
					<p class="mt-0.5 text-muted text-xs">{item.location}</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

	<!-- Education -->
	<section class="cv-animate" style="animation-delay: 200ms">
		<h2 class="mb-6 font-rajdhani font-bold text-teal text-xs uppercase tracking-widest">
			Education
		</h2>
		<div class="relative ml-0 sm:ml-16 pl-6 sm:pl-8 border-teal/20 border-l-2">
			{#each education as item, i (i)}
				<div class="relative mb-8 last:mb-0">
					<span class="top-1 -left-4.25 sm:-left-5.25 absolute bg-teal rounded-full ring-4 ring-base w-2.5 h-2.5"></span>
					<span class="hidden sm:block top-0 -left-5.25 absolute pr-4 font-rajdhani font-bold text-teal text-sm whitespace-nowrap -translate-x-full">
						{item.year}
					</span>
					<span class="sm:hidden block mb-1 font-rajdhani font-bold text-teal text-xs">{item.year}</span>
					<h3 class="font-semibold text-heading text-sm sm:text-base leading-snug">{item.title}</h3>
					<p class="mt-0.5 text-body text-xs sm:text-sm">{item.org}</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

	<!-- Organizational Involvement -->
	<section class="cv-animate" style="animation-delay: 300ms">
		<h2 class="mb-6 font-rajdhani font-bold text-teal text-xs uppercase tracking-widest">
			Organizational Involvement
		</h2>
		<div class="relative ml-0 sm:ml-16 pl-6 sm:pl-8 border-teal/20 border-l-2">
			{#each organizations as item, i (i)}
				<div class="relative mb-8 last:mb-0">
					<span class="top-1 -left-4.25 sm:-left-5.25 absolute bg-teal rounded-full ring-4 ring-base w-2.5 h-2.5"></span>
					<span class="hidden sm:block top-0 -left-5.25 absolute pr-4 font-rajdhani font-bold text-teal text-sm whitespace-nowrap -translate-x-full">
						{item.year}
					</span>
					<span class="sm:hidden block mb-1 font-rajdhani font-bold text-teal text-xs">{item.year}</span>
					<h3 class="font-semibold text-heading text-sm sm:text-base leading-snug">{item.title}</h3>
					<p class="mt-0.5 text-body text-xs sm:text-sm">{item.org}</p>
					<p class="mt-0.5 text-muted text-xs">{item.chapter}</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

	<!-- Technical Skills -->
	<section class="cv-animate" style="animation-delay: 400ms">
		<h2 class="mb-6 font-rajdhani font-bold text-teal text-xs uppercase tracking-widest">
			Technical Skills
		</h2>
		<div class="space-y-4">
			{#each technicalSkills as skill, i (i)}
				<div>
					<div class="flex justify-between items-center mb-1.5">
						<span class="font-medium text-heading text-sm">{skill.name}</span>
						<span class="font-rajdhani font-bold text-muted text-xs">{skill.pct}%</span>
					</div>
					<div class="bg-elevated rounded-full w-full h-1.5 overflow-hidden">
						<div
							class="bg-linear-to-r from-teal-dark to-teal-light rounded-full h-full skill-bar"
							style="--target-width: {skill.pct}%"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

	<!-- Personal Skills -->
	<section class="cv-animate" style="animation-delay: 500ms">
		<h2 class="mb-6 font-rajdhani font-bold text-teal text-xs uppercase tracking-widest">
			Personal Skills
		</h2>
		<div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
			{#each personalSkills as skill, i (i)}
				<div class="flex justify-between items-center bg-surface px-4 py-3 rounded-lg">
					<span class="font-medium text-heading text-sm">{skill.name}</span>
					<div class="flex gap-1">
						{#each Array(5) as _, s (s)}
							{#if s < skill.rating}
								<svg class="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							{:else}
								<svg class="w-4 h-4 text-faint" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

	<!-- Hobbies & Interests -->
	<section class="cv-animate" style="animation-delay: 600ms">
		<h2 class="mb-6 font-rajdhani font-bold text-teal text-xs uppercase tracking-widest">
			Hobbies & Interests
		</h2>
		<ul class="space-y-3">
			{#each hobbies as hobby, i (i)}
				<li class="flex items-start gap-3 text-sm">
					<span class="bg-teal mt-1.5 rounded-full w-1.5 h-1.5 shrink-0"></span>
					<span class="text-body">
						<span class="font-medium text-heading">{hobby.label}</span>
						{#if hobby.detail}
							<span class="text-muted"> &mdash; {hobby.detail}</span>
						{/if}
					</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Footer -->
	<div class="mt-16 pt-8 border-divider-subtle border-t text-center cv-animate" style="animation-delay: 700ms">
		<p class="text-muted text-xs">
			&copy; {new Date().getFullYear()} Ogie Galicia. Built with
			<a href="/" class="text-teal hover:text-teal-light transition-colors">AccounTech</a>.
		</p>
	</div>
</main>

<style>
	@keyframes cvFadeInUp {
		from {
			opacity: 0;
			transform: translateY(1rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.cv-animate {
		opacity: 0;
		animation: cvFadeInUp 0.6s ease-out forwards;
	}

	@keyframes skillGrow {
		from {
			width: 0%;
		}
		to {
			width: var(--target-width);
		}
	}

	.skill-bar {
		width: 0%;
		animation: skillGrow 1s ease-out 0.6s forwards;
	}
</style>
