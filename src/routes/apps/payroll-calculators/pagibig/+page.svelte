<script lang="ts">
	import Icon from '@iconify/svelte';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import {
		computePagibigContribution,
		PAGIBIG_EFFECTIVE_YEAR,
		PAGIBIG_EXAMPLE_SALARIES,
		PAGIBIG_LOW_TIER_THRESHOLD,
		PAGIBIG_MAX_FUND_SALARY,
		PAGIBIG_MAX_MANDATORY_PER_SIDE
	} from '$lib/services/payroll/pagibig-contribution';

	let raw = $state('');

	const mbs = $derived.by(() => {
		const cleaned = raw.replace(/[^0-9.]/g, '');
		if (!cleaned) return null;
		const n = Number(cleaned);
		return Number.isFinite(n) && n >= 0 ? n : null;
	});

	const result = $derived(mbs === null ? null : computePagibigContribution(mbs));

	const peso = new Intl.NumberFormat('en-PH', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	const integerPeso = new Intl.NumberFormat('en-PH', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});

	function fmt(value: number): string {
		return peso.format(value);
	}

	function fmtInt(value: number): string {
		return integerPeso.format(value);
	}

	function pct(rate: number): string {
		return `${(rate * 100).toFixed(rate * 100 < 10 ? 1 : 0)}%`;
	}

	const examples = PAGIBIG_EXAMPLE_SALARIES.map((sal) => ({
		mbs: sal,
		...computePagibigContribution(sal)
	}));

	function bracketTag(isLowTier: boolean, isCapped: boolean): string {
		if (isCapped) return 'Capped';
		if (isLowTier) return 'Low tier';
		return 'Standard';
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Pag-IBIG Contribution Calculator',
		description:
			'Compute the HDMF Pag-IBIG mandatory contribution under Circular 460 — low-tier and standard rates with the ₱10,000 fund salary cap.',
		url: 'https://accountech.dev/apps/payroll-calculators/pagibig',
		isPartOf: { '@id': 'https://accountech.dev/#website' }
	};
</script>

