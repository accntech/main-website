<script lang="ts">
	import Icon from '@iconify/svelte';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import {
		findSssContribution,
		SSS_CONTRIBUTION_TABLE_2025
	} from '$lib/services/payroll/sss-contribution-table';

	let raw = $state('');

	const compensation = $derived.by(() => {
		const cleaned = raw.replace(/[^0-9.]/g, '');
		if (!cleaned) return null;
		const n = Number(cleaned);
		return Number.isFinite(n) && n >= 0 ? n : null;
	});

	const row = $derived(compensation === null ? null : findSssContribution(compensation));

	const peso = new Intl.NumberFormat('en-PH', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	function fmt(value: number): string {
		if (value === 0) return '–';
		return peso.format(value);
	}

	function fmtPlain(value: number): string {
		return peso.format(value);
	}

	function rangeLabel(min: number, max: number): string {
		if (min === 0) return `Below ${peso.format(5250)}`;
		if (!Number.isFinite(max)) return `${peso.format(min)} – Over`;
		return `${peso.format(min)} – ${peso.format(max)}`;
	}

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'SSS Contribution Calculator',
		description:
			'Compute the Philippine SSS contribution from monthly compensation — Regular SS, MPF, and EC components, with the full 2025 schedule.',
		url: 'https://accountech.dev/apps/payroll-calculators/sss',
		isPartOf: { '@id': 'https://accountech.dev/#website' }
	};
</script>

