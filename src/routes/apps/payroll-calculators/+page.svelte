<script lang="ts">
	import Icon from '@iconify/svelte';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';

	const calculators = [
		{
			title: 'SSS Contribution',
			description:
				'Compute the Social Security System contribution from monthly compensation — Regular SS, MPF, and EC components, with the full 2025 schedule.',
			href: '/apps/payroll-calculators/sss',
			tag: "Gov't Contribution",
			icon: 'solar:shield-user-linear'
		},
		{
			title: 'PhilHealth Premium',
			description:
				'Compute the PhilHealth premium at the 5% rate effective 2026 — straight 50/50 employer-employee split with floor and ceiling.',
			href: '/apps/payroll-calculators/philhealth',
			tag: "Gov't Contribution",
			icon: 'solar:heart-pulse-linear'
		},
		{
			title: 'Pag-IBIG Contribution',
			description:
				'Compute the HDMF mandatory contribution under Circular 460 — low-tier and standard rates with the ₱10,000 fund salary cap.',
			href: '/apps/payroll-calculators/pagibig',
			tag: "Gov't Contribution",
			icon: 'solar:home-2-linear'
		},
		{
			title: 'Withholding Tax',
			description:
				'BIR revised withholding tax for compensation under TRAIN Law — daily, weekly, semi-monthly, and monthly tables.',
			href: '/apps/payroll-calculators/withholding-tax',
			tag: 'BIR Tax',
			icon: 'solar:bill-list-linear'
		},
		{
			title: 'Annual Income Tax',
			description:
				'BIR annual income tax under TRAIN Law — six-bracket schedule effective 2023 onwards with effective rate breakdown.',
			href: '/apps/payroll-calculators/annual-income-tax',
			tag: 'BIR Tax',
			icon: 'solar:document-text-linear'
		}
	] as const;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Payroll & Tax Calculators',
		description:
			'Philippine payroll and tax calculators — SSS, PhilHealth, Pag-IBIG, BIR withholding tax, and annual income tax under TRAIN Law.',
		url: 'https://accountech.dev/apps/payroll-calculators',
		isPartOf: { '@id': 'https://accountech.dev/#website' }
	};
</script>

<Seo
	title="Payroll & Tax Calculators | AccounTech"
	description="Philippine payroll and tax calculators — SSS, PhilHealth, Pag-IBIG, BIR withholding tax, and annual income tax under TRAIN Law."
	ogImage="https://accountech.dev/og-payroll-calculators.png"
	ogImageAlt="Philippine payroll and tax calculators — SSS, PhilHealth, Pag-IBIG, withholding tax, and annual income tax."
	{jsonLd}
/>

<Nav />

<main class="relative bg-base min-h-screen">
	<div
		class="absolute inset-0 pointer-events-none"
		style="background: radial-gradient(ellipse 80% 50% at 70% 40%, rgba(6, 182, 212, 0.04), transparent);"
	></div>
	<div class="relative mx-auto px-5 sm:px-6 pt-28 pb-20 max-w-7xl">
		<nav class="relative mb-6 text-sm" aria-label="Breadcrumb">
			<ol class="flex items-center gap-2 text-muted">
				<li><a href="/apps" class="hover:text-heading transition-colors">Apps</a></li>
				<li class="text-faint">/</li>
				<li class="text-heading">Payroll &amp; Tax Calculators</li>
			</ol>
		</nav>

		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">
				Payroll Compliance Tools
			</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				Payroll &amp; Tax Calculators
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				Compute SSS, PhilHealth, Pag-IBIG, BIR withholding, and annual income tax — all five
				schedules in one place, sourced from the latest official tables.
			</p>
		</header>

		<div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{#each calculators as calc (calc.href)}
				<a
					href={calc.href}
					class="group border border-divider-subtle bg-surface p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5"
				>
					<div
						class="flex justify-center items-center mb-5 bg-teal/10 group-hover:bg-teal/15 rounded-xl w-12 h-12 transition-colors duration-300"
					>
						<Icon icon={calc.icon} width="24" height="24" class="text-teal" />
					</div>
					<p class="mb-1 font-mono text-faint text-[11px] tracking-[0.16em] uppercase">{calc.tag}</p>
					<h2 class="font-rajdhani font-bold text-heading text-lg">{calc.title}</h2>
					<p class="mt-2 text-body text-sm leading-relaxed">{calc.description}</p>
					<div
						class="flex items-center gap-1.5 mt-4 font-medium text-teal text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
					>
						Open calculator
						<Icon icon="solar:arrow-right-linear" width="16" height="16" />
					</div>
				</a>
			{/each}
		</div>

		<div class="relative mt-10 text-center">
			<div class="inline-flex items-center gap-2 text-muted text-xs">
				<Icon
					icon="solar:lock-keyhole-minimalistic-linear"
					width="14"
					height="14"
					class="text-teal/60"
				/>
				<p>
					All computations run entirely on your device. AccounTech does not collect, store, or
					transmit any of your inputs.
				</p>
			</div>
		</div>
	</div>
</main>

<Footer />