<Seo
	title="Pag-IBIG Contribution Calculator | AccounTech"
	description="Compute the HDMF Pag-IBIG mandatory contribution under Circular 460 — low-tier and standard rates with the ₱10,000 fund salary cap."
	ogImage="https://accountech.dev/og-pagibig.png"
	ogImageAlt="Pag-IBIG Contribution Calculator — HDMF Circular 460 low-tier and standard rates."
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
				<li>
					<a href="/apps/payroll-calculators" class="hover:text-heading transition-colors"
						>Payroll &amp; Tax Calculators</a
					>
				</li>
				<li class="text-faint">/</li>
				<li class="text-heading">Pag-IBIG</li>
			</ol>
		</nav>

		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">
				Government Contribution
			</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				Pag-IBIG Contribution Calculator
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				HDMF mandatory contribution · Effective <span class="font-medium text-heading"
					>{PAGIBIG_EFFECTIVE_YEAR}</span
				> (per HDMF Circular No. 460)
			</p>
		</header>

		<section
			class="bg-surface gap-3 grid grid-cols-2 sm:grid-cols-4 mb-8 p-5 border border-divider-subtle rounded-2xl"
			aria-label="Rate summary"
		>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase"
					>Employee (low)</span
				>
				<span class="font-mono font-semibold text-heading text-base">1%</span>
				<span class="text-muted text-[11.5px]"
					>MFS ≤ <span class="font-mono">₱{fmtInt(PAGIBIG_LOW_TIER_THRESHOLD)}</span></span
				>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase"
					>Employee (std)</span
				>
				<span class="font-mono font-semibold text-heading text-base">2%</span>
				<span class="text-muted text-[11.5px]"
					>MFS &gt; <span class="font-mono">₱{fmtInt(PAGIBIG_LOW_TIER_THRESHOLD)}</span></span
				>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Employer</span>
				<span class="font-mono font-semibold text-heading text-base">2%</span>
				<span class="text-muted text-[11.5px]">flat — paid by company</span>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase"
					>Max mandatory</span
				>
				<span class="font-mono font-semibold text-heading text-base"
					>₱{fmtInt(PAGIBIG_MAX_MANDATORY_PER_SIDE * 2)}</span
				>
				<span class="text-muted text-[11.5px]"
					>₱{fmtInt(PAGIBIG_MAX_MANDATORY_PER_SIDE)} each · MFS cap
					<span class="font-mono">₱{fmtInt(PAGIBIG_MAX_FUND_SALARY)}</span></span
				>
			</div>
		</section>

		<section
			class="bg-surface mb-10 p-6 sm:p-8 border border-divider-subtle rounded-2xl"
			aria-label="Calculator"
		>
			<div class="flex items-center gap-3 mb-5">
				<div class="flex justify-center items-center bg-teal/10 rounded-xl w-10 h-10">
					<Icon
						icon="solar:calculator-minimalistic-linear"
						width="20"
						height="20"
						class="text-teal"
					/>
				</div>
				<div>
					<p class="font-rajdhani font-bold text-heading text-lg">Calculator</p>
					<p class="text-muted text-xs">Enter the employee's monthly basic salary</p>
				</div>
			</div>

			<label class="block">
				<span class="block mb-2 font-medium text-body text-sm">Monthly basic salary</span>
				<div class="relative">
					<span
						class="left-4 absolute inset-y-0 flex items-center font-mono text-muted text-sm pointer-events-none"
						aria-hidden="true">₱</span
					>
					<input
						type="text"
						inputmode="decimal"
						placeholder="e.g. 25,000"
						bind:value={raw}
						class="bg-field focus:bg-field-focus py-3 pr-4 pl-9 border border-divider focus:border-teal/60 rounded-xl focus:outline-none w-full font-mono text-heading text-base transition-colors placeholder:text-faint focus:ring-2 focus:ring-teal/20"
					/>
				</div>
				<span class="block mt-2 text-muted text-xs"
					>Mandatory only · members may voluntarily pay more for higher MP2 savings</span
				>
			</label>

			{#if result}
				<div class="space-y-4 mt-6">
					<div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
						<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
							<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">
								Monthly Fund Salary
							</p>
							<p class="mt-1 font-mono font-medium text-heading text-sm">₱{fmt(result.mfs)}</p>
							{#if result.isCapped}
								<p class="mt-0.5 text-muted text-xs">capped at ₱{fmt(PAGIBIG_MAX_FUND_SALARY)}</p>
							{:else if result.isLowTier}
								<p class="mt-0.5 text-muted text-xs">
									low tier (≤ ₱{fmt(PAGIBIG_LOW_TIER_THRESHOLD)})
								</p>
							{:else}
								<p class="mt-0.5 text-muted text-xs">straight 2% / 2%</p>
							{/if}
						</div>
						<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
							<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">
								Total contribution
							</p>
							<p class="mt-1 font-mono font-semibold text-heading text-base">₱{fmt(result.total)}</p>
							<p class="mt-0.5 text-muted text-xs">
								{pct(result.employeeRate)} EE + {pct(result.employerRate)} ER
							</p>
						</div>
					</div>

					<div class="overflow-hidden border border-divider-subtle rounded-xl">
						<table class="w-full font-mono text-sm text-right tabular-nums border-collapse">
							<thead
								class="bg-elevated border-b border-divider-subtle text-faint text-[10.5px] tracking-[0.12em] uppercase"
							>
								<tr>
									<th scope="col" class="px-3 py-2 text-left">Component</th>
									<th scope="col" class="px-3 py-2">Rate</th>
									<th scope="col" class="px-3 py-2">Amount</th>
								</tr>
							</thead>
							<tbody class="text-body">
								<tr class="border-b border-divider-subtle">
									<td class="px-3 py-2 text-left text-heading">Employer share</td>
									<td class="px-3 py-2 text-muted">{pct(result.employerRate)}</td>
									<td class="px-3 py-2 font-semibold text-heading">{fmt(result.employerShare)}</td>
								</tr>
								<tr class="border-b border-divider-subtle">
									<td class="px-3 py-2 text-left text-heading">Employee share</td>
									<td class="px-3 py-2 text-muted">{pct(result.employeeRate)}</td>
									<td class="px-3 py-2 font-semibold text-heading">{fmt(result.employeeShare)}</td>
								</tr>
								<tr class="bg-elevated">
									<td class="px-3 py-2 font-semibold text-left text-heading">Total</td>
									<td class="px-3 py-2 text-muted">{pct(result.employeeRate + result.employerRate)}</td
									>
									<td class="px-3 py-2 font-semibold text-heading text-base">{fmt(result.total)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			{:else}
				<div
					class="bg-elevated mt-6 p-8 border border-divider-subtle border-dashed rounded-xl text-muted text-sm text-center"
				>
					Enter a monthly basic salary to see the contribution breakdown.
				</div>
			{/if}
		</section>

		<section
			class="bg-surface mb-10 p-6 border border-divider-subtle rounded-2xl"
			aria-label="Computation"
		>
			<h2 class="mb-3 font-rajdhani font-bold text-heading text-lg">Computation</h2>
			<div
				class="bg-elevated px-4 py-3 border border-divider-subtle rounded-lg overflow-x-auto font-mono text-heading text-sm tabular-nums"
			>
				<div>mfs = min(MBS, ₱10,000)</div>
				<div class="text-muted">
					employee = mfs × (mfs ≤ ₱1,500 ? 1% : 2%) &nbsp;·&nbsp; employer = mfs × 2%
				</div>
			</div>
			<ul class="flex flex-col gap-2 mt-4 text-body text-sm leading-snug">
				<li>
					<span class="font-medium text-heading">Low tier (MFS ≤ ₱1,500)</span> — employer pays 2× the
					employee (1% / 2%).
				</li>
				<li>
					<span class="font-medium text-heading">Standard (₱1,500 &lt; MFS ≤ ₱10,000)</span> — both
					pay 2% of MFS.
				</li>
				<li>
					<span class="font-medium text-heading">Capped (MBS &gt; ₱10,000)</span> — MFS clamps to
					<span class="font-mono">₱10,000</span>; mandatory total stays at
					<span class="font-mono">₱400</span> (₱200 each). Voluntary top-ups go to MP2 savings.
				</li>
			</ul>
		</section>

		<section class="mb-10" aria-label="Examples">
			<h2 class="mb-4 font-rajdhani font-bold text-heading text-2xl">Examples</h2>

			<ul class="md:hidden flex flex-col gap-2.5">
				{#each examples as ex (ex.mbs)}
					<li class="bg-surface border border-divider-subtle rounded-xl overflow-hidden">
						<div
							class="flex items-center justify-between gap-3 bg-elevated border-b border-divider-subtle px-3.5 py-2.5"
						>
							<div class="flex items-center gap-2">
								<span class="font-mono font-medium text-heading text-xs tabular-nums"
									>₱{fmtInt(ex.mbs)}</span
								>
								<span
									class="border border-divider-subtle rounded-full px-1.5 py-0.5 text-faint text-[10px] tracking-[0.04em] uppercase"
								>
									{bracketTag(ex.isLowTier, ex.isCapped)}
								</span>
							</div>
							<span class="flex flex-col items-end leading-tight">
								<span class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">Total</span
								>
								<span class="font-mono font-semibold text-heading text-xs tabular-nums"
									>₱{fmt(ex.total)}</span
								>
							</span>
						</div>
						<dl class="grid grid-cols-2 gap-px bg-divider-subtle text-xs tabular-nums">
							<div class="bg-surface flex flex-col gap-0.5 px-3.5 py-2.5">
								<dt class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase"
									>Employer ({pct(ex.employerRate)})</dt
								>
								<dd class="font-mono font-semibold text-heading text-xs">{fmt(ex.employerShare)}</dd>
							</div>
							<div class="bg-surface flex flex-col gap-0.5 px-3.5 py-2.5">
								<dt class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase"
									>Employee ({pct(ex.employeeRate)})</dt
								>
								<dd class="font-mono font-semibold text-heading text-xs">{fmt(ex.employeeShare)}</dd>
							</div>
						</dl>
					</li>
				{/each}
			</ul>

			<div
				class="hidden md:block bg-surface border border-divider-subtle rounded-2xl overflow-hidden"
			>
				<table class="w-full font-mono text-sm text-right tabular-nums border-collapse">
					<thead
						class="bg-elevated border-b border-divider-subtle text-faint text-[10.5px] tracking-[0.12em] uppercase"
					>
						<tr>
							<th scope="col" class="px-3 py-2 text-left">Monthly Basic Salary</th>
							<th scope="col" class="px-3 py-2 text-left">Tier</th>
							<th scope="col" class="px-3 py-2">MFS</th>
							<th scope="col" class="px-3 py-2">Employer</th>
							<th scope="col" class="px-3 py-2">Employee</th>
							<th scope="col" class="px-3 py-2">Total</th>
						</tr>
					</thead>
					<tbody class="text-body">
						{#each examples as ex (ex.mbs)}
							<tr class="border-b border-divider-subtle last:border-b-0 hover:bg-elevated">
								<td class="px-3 py-2 text-left text-heading whitespace-nowrap"
									>₱{fmtInt(ex.mbs)}</td
								>
								<td class="px-3 py-2 text-left">
									<span
										class="border border-divider-subtle rounded-full px-2 py-0.5 font-sans text-faint text-[10.5px] tracking-[0.04em] uppercase"
										>{bracketTag(ex.isLowTier, ex.isCapped)}</span
									>
								</td>
								<td class="px-3 py-2 text-muted">₱{fmt(ex.mfs)}</td>
								<td class="px-3 py-2 text-muted"
									>{fmt(ex.employerShare)} <span class="text-[10.5px]">({pct(ex.employerRate)})</span
									></td
								>
								<td class="px-3 py-2 text-muted"
									>{fmt(ex.employeeShare)} <span class="text-[10.5px]">({pct(ex.employeeRate)})</span
									></td
								>
								<td class="px-3 py-2 font-semibold text-heading">{fmt(ex.total)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<p class="mt-3 text-muted text-xs">Use the calculator for an exact figure at any salary.</p>
		</section>

		<aside
			class="bg-surface mb-6 p-6 border border-divider-subtle rounded-2xl"
			aria-label="Notes"
		>
			<h2 class="mb-3 font-rajdhani font-bold text-heading text-lg">Notes</h2>
			<dl class="flex flex-col gap-3 text-body text-sm leading-snug">
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-32 font-medium text-heading">HDMF</dt>
					<dd>
						<span class="text-heading">Home Development Mutual Fund</span> — the corporation that
						runs Pag-IBIG. The two terms are used interchangeably.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-32 font-medium text-heading">MFS</dt>
					<dd>
						<span class="text-heading">Monthly Fund Salary</span> — the contribution base. Equal to
						the Monthly Basic Salary, capped at <span class="font-mono">₱10,000</span> for mandatory
						contributions.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-32 font-medium text-heading">MP2 savings</dt>
					<dd>
						Voluntary contributions on top of the mandatory <span class="font-mono">₱200</span>
						maximum go to the Modified Pag-IBIG 2 program — a higher-yield, tax-free savings tier.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-32 font-medium text-heading">Remittance</dt>
					<dd>
						Employers remit contributions on or before the <span class="text-heading">10th</span> of
						the following month.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-32 font-medium text-heading">Circular 460</dt>
					<dd>
						Effective February 2024 — doubled the MFS cap from
						<span class="font-mono">₱5,000</span> to <span class="font-mono">₱10,000</span>. Rates
						and ceiling unchanged through 2026.
					</dd>
				</div>
			</dl>
		</aside>
	</div>
</main>

<Footer />
