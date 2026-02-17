const MONTHS: Record<string, number> = {
	January: 1,
	February: 2,
	March: 3,
	April: 4,
	May: 5,
	June: 6,
	July: 7,
	August: 8,
	September: 9,
	October: 10,
	November: 11,
	December: 12
};

export function parseMonth(value: string): number | null {
	return MONTHS[value.trim()] ?? null;
}

export function cleanUp(str: string | null | undefined): string {
	if (!str || !str.trim()) return '';
	return unidecode(
		normalizeWhiteSpace(str.replace(/[,$`&"']/g, ''))
			.trim()
			.toUpperCase()
	);
}

export function normalizeWhiteSpace(input: string): string {
	return input.replace(
		/[\u0020\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000\u2028\u2029\u0009\u000A\u000B\u000C\u000D\u0085]+/g,
		' '
	);
}

export function strip(str: string | null | undefined): string {
	if (!str || !str.trim()) return '';
	const digits = str.replace(/[^0-9]/g, '');
	return digits.padEnd(9, '0').slice(0, 9);
}

export function isValidTin(str: string): boolean {
	const stripped = strip(str);
	return stripped.length === 9 && stripped !== '000000000';
}

export function toValue(val: number): string {
	const rounded = Math.round(val * 100) / 100;
	if (val % 1 === 0) return Math.trunc(val).toString();
	return rounded.toString();
}

export function round(val: number): string {
	return (Math.round(val * 100) / 100).toFixed(2);
}

export function isTrue(str: string | null | undefined): boolean {
	if (!str || !str.trim()) return false;
	const upper = str.trim().toUpperCase();
	return ['YES', 'Y', 'TRUE', 'T', '1'].includes(upper);
}

export function getEndOfMonth(year: number, month: number): Date {
	if (month <= 12) {
		return new Date(year, month, 0); // JS: month is 1-indexed, day 0 = last day of prev month
	}
	const adjustedMonth = month - 12;
	return new Date(year + 1, adjustedMonth, 0);
}

export function quarterRangeString(startingMonth: number, year: number): string {
	const startDate = getEndOfMonth(year, startingMonth);
	const endDate = getEndOfMonth(year, startingMonth + 2);
	return `${formatDate(startDate, 'MMddyyyy')}-${formatDate(endDate, 'MMddyyyy')}`;
}

export function formatDate(date: Date, format: string): string {
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const yyyy = String(date.getFullYear());
	if (format === 'MMddyyyy') return `${mm}${dd}${yyyy}`;
	return `${mm}/${dd}/${yyyy}`;
}

export function buildFullName(lastName: string, firstName: string, middleName: string): string {
	const parts: string[] = [];
	if (lastName) parts.push(lastName);
	if (firstName) {
		if (parts.length > 0) parts[0] += ',';
		parts.push(firstName);
	}
	if (middleName) parts.push(middleName);
	return parts.join(' ');
}

export function unidecode(str: string): string {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function datesEqual(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}
