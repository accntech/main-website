export type AnnualIncomeTaxBracket = {
	index: 1 | 2 | 3 | 4 | 5 | 6;
	rangeMin: number;
	rangeMax: number | null;
	baseTax: number;
	marginalRate: number;
	threshold: number;
};

export const ANNUAL_INCOME_TAX_EFFECTIVE_DATE = '2023-01-01';

export const ANNUAL_INCOME_TAX_BRACKETS: readonly AnnualIncomeTaxBracket[] = [
	{ index: 1, rangeMin: 0, rangeMax: 250_000, baseTax: 0, marginalRate: 0, threshold: 0 },
	{
		index: 2,
		rangeMin: 250_000,
		rangeMax: 400_000,
		baseTax: 0,
		marginalRate: 0.15,
		threshold: 250_000
	},
	{
		index: 3,
		rangeMin: 400_000,
		rangeMax: 800_000,
		baseTax: 22_500,
		marginalRate: 0.2,
		threshold: 400_000
	},
	{
		index: 4,
		rangeMin: 800_000,
		rangeMax: 2_000_000,
		baseTax: 102_500,
		marginalRate: 0.25,
		threshold: 800_000
	},
	{
		index: 5,
		rangeMin: 2_000_000,
		rangeMax: 8_000_000,
		baseTax: 402_500,
		marginalRate: 0.3,
		threshold: 2_000_000
	},
	{
		index: 6,
		rangeMin: 8_000_000,
		rangeMax: null,
		baseTax: 2_202_500,
		marginalRate: 0.35,
		threshold: 8_000_000
	}
];

export type AnnualIncomeTaxResult = {
	taxableIncome: number;
	bracket: AnnualIncomeTaxBracket;
	excess: number;
	marginalTax: number;
	tax: number;
	effectiveRate: number;
};

function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

function findAnnualIncomeTaxBracket(taxableIncome: number): AnnualIncomeTaxBracket {
	for (let i = ANNUAL_INCOME_TAX_BRACKETS.length - 1; i >= 0; i--) {
		const bracket = ANNUAL_INCOME_TAX_BRACKETS[i]!;
		if (taxableIncome >= bracket.threshold) return bracket;
	}
	return ANNUAL_INCOME_TAX_BRACKETS[0]!;
}

export function computeAnnualIncomeTax(taxableIncome: number): AnnualIncomeTaxResult {
	if (!Number.isFinite(taxableIncome) || taxableIncome < 0) {
		throw new Error(`Invalid taxable income: ${taxableIncome}`);
	}

	const bracket = findAnnualIncomeTaxBracket(taxableIncome);
	const excess = round2(Math.max(0, taxableIncome - bracket.threshold));
	const marginalTax = round2(excess * bracket.marginalRate);
	const tax = round2(bracket.baseTax + marginalTax);
	const effectiveRate = taxableIncome > 0 ? tax / taxableIncome : 0;

	return { taxableIncome, bracket, excess, marginalTax, tax, effectiveRate };
}
