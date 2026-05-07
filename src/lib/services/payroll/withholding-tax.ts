export type PayrollPeriod = 'daily' | 'weekly' | 'semi-monthly' | 'monthly';

export type WithholdingTaxBracket = {
	index: 1 | 2 | 3 | 4 | 5 | 6;
	rangeMin: number;
	rangeMax: number | null;
	baseTax: number;
	marginalRate: number;
	threshold: number;
};

export const WITHHOLDING_TAX_EFFECTIVE_DATE = '2023-01-01';

export const WITHHOLDING_TAX_TABLES: Readonly<
	Record<PayrollPeriod, readonly WithholdingTaxBracket[]>
> = {
	daily: [
		{ index: 1, rangeMin: 0, rangeMax: 685, baseTax: 0, marginalRate: 0, threshold: 0 },
		{ index: 2, rangeMin: 685, rangeMax: 1_095, baseTax: 0, marginalRate: 0.15, threshold: 685 },
		{
			index: 3,
			rangeMin: 1_096,
			rangeMax: 2_191,
			baseTax: 61.65,
			marginalRate: 0.2,
			threshold: 1_096
		},
		{
			index: 4,
			rangeMin: 2_192,
			rangeMax: 5_478,
			baseTax: 280.85,
			marginalRate: 0.25,
			threshold: 2_192
		},
		{
			index: 5,
			rangeMin: 5_479,
			rangeMax: 21_917,
			baseTax: 1_102.6,
			marginalRate: 0.3,
			threshold: 5_479
		},
		{
			index: 6,
			rangeMin: 21_918,
			rangeMax: null,
			baseTax: 6_034.3,
			marginalRate: 0.35,
			threshold: 21_918
		}
	],
	weekly: [
		{ index: 1, rangeMin: 0, rangeMax: 4_808, baseTax: 0, marginalRate: 0, threshold: 0 },
		{
			index: 2,
			rangeMin: 4_808,
			rangeMax: 7_691,
			baseTax: 0,
			marginalRate: 0.15,
			threshold: 4_808
		},
		{
			index: 3,
			rangeMin: 7_692,
			rangeMax: 15_384,
			baseTax: 432.6,
			marginalRate: 0.2,
			threshold: 7_692
		},
		{
			index: 4,
			rangeMin: 15_385,
			rangeMax: 38_461,
			baseTax: 1_971.2,
			marginalRate: 0.25,
			threshold: 15_385
		},
		{
			index: 5,
			rangeMin: 38_462,
			rangeMax: 153_845,
			baseTax: 7_740.45,
			marginalRate: 0.3,
			threshold: 38_462
		},
		{
			index: 6,
			rangeMin: 153_846,
			rangeMax: null,
			baseTax: 42_355.65,
			marginalRate: 0.35,
			threshold: 153_846
		}
	],
	'semi-monthly': [
		{ index: 1, rangeMin: 0, rangeMax: 10_417, baseTax: 0, marginalRate: 0, threshold: 0 },
		{
			index: 2,
			rangeMin: 10_417,
			rangeMax: 16_666,
			baseTax: 0,
			marginalRate: 0.15,
			threshold: 10_417
		},
		{
			index: 3,
			rangeMin: 16_667,
			rangeMax: 33_332,
			baseTax: 937.5,
			marginalRate: 0.2,
			threshold: 16_667
		},
		{
			index: 4,
			rangeMin: 33_333,
			rangeMax: 83_332,
			baseTax: 4_270.7,
			marginalRate: 0.25,
			threshold: 33_333
		},
		{
			index: 5,
			rangeMin: 83_333,
			rangeMax: 333_332,
			baseTax: 16_770.7,
			marginalRate: 0.3,
			threshold: 83_333
		},
		{
			index: 6,
			rangeMin: 333_333,
			rangeMax: null,
			baseTax: 91_770.7,
			marginalRate: 0.35,
			threshold: 333_333
		}
	],
	monthly: [
		{ index: 1, rangeMin: 0, rangeMax: 20_833, baseTax: 0, marginalRate: 0, threshold: 0 },
		{
			index: 2,
			rangeMin: 20_833,
			rangeMax: 33_332,
			baseTax: 0,
			marginalRate: 0.15,
			threshold: 20_833
		},
		{
			index: 3,
			rangeMin: 33_333,
			rangeMax: 66_666,
			baseTax: 1_875,
			marginalRate: 0.2,
			threshold: 33_333
		},
		{
			index: 4,
			rangeMin: 66_667,
			rangeMax: 166_666,
			baseTax: 8_541.8,
			marginalRate: 0.25,
			threshold: 66_667
		},
		{
			index: 5,
			rangeMin: 166_667,
			rangeMax: 666_666,
			baseTax: 33_541.8,
			marginalRate: 0.3,
			threshold: 166_667
		},
		{
			index: 6,
			rangeMin: 666_667,
			rangeMax: null,
			baseTax: 183_541.8,
			marginalRate: 0.35,
			threshold: 666_667
		}
	]
};

export const PAYROLL_PERIOD_LABELS: Readonly<Record<PayrollPeriod, string>> = {
	daily: 'Daily',
	weekly: 'Weekly',
	'semi-monthly': 'Semi-Monthly',
	monthly: 'Monthly'
};

export type WithholdingTaxResult = {
	period: PayrollPeriod;
	taxableCompensation: number;
	bracket: WithholdingTaxBracket;
	excess: number;
	marginalTax: number;
	withheldTax: number;
};

function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

function findWithholdingTaxBracket(
	period: PayrollPeriod,
	taxableCompensation: number
): WithholdingTaxBracket {
	const brackets = WITHHOLDING_TAX_TABLES[period];
	for (let i = brackets.length - 1; i >= 0; i--) {
		const bracket = brackets[i]!;
		if (taxableCompensation >= bracket.threshold) return bracket;
	}
	return brackets[0]!;
}

export function computeWithholdingTax(
	period: PayrollPeriod,
	taxableCompensation: number
): WithholdingTaxResult {
	if (!Number.isFinite(taxableCompensation) || taxableCompensation < 0) {
		throw new Error(`Invalid taxable compensation: ${taxableCompensation}`);
	}

	const bracket = findWithholdingTaxBracket(period, taxableCompensation);
	const excess = round2(Math.max(0, taxableCompensation - bracket.threshold));
	const marginalTax = round2(excess * bracket.marginalRate);
	const withheldTax = round2(bracket.baseTax + marginalTax);

	return { period, taxableCompensation, bracket, excess, marginalTax, withheldTax };
}
