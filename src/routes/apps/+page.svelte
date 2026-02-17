<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';

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
		}
	];
</script>

<Seo
	title="Apps | AccounTech"
	description="Explore AccounTech's suite of tools and resources designed for Philippine tax compliance, accounting workflows, and business operations."
/>

<Nav />

<main class="bg-base min-h-screen">
	<div class="mx-auto px-5 sm:px-6 pt-28 pb-20 max-w-7xl">
		<header class="mb-14">
			<p class="mb-2 font-semibold text-sm text-teal tracking-widest uppercase">
				Tools &amp; Resources
			</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">Apps</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
		</header>

		<div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{#each apps as app (app.href)}
				<a
					href={app.href}
					class="group border border-divider-subtle bg-surface hover:border-teal/40 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal/5"
				>
					<div
						class="flex justify-center items-center bg-teal/10 group-hover:bg-teal/15 mb-5 rounded-xl w-12 h-12 transition-colors duration-300"
					>
						{#if app.icon === 'calendar'}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="text-teal">
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
								<line x1="16" y1="2" x2="16" y2="6" />
								<line x1="8" y1="2" x2="8" y2="6" />
								<line x1="3" y1="10" x2="21" y2="10" />
								<rect x="8" y="14" width="3" height="3" rx="0.5" />
							</svg>
						{:else if app.icon === 'list'}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="text-teal">
								<line x1="8" y1="6" x2="21" y2="6" />
								<line x1="8" y1="12" x2="21" y2="12" />
								<line x1="8" y1="18" x2="21" y2="18" />
								<line x1="3" y1="6" x2="3.01" y2="6" />
								<line x1="3" y1="12" x2="3.01" y2="12" />
								<line x1="3" y1="18" x2="3.01" y2="18" />
							</svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="text-teal">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
								<polyline points="14 2 14 8 20 8" />
								<line x1="16" y1="13" x2="8" y2="13" />
								<line x1="16" y1="17" x2="8" y2="17" />
								<polyline points="10 9 9 9 8 9" />
							</svg>
						{/if}
					</div>

					<h2 class="font-rajdhani font-bold text-heading text-lg">{app.title}</h2>
					<p class="mt-2 text-body text-sm leading-relaxed">{app.description}</p>

					<div
						class="flex items-center gap-1.5 mt-4 font-medium text-sm text-teal opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
					>
						Open app
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</div>
				</a>
			{/each}
		</div>
	</div>
</main>

<Footer />
