<script lang="ts">
	import Icon from '@iconify/svelte';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import {
		ANNUAL_INCOME_TAX_BRACKETS,
		ANNUAL_INCOME_TAX_EFFECTIVE_DATE,
		computeAnnualIncomeTax,
		type AnnualIncomeTaxBracket
	} from '$lib/services/payroll/annual-income-tax';

	let raw = $state('');

	const taxableIncome = $derived.by(() => {
		const cleaned = raw.replace(/[^0-9.]/g, '');
		if (!cleaned) return null;
		const n = Number(cleaned);
		return Number.isFinite(n) && n >= 0 ? n : null;
	});

	const result = $derived(taxableIncome === null ? null : computeAnnualIncomeTax(taxableIncome));

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

	function pct(rate: number, decimals = 0): string {
		return `${(rate * 100).toFixed(decimals)}%`;
	}

	function rangeLabel(b: AnnualIncomeTaxBracket): string {
		if (b.index === 1) return `Not over ₱${fmtInt(b.rangeMax!)}`;
		if (b.rangeMax === null) return `Over ₱${fmtInt(b.rangeMin)}`;
		return `Over ₱${fmtInt(b.rangeMin)} – ₱${fmtInt(b.rangeMax)}`;
	}

	function formulaLabel(b: AnnualIncomeTaxBracket): string {
		if (b.marginalRate === 0) return '0';
		const baseStr = b.baseTax === 0 ? '0' : `₱${fmt(b.baseTax)}`;
		return `${baseStr} + ${pct(b.marginalRate)} over ₱${fmtInt(b.threshold)}`;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'BIR Annual Income Tax Calculator',
		description:
			'BIR annual income tax under TRAIN Law — six-bracket schedule effective 2023 onwards with effective rate breakdown.',
		url: 'https://accountech.dev/apps/payroll-calculators/annual-income-tax',
		isPartOf: { '@id': 'https://accountech.dev/#website' }
	};
</script>

