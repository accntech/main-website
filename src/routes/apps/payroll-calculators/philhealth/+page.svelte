<script lang="ts">
	import Icon from '@iconify/svelte';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import {
		computePhilHealthContribution,
		PHILHEALTH_EFFECTIVE_YEAR,
		PHILHEALTH_EXAMPLE_SALARIES,
		PHILHEALTH_INCOME_CEILING,
		PHILHEALTH_INCOME_FLOOR,
		PHILHEALTH_MAX_PREMIUM,
		PHILHEALTH_MIN_PREMIUM
	} from '$lib/services/payroll/philhealth-contribution';

	let raw = $state('');

	const mbs = $derived.by(() => {
		const cleaned = raw.replace(/[^0-9.]/g, '');
		if (!cleaned) return null;
		const n = Number(cleaned);
		return Number.isFinite(n) && n >= 0 ? n : null;
	});

	const result = $derived(mbs === null ? null : computePhilHealthContribution(mbs));

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

	const examples = PHILHEALTH_EXAMPLE_SALARIES.map((sal) => ({
		mbs: sal,
		...computePhilHealthContribution(sal)
	}));

	function bracketTag(isFloor: boolean, isCeiling: boolean): string {
		if (isFloor) return 'Floor';
		if (isCeiling) return 'Ceiling';
		return 'Straight 5%';
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'PhilHealth Premium Calculator',
		description:
			'Compute the PhilHealth premium at the 5% rate effective 2026 — straight 50/50 employer-employee split with floor and ceiling.',
		url: 'https://accountech.dev/apps/payroll-calculators/philhealth',
		isPartOf: { '@id': 'https://accountech.dev/#website' }
	};
</script>