<Seo
	title="SSS Contribution Calculator | AccounTech"
	description="Compute the Philippine SSS contribution from monthly compensation — Regular SS, MPF, and EC components, with the full 2025 schedule."
	ogImage="https://accountech.dev/og-sss.png"
	ogImageAlt="SSS Contribution Calculator — Regular SS, MPF, and EC components on the 2025 schedule."
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
				<li class="text-heading">SSS</li>
			</ol>
		</nav>

		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">
				Government Contribution
			</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				SSS Contribution Calculator
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				Business employers and employees · Effective <span class="font-medium text-heading"
					>January 2025</span
				>
			</p>
		</header>

		<section
			class="bg-surface gap-3 grid grid-cols-2 sm:grid-cols-4 mb-8 p-5 border border-divider-subtle rounded-2xl"
			aria-label="Contribution rate summary"
		>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Total rate</span>
				<span class="font-mono font-semibold text-heading text-base">15%</span>
				<span class="text-muted text-[11.5px]">of monthly salary credit</span>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Employer</span>
				<span class="font-mono font-semibold text-heading text-base">10%</span>
				<span class="text-muted text-[11.5px]"
					>+ EC <span class="font-mono">₱10 / ₱30</span></span
				>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Employee</span>
				<span class="font-mono font-semibold text-heading text-base">5%</span>
				<span class="text-muted text-[11.5px]">payroll-deducted</span>
			</div>
			<div class="flex flex-col gap-0.5">
				<span class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">MSC range</span>
				<span class="font-mono font-semibold text-heading text-base">₱5,000 – ₱35,000</span>
				<span class="text-muted text-[11.5px]"
					>cap <span class="font-mono">₱20,000</span> · MPF up to
					<span class="font-mono">₱15,000</span></span
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
					<p class="text-muted text-xs">Enter the employee's monthly compensation</p>
				</div>
			</div>

			<label class="block">
				<span class="block mb-2 font-medium text-body text-sm">Monthly compensation</span>
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
				<span class="block mt-2 text-muted text-xs">Peso amounts only · cents allowed</span>
			</label>

			{#if row}
				<div class="space-y-4 mt-6">
					<div class="gap-4 grid grid-cols-1 sm:grid-cols-2">
						<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
							<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">Bracket</p>
							<p class="mt-1 font-mono font-medium text-heading text-sm">
								{rangeLabel(row.rangeMin, row.rangeMax)}
							</p>
						</div>
						<div class="bg-elevated p-4 border border-divider-subtle rounded-xl">
							<p class="font-mono text-faint text-[11px] tracking-[0.12em] uppercase">
								Monthly salary credit
							</p>
							<p class="mt-1 font-mono font-semibold text-heading text-base">
								₱{fmtPlain(row.mscTotal)}
							</p>
							<p class="mt-0.5 font-mono text-muted text-xs">
								Reg ₱{fmtPlain(row.mscRegular)} · MPF {fmt(row.mscMpf)}
							</p>
						</div>
					</div>

					<div class="overflow-hidden border border-divider-subtle rounded-xl">
						<table
							class="w-full font-mono text-sm text-right tabular-nums border-collapse"
						>
							<thead
								class="bg-elevated border-b border-divider-subtle font-mono text-faint text-[10.5px] tracking-[0.12em] uppercase"
							>
								<tr>
									<th scope="col" class="px-3 py-2 text-left">Component</th>
									<th scope="col" class="px-3 py-2">Regular</th>
									<th scope="col" class="px-3 py-2">MPF</th>
									<th scope="col" class="px-3 py-2">EC</th>
									<th scope="col" class="px-3 py-2">Total</th>
								</tr>
							</thead>
							<tbody class="text-body">
								<tr class="border-b border-divider-subtle">
									<td class="px-3 py-2 text-left text-heading">Employer</td>
									<td class="px-3 py-2 text-muted">{fmt(row.employerRegular)}</td>
									<td class="px-3 py-2 text-muted">{fmt(row.employerMpf)}</td>
									<td class="px-3 py-2 text-muted">{fmt(row.employerEc)}</td>
									<td class="px-3 py-2 font-semibold text-heading">{fmtPlain(row.employerTotal)}</td>
								</tr>
								<tr class="border-b border-divider-subtle">
									<td class="px-3 py-2 text-left text-heading">Employee</td>
									<td class="px-3 py-2 text-muted">{fmt(row.employeeRegular)}</td>
									<td class="px-3 py-2 text-muted">{fmt(row.employeeMpf)}</td>
									<td class="px-3 py-2 text-muted">–</td>
									<td class="px-3 py-2 font-semibold text-heading">{fmtPlain(row.employeeTotal)}</td>
								</tr>
								<tr class="bg-elevated">
									<td class="px-3 py-2 font-semibold text-left text-heading">Total</td>
									<td class="px-3 py-2 text-muted"
										>{fmt(row.employerRegular + row.employeeRegular)}</td
									>
									<td class="px-3 py-2 text-muted">{fmt(row.employerMpf + row.employeeMpf)}</td>
									<td class="px-3 py-2 text-muted">{fmt(row.employerEc)}</td>
									<td class="px-3 py-2 font-semibold text-heading text-base"
										>{fmtPlain(row.total)}</td
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
					Enter a monthly compensation amount to see the contribution breakdown.
				</div>
			{/if}
		</section>

		<section class="mb-10" aria-label="Schedule">
			<h2 class="mb-4 font-rajdhani font-bold text-heading text-2xl">2025 Contribution Schedule</h2>

			<ul class="md:hidden flex flex-col gap-2.5">
				{#each SSS_CONTRIBUTION_TABLE_2025 as r (r.rangeMin)}
					<li class="bg-surface border border-divider-subtle rounded-xl overflow-hidden">
						<div
							class="flex items-center justify-between gap-3 bg-elevated border-b border-divider-subtle px-3.5 py-2.5"
						>
							<span class="font-mono font-medium text-heading text-xs tabular-nums"
								>{rangeLabel(r.rangeMin, r.rangeMax)}</span
							>
							<span class="flex flex-col items-end leading-tight">
								<span class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">MSC</span>
								<span class="font-mono font-semibold text-heading text-xs tabular-nums"
									>₱{fmtPlain(r.mscTotal)}</span
								>
							</span>
						</div>
						<dl
							class="grid grid-cols-2 gap-px bg-divider-subtle text-xs tabular-nums"
						>
							<div class="bg-surface flex flex-col gap-0.5 px-3.5 py-2.5">
								<dt class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">Employer</dt>
								<dd class="font-mono font-semibold text-heading text-xs">
									{fmt(r.employerTotal)}
								</dd>
							</div>
							<div class="bg-surface flex flex-col gap-0.5 px-3.5 py-2.5">
								<dt class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">Employee</dt>
								<dd class="font-mono font-semibold text-heading text-xs">
									{fmt(r.employeeTotal)}
								</dd>
							</div>
						</dl>
						<div
							class="flex items-center justify-between bg-elevated border-t border-divider-subtle px-3.5 py-2"
						>
							<span class="font-mono text-faint text-[10px] tracking-[0.12em] uppercase">Total</span>
							<span class="font-mono font-semibold text-heading text-xs tabular-nums"
								>₱{fmtPlain(r.total)}</span
							>
						</div>
					</li>
				{/each}
			</ul>

			<div class="hidden md:block bg-surface border border-divider-subtle rounded-2xl overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full font-mono text-xs text-right tabular-nums border-collapse">
						<thead
							class="bg-elevated border-b border-divider-subtle text-faint text-[10.5px] tracking-[0.12em] uppercase"
						>
							<tr>
								<th rowspan="2" scope="col" class="border-r border-divider-subtle px-3 py-2 text-left">
									Range of Compensation
								</th>
								<th
									colspan="3"
									scope="colgroup"
									class="border-r border-b border-divider-subtle px-3 py-2 text-center"
								>
									Monthly Salary Credit
								</th>
								<th
									colspan="4"
									scope="colgroup"
									class="border-r border-b border-divider-subtle px-3 py-2 text-center"
								>
									Employer
								</th>
								<th
									colspan="3"
									scope="colgroup"
									class="border-r border-b border-divider-subtle px-3 py-2 text-center"
								>
									Employee
								</th>
								<th rowspan="2" scope="col" class="px-3 py-2 text-center">Total</th>
							</tr>
							<tr>
								<th scope="col" class="px-3 py-2">Reg</th>
								<th scope="col" class="px-3 py-2">MPF</th>
								<th scope="col" class="border-r border-divider-subtle px-3 py-2">Total</th>
								<th scope="col" class="px-3 py-2">Reg</th>
								<th scope="col" class="px-3 py-2">MPF</th>
								<th scope="col" class="px-3 py-2">EC</th>
								<th scope="col" class="border-r border-divider-subtle px-3 py-2">Total</th>
								<th scope="col" class="px-3 py-2">Reg</th>
								<th scope="col" class="px-3 py-2">MPF</th>
								<th scope="col" class="border-r border-divider-subtle px-3 py-2">Total</th>
							</tr>
						</thead>
						<tbody class="text-body">
							{#each SSS_CONTRIBUTION_TABLE_2025 as r (r.rangeMin)}
								<tr class="border-b border-divider-subtle last:border-b-0 hover:bg-elevated">
									<td
										class="border-r border-divider-subtle px-3 py-1.5 text-left text-heading whitespace-nowrap"
									>
										{rangeLabel(r.rangeMin, r.rangeMax)}
									</td>
									<td class="px-3 py-1.5 text-muted">{fmt(r.mscRegular)}</td>
									<td class="px-3 py-1.5 text-muted">{fmt(r.mscMpf)}</td>
									<td class="border-r border-divider-subtle px-3 py-1.5 font-medium text-heading"
										>{fmt(r.mscTotal)}</td
									>
									<td class="px-3 py-1.5 text-muted">{fmt(r.employerRegular)}</td>
									<td class="px-3 py-1.5 text-muted">{fmt(r.employerMpf)}</td>
									<td class="px-3 py-1.5 text-muted">{fmt(r.employerEc)}</td>
									<td class="border-r border-divider-subtle px-3 py-1.5 font-medium text-heading"
										>{fmt(r.employerTotal)}</td
									>
									<td class="px-3 py-1.5 text-muted">{fmt(r.employeeRegular)}</td>
									<td class="px-3 py-1.5 text-muted">{fmt(r.employeeMpf)}</td>
									<td class="border-r border-divider-subtle px-3 py-1.5 font-medium text-heading"
										>{fmt(r.employeeTotal)}</td
									>
									<td class="px-3 py-1.5 font-semibold text-heading">{fmt(r.total)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<aside
			class="bg-surface mb-6 p-6 border border-divider-subtle rounded-2xl"
			aria-label="Glossary"
		>
			<h2 class="mb-3 font-rajdhani font-bold text-heading text-lg">Notes</h2>
			<dl class="flex flex-col gap-3 text-body text-sm leading-snug">
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-28 font-medium text-heading">MSC</dt>
					<dd>
						<span class="text-heading">Monthly Salary Credit</span> — the SSS-defined contribution
						base (₱500 steps, capped at <span class="font-mono">₱35,000</span>). Contributions are
						computed from MSC, not raw salary.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-28 font-medium text-heading">Regular SS</dt>
					<dd>
						Regular SSS portion of the MSC (capped at <span class="font-mono">₱20,000</span>) — funds
						retirement, sickness, maternity, disability, and death benefits.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-28 font-medium text-heading">MPF</dt>
					<dd>
						<span class="text-heading">Mandatory Provident Fund</span> — the MSC portion above
						<span class="font-mono">₱20,000</span> (up to <span class="font-mono">₱15,000</span>
						extra). Funds a separate provident account on top of regular benefits.
					</dd>
				</div>
				<div class="flex flex-col sm:flex-row gap-1 sm:gap-3">
					<dt class="flex-none w-28 font-medium text-heading">EC</dt>
					<dd>
						<span class="text-heading">Employees' Compensation</span> — flat employer-only premium
						(<span class="font-mono">₱10</span> for MSC ≤ <span class="font-mono">₱14,500</span>,
						<span class="font-mono">₱30</span> for MSC ≥ <span class="font-mono">₱15,000</span>) for
						work-related injury/illness coverage.
					</dd>
				</div>
			</dl>
		</aside>

		<p class="text-muted text-xs">
			Source: Social Security System contribution schedule for business employers and employees,
			effective January 2025.
		</p>
	</div>
</main>

<Footer />
