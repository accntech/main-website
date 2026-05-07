const PHILHEALTH_PREMIUM_RATE = 0.05;
export const PHILHEALTH_INCOME_FLOOR = 10_000;
export const PHILHEALTH_INCOME_CEILING = 100_000;
export const PHILHEALTH_MIN_PREMIUM = 500;
export const PHILHEALTH_MAX_PREMIUM = 5_000;
export const PHILHEALTH_EFFECTIVE_YEAR = 2026;

export type PhilHealthContribution = {
	monthlyBasicSalary: number;
	mbsApplied: number;
	premium: number;
	employerShare: number;
	employeeShare: number;
	isFloor: boolean;
	isCeiling: boolean;
};

function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

export function computePhilHealthContribution(monthlyBasicSalary: number): PhilHealthContribution {
	if (!Number.isFinite(monthlyBasicSalary) || monthlyBasicSalary < 0) {
		throw new Error(`Invalid monthly basic salary: ${monthlyBasicSalary}`);
	}

	const isFloor = monthlyBasicSalary <= PHILHEALTH_INCOME_FLOOR;
	const isCeiling = monthlyBasicSalary >= PHILHEALTH_INCOME_CEILING;
	const mbsApplied = Math.min(
		Math.max(monthlyBasicSalary, PHILHEALTH_INCOME_FLOOR),
		PHILHEALTH_INCOME_CEILING
	);

	const premium = round2(mbsApplied * PHILHEALTH_PREMIUM_RATE);
	const employeeShare = round2(premium / 2);
	const employerShare = round2(premium - employeeShare);

	return {
		monthlyBasicSalary,
		mbsApplied,
		premium,
		employerShare,
		employeeShare,
		isFloor,
		isCeiling
	};
}

export const PHILHEALTH_EXAMPLE_SALARIES: readonly number[] = [8_000, 25_000, 60_000, 120_000];
