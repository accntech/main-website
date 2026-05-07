<script lang="ts">
	import Icon from '@iconify/svelte';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import libroLogo from '$lib/assets/libro-logo.svg';

	const apps = [
		{
			title: '2026 BIR Tax Calendar',
			description:
				'Interactive calendar with all BIR filing deadlines, form references, and compliance dates for the 2026 tax year.',
			href: '/apps/tax-calendar',
			icon: 'calendar' as const
		},
		{
			title: 'VAT Relief Generator',
			description:
				'Generate BIR-compliant VAT relief DAT files and reconciliation reports from your Excel template.',
			href: '/apps/vat-relief',
			icon: 'file' as const
		},
		{
			title: 'Top Withholding Agents',
			description:
				'Searchable directory of BIR-designated Top Withholding Agents with filtering by name, RDO, type, status, and date.',
			href: '/apps/top-withholding-agents',
			icon: 'list' as const
		},
		{
			title: 'Libro',
			description:
				'Simplify your bookkeeping — record journal entries, track your general ledger, generate trial balances, and produce balance sheets in minutes.',
			href: 'https://libro-app.com/',
			icon: 'book' as const,
			external: true,
			catppuccin: true
		}
	];

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Apps',
		description:
			"Explore AccounTech's suite of tools and resources designed for Philippine tax compliance, accounting workflows, and business operations.",
		url: 'https://accountech.dev/apps',
		isPartOf: { '@id': 'https://accountech.dev/#website' }
	};
</script>

<Seo
	title="Apps | AccounTech"
	description="Explore AccounTech's suite of tools and resources designed for Philippine tax compliance, accounting workflows, and business operations."
	{jsonLd}
/>

<Nav />

<main class="bg-base min-h-screen">
	<div class="mx-auto px-5 sm:px-6 pt-28 pb-20 max-w-7xl">
		<header class="mb-14">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">
				Tools &amp; Resources
			</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">Apps</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
		</header>

		<div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{#each apps as app (app.href)}
				<a
					href={app.href}
					target={app.external ? '_blank' : undefined}
					rel={app.external ? 'noopener noreferrer' : undefined}
					class="group border border-divider-subtle bg-surface p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg {app.catppuccin
						? 'hover:border-[#179299]/40 hover:shadow-[#179299]/5'
						: 'hover:border-teal/40 hover:shadow-teal/5'}"
				>
					<div
						class="flex justify-center items-center mb-5 rounded-xl w-12 h-12 transition-colors duration-300 {app.catppuccin
							? 'bg-[#179299]/10 group-hover:bg-[#179299]/15'
							: 'bg-teal/10 group-hover:bg-teal/15'}"
					>
						{#if app.icon === 'calendar'}
							<Icon icon="solar:calendar-linear" width="24" height="24" class="text-teal" />
						{:else if app.icon === 'list'}
							<Icon icon="solar:list-linear" width="24" height="24" class="text-teal" />
						{:else if app.icon === 'book'}
							<img src={libroLogo} alt="Libro logo" class="w-7 h-7" />
						{:else}
							<Icon icon="solar:document-linear" width="24" height="24" class="text-teal" />
						{/if}
					</div>

					<h2 class="font-rajdhani font-bold text-heading text-lg">
						{app.title}
					</h2>
					<p class="mt-2 text-body text-sm leading-relaxed">{app.description}</p>

					<div
						class="flex items-center gap-1.5 mt-4 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1 {app.catppuccin
							? 'text-[#179299]'
							: 'text-teal'}"
					>
						{app.external ? 'Visit site' : 'Open app'}
						{#if app.external}
							<Icon icon="solar:arrow-right-up-linear" width="16" height="16" />
						{:else}
							<Icon icon="solar:arrow-right-linear" width="16" height="16" />
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</main>

<Footer />