<Seo
	title="BIR Annual Income Tax Calculator | AccounTech"
	description="BIR annual income tax under TRAIN Law — six-bracket schedule effective 2023 onwards with effective rate breakdown."
	ogImage="https://accountech.dev/og-annual-income-tax.png"
	ogImageAlt="BIR Annual Income Tax Calculator — six-bracket TRAIN Law schedule with effective rate breakdown."
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
				<li class="text-heading">Annual Income Tax</li>
			</ol>
		</nav>

		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">BIR Tax</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				Annual Income Tax Calculator
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				BIR — TRAIN Law · Effective <span class="font-medium text-heading"
					>January 1, {ANNUAL_INCOME_TAX_EFFECTIVE_DATE.slice(0, 4)} onwards</span
				>
			</p>
		</header>

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
					<p class="text-muted text-xs">Enter the annual taxable income</p>
				</div>
			</div>

			<label class="block">
				<span class="block mb-2 font-medium text-body text-sm">Annual taxable income</span>
				<div class="relative">
					<span
						class="left-4 absolute inset-y-0 flex items-center font-mono text-muted text-sm pointer-events-none"
						aria-hidden="true">₱</span
					>
					<input
						type="text"
						inputmode="decimal"
						placeholder="e.g. 600,000"
						bind:value={raw}
						class="bg-field focus:bg-field-focus py-3 pr-4 pl-9 border border-divider focus:border-teal/60 rounded-xl focus:outline-none w-full font-mono text-heading text-base transition-colors placeholder:text-faint focus:ring-2 focus:ring-teal/20"
					/>
				</div>
				<span class="block mt-2 text-muted text-xs"
					>Net of mandatory contributions, allowable deductions, and exemptions</span
				>
			</label>

			{#if result}
				{@const b = result.bracket}
				<div class="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-6">
					<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
						<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Bracket</p>
						<p class="mt-1 font-mono font-medium text-heading text-sm">
							{pct(b.marginalRate)} marginal
						</p>
						<p class="mt-0.5 text-muted text-xs">
							base ₱{fmt(b.baseTax)}
							{b.marginalRate > 0
								? `· + ${pct(b.marginalRate)} over ₱${fmt(b.threshold)}`
								: '(zero rate)'}
						</p>
					</div>
					<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
						<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Annual tax</p>
						<p class="mt-1 font-mono font-semibold text-heading text-base">₱{fmt(result.tax)}</p>
						<p class="mt-0.5 text-muted text-xs">
							effective rate <span class="font-mono">{pct(result.effectiveRate, 2)}</span>
						</p>
					</div>
				</div>
			{:else}
				<div
					class="bg-elevated mt-6 p-8 border border-divider-subtle border-dashed rounded-xl text-muted text-sm text-center"
				>
					Enter an annual taxable income to see the tax breakdown.
				</div>
			{/if}
		</section>

		<section
			class="bg-surface mb-10 p-6 border border-divider-subtle rounded-2xl"
			aria-label="How it works"
		>
			<h2 class="mb-3 font-rajdhani font-bold text-heading text-lg">How it works</h2>
			<p class="mb-3 text-body text-sm leading-snug">
				Find the bracket the employee's <span class="text-heading">annual taxable income</span> falls
				into, then compute:
			</p>
			<div
				class="bg-elevated px-4 py-3 border border-divider-subtle rounded-lg overflow-x-auto font-mono text-heading text-sm tabular-nums"
			>
				<div>annual tax = base tax + marginal rate × (income − bracket threshold)</div>
			</div>
			<p class="mt-3 text-muted text-xs leading-snug">
				<span class="font-medium text-heading">Annual taxable income</span> = gross annual
				compensation less mandatory SSS, PhilHealth, and Pag-IBIG contributions, allowable
				deductions, and exemptions (e.g. 13th-month pay and other benefits up to ₱90,000).
			</p>
		</section>

		<section class="mb-10" aria-label="Tax brackets">
			<h2 class="mb-4 font-rajdhani font-bold text-heading text-2xl">Tax brackets</h2>

			<ul class="md:hidden flex flex-col gap-2.5" aria-label="Brackets">
				{#each ANNUAL_INCOME_TAX_BRACKETS as b (b.index)}
					<li class="bg-surface border border-divider-subtle rounded-xl overflow-hidden">
						<div
							class="flex items-center justify-between gap-3 bg-elevated border-b border-divider-subtle px-3.5 py-2.5"
						>
							<span class="font-mono font-medium text-heading text-xs tabular-nums"
								>{rangeLabel(b)}</span
							>
							<span class="flex flex-col items-end leading-tight">
								<span class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase"
									>Marginal</span
								>
								<span class="font-mono font-semibold text-heading text-xs tabular-nums"
									>{pct(b.marginalRate)}</span
								>
							</span>
						</div>
						<div class="bg-surface flex flex-col gap-0.5 px-3.5 py-2.5">
							<dt class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">Tax due</dt>
							<dd class="font-mono font-medium text-heading text-xs tabular-nums">
								{formulaLabel(b)}
							</dd>
						</div>
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
							<th scope="col" class="border-r border-divider-subtle px-3 py-2 text-left"
								>Taxable Income Range</th
							>
							<th scope="col" class="px-3 py-2">Base tax</th>
							<th scope="col" class="px-3 py-2 text-center">Tax rate</th>
							<th scope="col" class="px-3 py-2">Threshold</th>
							<th scope="col" class="px-3 py-2 text-left">Tax due</th>
						</tr>
					</thead>
					<tbody class="text-body">
						{#each ANNUAL_INCOME_TAX_BRACKETS as b (b.index)}
							<tr class="border-b border-divider-subtle last:border-b-0 hover:bg-elevated">
								<td
									class="border-r border-divider-subtle px-3 py-1.5 text-left text-heading whitespace-nowrap"
									>{rangeLabel(b)}</td
								>
								<td class="px-3 py-1.5 text-muted">{fmt(b.baseTax)}</td>
								<td class="px-3 py-1.5 text-muted text-center">{pct(b.marginalRate)}</td>
								<td class="px-3 py-1.5 text-muted"
									>{b.threshold === 0 ? '—' : `₱${fmtInt(b.threshold)}`}</td
								>
								<td class="px-3 py-1.5 text-left font-medium text-heading">{formulaLabel(b)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>

		<aside
			class="bg-surface mb-6 p-6 border border-divider-subtle rounded-2xl"
			aria-label="Notes"
		>
			<h2 class="mb-3 font-rajdhani font-bold text-heading text-lg">Notes</h2>
			<dl class="flex flex-col gap-3 text-body text-sm leading-snug">
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-36 font-medium text-heading">Taxable income</dt>
					<dd>
						Gross annual compensation net of <span class="text-heading"
							>mandatory SSS, PhilHealth, Pag-IBIG</span
						>, allowable business or personal deductions, and exemptions. The brackets apply to this
						net figure.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-36 font-medium text-heading">Zero bracket</dt>
					<dd>
						Annual taxable income up to <span class="font-mono">₱250,000</span> is exempt — workers
						earning at or below this threshold pay no income tax.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-36 font-medium text-heading">13th-month / bonuses</dt>
					<dd>
						13th-month pay and other benefits totalling up to <span class="font-mono">₱90,000</span>
						per year are excluded from taxable income.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-36 font-medium text-heading">TRAIN Law</dt>
					<dd>
						Second tranche under RA 10963, effective January 1, 2023. Replaced the 2018–2022
						transitional rates.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-36 font-medium text-heading">Withholding vs annual</dt>
					<dd>
						BIR's withholding tax tables (Daily / Weekly / Semi-Monthly / Monthly) annualise to this
						same schedule — they exist so employers withhold the right amount per pay run.
					</dd>
				</div>
			</dl>
		</aside>
	</div>
</main>

<Footer />