<Seo
	title="PhilHealth Premium Calculator | AccounTech"
	description="Compute the PhilHealth premium at the 5% rate effective 2026 — straight 50/50 employer-employee split with floor and ceiling."
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
				<li class="text-heading">PhilHealth</li>
			</ol>
		</nav>

		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">
				Government Contribution
			</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				PhilHealth Premium Calculator
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				Direct contributors (employer–employee) · Effective <span class="font-medium text-heading"
					>January {PHILHEALTH_EFFECTIVE_YEAR}</span
				>
			</p>
		</header>

		<section
			class="bg-surface gap-3 grid grid-cols-2 sm:grid-cols-4 mb-8 p-5 border border-divider-subtle rounded-2xl"
			aria-label="Premium summary"
		>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Premium rate</span
				>
				<span class="font-mono font-semibold text-heading text-base">5%</span>
				<span class="text-muted text-[11.5px]">straight on monthly basic salary</span>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Employer</span>
				<span class="font-mono font-semibold text-heading text-base">2.5%</span>
				<span class="text-muted text-[11.5px]">paid by company</span>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Employee</span>
				<span class="font-mono font-semibold text-heading text-base">2.5%</span>
				<span class="text-muted text-[11.5px]">payroll-deducted</span>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">MBS range</span>
				<span class="font-mono font-semibold text-heading text-base"
					>₱{fmtInt(PHILHEALTH_INCOME_FLOOR)} – ₱{fmtInt(PHILHEALTH_INCOME_CEILING)}</span
				>
				<span class="text-muted text-[11.5px]"
					>Premium <span class="font-mono"
						>₱{fmtInt(PHILHEALTH_MIN_PREMIUM)} – ₱{fmtInt(PHILHEALTH_MAX_PREMIUM)}</span
					></span
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
					>Excludes overtime, allowances, bonuses, and tardiness/absence deductions</span
				>
			</label>

			{#if result}
				<div class="space-y-4 mt-6">
					<div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
						<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
							<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">MBS applied</p>
							<p class="mt-1 font-mono font-medium text-heading text-sm">
								₱{fmt(result.mbsApplied)}
							</p>
							{#if result.isFloor}
								<p class="mt-0.5 text-muted text-xs">
									floor (≤ ₱{fmt(PHILHEALTH_INCOME_FLOOR)})
								</p>
							{:else if result.isCeiling}
								<p class="mt-0.5 text-muted text-xs">
									ceiling (≥ ₱{fmt(PHILHEALTH_INCOME_CEILING)})
								</p>
							{:else}
								<p class="mt-0.5 text-muted text-xs">straight 5% of salary</p>
							{/if}
						</div>
						<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
							<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">
								Total premium
							</p>
							<p class="mt-1 font-mono font-semibold text-heading text-base">
								₱{fmt(result.premium)}
							</p>
							<p class="mt-0.5 text-muted text-xs">5% of MBS applied</p>
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
									<td class="px-3 py-2 text-muted">2.5%</td>
									<td class="px-3 py-2 font-semibold text-heading">{fmt(result.employerShare)}</td>
								</tr>
								<tr class="border-b border-divider-subtle">
									<td class="px-3 py-2 text-left text-heading">Employee share</td>
									<td class="px-3 py-2 text-muted">2.5%</td>
									<td class="px-3 py-2 font-semibold text-heading">{fmt(result.employeeShare)}</td>
								</tr>
								<tr class="bg-elevated">
									<td class="px-3 py-2 font-semibold text-left text-heading">Total premium</td>
									<td class="px-3 py-2 text-muted">5.0%</td>
									<td class="px-3 py-2 font-semibold text-heading text-base"
										>{fmt(result.premium)}</td
									>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			{:else}
				<div
					class="bg-elevated mt-6 p-8 border border-divider-subtle border-dashed rounded-xl text-muted text-sm text-center"
				>
					Enter a monthly basic salary to see the premium breakdown.
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
				<div>premium = clamp(MBS, ₱10,000, ₱100,000) × 5%</div>
				<div class="text-muted">employer = premium ÷ 2 &nbsp;·&nbsp; employee = premium ÷ 2</div>
			</div>
			<ul class="flex flex-col gap-2 mt-4 text-body text-sm leading-snug">
				<li>
					<span class="font-medium text-heading">If MBS ≤ ₱10,000</span> → premium fixed at
					<span class="font-mono">₱500</span> (₱250 each)
				</li>
				<li>
					<span class="font-medium text-heading">If ₱10,000 &lt; MBS &lt; ₱100,000</span> → premium =
					<span class="font-mono">MBS × 5%</span>, split equally
				</li>
				<li>
					<span class="font-medium text-heading">If MBS ≥ ₱100,000</span> → premium fixed at
					<span class="font-mono">₱5,000</span> (₱2,500 each)
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
									{bracketTag(ex.isFloor, ex.isCeiling)}
								</span>
							</div>
							<span class="flex flex-col items-end leading-tight">
								<span class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase"
									>Premium</span
								>
								<span class="font-mono font-semibold text-heading text-xs tabular-nums"
									>₱{fmt(ex.premium)}</span
								>
							</span>
						</div>
						<dl class="grid grid-cols-2 gap-px bg-divider-subtle text-xs tabular-nums">
							<div class="bg-surface flex flex-col gap-0.5 px-3.5 py-2.5">
								<dt class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">Employer</dt
								>
								<dd class="font-mono font-semibold text-heading text-xs">{fmt(ex.employerShare)}</dd>
							</div>
							<div class="bg-surface flex flex-col gap-0.5 px-3.5 py-2.5">
								<dt class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">Employee</dt
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
							<th scope="col" class="px-3 py-2 text-left">Bracket</th>
							<th scope="col" class="px-3 py-2">Employer (2.5%)</th>
							<th scope="col" class="px-3 py-2">Employee (2.5%)</th>
							<th scope="col" class="px-3 py-2">Total premium (5%)</th>
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
										>{bracketTag(ex.isFloor, ex.isCeiling)}</span
									>
								</td>
								<td class="px-3 py-2 text-muted">{fmt(ex.employerShare)}</td>
								<td class="px-3 py-2 text-muted">{fmt(ex.employeeShare)}</td>
								<td class="px-3 py-2 font-semibold text-heading">{fmt(ex.premium)}</td>
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
					<dt class="flex-none w-32 font-medium text-heading">MBS</dt>
					<dd>
						<span class="text-heading">Monthly Basic Salary</span> — base pay only. Excludes
						commissions, overtime, allowances, bonuses, and deductions for tardiness or absences.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-32 font-medium text-heading">Direct contributor</dt>
					<dd>
						Members with formal employer–employee relationships in government or the private sector
						(regular, casual, or contractual).
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-32 font-medium text-heading">Rate cap</dt>
					<dd>
						5% is the legislated cap under the Universal Health Care Act (RA 11223). PhilHealth
						confirmed no increase for 2026.
					</dd>
				</div>
			</dl>
		</aside>
	</div>
</main>

<Footer />
