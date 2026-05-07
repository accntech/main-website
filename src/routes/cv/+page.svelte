<script lang="ts">
	import Icon from '@iconify/svelte';
	import { toggleMode } from 'mode-watcher';
	import Seo from '$lib/components/seo.svelte';

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
		{ name: 'Database Management', pct: 90 },
		{ name: 'Software Development', pct: 90 },
		{ name: 'MS Office Suite', pct: 90 },
		{ name: 'Photoshop', pct: 80 },
		{ name: 'Illustrator', pct: 85 }
	] as const;

	const personalSkills = [
		{ name: 'Team Work', rating: 5 },
		{ name: 'Communication', rating: 4 },
		{ name: 'Management', rating: 4 },
		{ name: 'Organization', rating: 4 },
		{ name: 'Creativity', rating: 4 }
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

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		name: 'Ogie Galicia — CV',
		description:
			'Curriculum vitae of Ogie Galicia, Certified Public Accountant and tech entrepreneur from the Philippines.',
		url: 'https://accountech.dev/cv',
		isPartOf: { '@id': 'https://accountech.dev/#website' },
		mainEntity: {
			'@type': 'Person',
			name: 'Ogie Galicia',
			jobTitle: 'Certified Public Accountant',
			image:
				'https://res.cloudinary.com/accountech/image/upload/c_crop,g_face,w_500,h_500/v1771235077/iuatksezjs7zfdgobo1m.png',
			url: 'https://accountech.dev/cv',
			worksFor: {
				'@type': 'Organization',
				name: 'AccounTech Business Management Services',
				url: 'https://accountech.dev'
			},
			alumniOf: {
				'@type': 'CollegeOrUniversity',
				name: 'Lyceum of the Philippines University — Batangas'
			},
			sameAs: [
				'https://facebook.com/ogiegalicia',
				'https://github.com/cpa-coder'
			]
		}
	};
</script>

<Seo
	title="Ogie Galicia — CV | AccounTech"
	description="Curriculum vitae of Ogie Galicia, Certified Public Accountant and tech entrepreneur from the Philippines."
	ogType="profile"
	ogImage="https://accountech.dev/og-cv.png"
	ogImageAlt="Ogie Galicia — Certified Public Accountant. Work experience, education, and contact details."
	{jsonLd}
/>

<header class="top-0 left-0 z-50 fixed bg-base-95 backdrop-blur-xl border-divider-subtle border-b w-full">
	<div class="flex justify-between items-center mx-auto px-5 sm:px-6 py-3 max-w-4xl">
		<a
			href="/"
			class="group inline-flex items-center gap-2 font-medium text-body hover:text-teal text-sm transition-colors duration-300"
			aria-label="Back to home"
		>
			<Icon
				icon="solar:arrow-left-linear"
				class="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-300"
			/>
			Home
		</a>
		<button
			type="button"
			onclick={toggleMode}
			aria-label="Toggle theme"
			class="flex justify-center items-center rounded-full w-9 h-9 text-body hover:text-heading transition-colors duration-300"
		>
			<Icon icon="solar:moon-linear" width="18" height="18" class="size-4.5" />
			<span class="sr-only">Toggle theme</span>
		</button>
	</div>
</header>

<main class="mx-auto px-5 sm:px-6 pt-24 pb-20 max-w-4xl">
	<section class="flex sm:flex-row flex-col items-center sm:items-start gap-6 sm:gap-8 cv-animate" style="animation-delay: 0ms">
		<div class="shrink-0">
			<img
				src="https://res.cloudinary.com/accountech/image/upload/c_crop,g_face,w_500,h_500/v1771235077/iuatksezjs7zfdgobo1m.png"
				alt="Ogie Galicia, CPA — Founder of AccounTech"
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
					<Icon icon="solar:phone-linear" class="w-3.5 h-3.5 text-muted shrink-0" />
					+63 995 294 2417
				</a>
				<a href="tel:+639306998117" class="inline-flex items-center gap-1.5 hover:text-teal transition-colors">
					<Icon icon="solar:phone-linear" class="w-3.5 h-3.5 text-muted shrink-0" />
					+63 930 699 8117
				</a>
				<a href="mailto:o.galicia.cpa@gmail.com" class="inline-flex items-center gap-1.5 hover:text-teal transition-colors">
					<Icon icon="solar:letter-linear" class="w-3.5 h-3.5 text-muted shrink-0" />
					o.galicia.cpa@gmail.com
				</a>
				<span class="inline-flex items-center gap-1.5">
					<Icon icon="solar:map-point-linear" class="w-3.5 h-3.5 text-muted shrink-0" />
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
					<Icon icon="solar:global-linear" class="w-4.5 h-4.5" />
				</a>
			</div>
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

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
					<h3 class="font-semibold text-heading text-sm leading-snug">{item.title}</h3>
					<p class="mt-0.5 text-body text-xs sm:text-sm">{item.org}</p>
					<p class="mt-0.5 text-muted text-xs">{item.location}</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

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
					<h3 class="font-semibold text-heading text-sm leading-snug">{item.title}</h3>
					<p class="mt-0.5 text-body text-xs sm:text-sm">{item.org}</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

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
					<h3 class="font-semibold text-heading text-sm leading-snug">{item.title}</h3>
					<p class="mt-0.5 text-body text-xs sm:text-sm">{item.org}</p>
					<p class="mt-0.5 text-muted text-xs">{item.chapter}</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

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
								<Icon icon="solar:star-bold" class="w-4 h-4 text-teal" />
							{:else}
								<Icon icon="solar:star-linear" class="w-4 h-4 text-faint" />
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<hr class="my-8 sm:my-10 border-divider-subtle" />

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

	<div class="mt-16 pt-8 border-divider-subtle border-t text-center cv-animate" style="animation-delay: 700ms">
		<p class="text-muted text-xs">
			&copy; {new Date().getFullYear()} Ogie Galicia. Built with
			<a
				href="/"
				class="font-sans font-bold tracking-[-0.02em] lowercase transition-colors"
			>
				<span class="text-ink">accoun</span><span class="text-seal hover:text-seal-bright">tech.</span>
			</a>
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
