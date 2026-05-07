export const PAGIBIG_LOW_TIER_THRESHOLD = 1_500;
const PAGIBIG_LOW_TIER_EMPLOYEE_RATE = 0.01;
const PAGIBIG_HIGH_TIER_EMPLOYEE_RATE = 0.02;
const PAGIBIG_EMPLOYER_RATE = 0.02;
export const PAGIBIG_MAX_FUND_SALARY = 10_000;
export const PAGIBIG_MAX_MANDATORY_PER_SIDE = 200;
export const PAGIBIG_EFFECTIVE_YEAR = 2026;

export type PagibigContribution = {
	monthlyBasicSalary: number;
	mfs: number;
	employeeRate: number;
	employerRate: number;
	employeeShare: number;
	employerShare: number;
	total: number;
	isLowTier: boolean;
	isCapped: boolean;
};

function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

export function computePagibigContribution(monthlyBasicSalary: number): PagibigContribution {
	if (!Number.isFinite(monthlyBasicSalary) || monthlyBasicSalary < 0) {
		throw new Error(`Invalid monthly basic salary: ${monthlyBasicSalary}`);
	}

	const isCapped = monthlyBasicSalary > PAGIBIG_MAX_FUND_SALARY;
	const mfs = Math.min(monthlyBasicSalary, PAGIBIG_MAX_FUND_SALARY);
	const isLowTier = mfs <= PAGIBIG_LOW_TIER_THRESHOLD;

	const employeeRate = isLowTier ? PAGIBIG_LOW_TIER_EMPLOYEE_RATE : PAGIBIG_HIGH_TIER_EMPLOYEE_RATE;
	const employerRate = PAGIBIG_EMPLOYER_RATE;

	const employeeShare = round2(mfs * employeeRate);
	const employerShare = round2(mfs * employerRate);
	const total = round2(employeeShare + employerShare);

	return {
		monthlyBasicSalary,
		mfs,
		employeeRate,
		employerRate,
		employeeShare,
		employerShare,
		total,
		isLowTier,
		isCapped
	};
}

export const PAGIBIG_EXAMPLE_SALARIES: readonly number[] = [1_200, 1_500, 5_000, 10_000, 25_000];
