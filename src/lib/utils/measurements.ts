export type MeasurementUnit = 'mm' | 'in';

export function fromMillimetres(value: number, unit: MeasurementUnit): number {
	return unit === 'in' ? value / 25.4 : value;
}

export function toMillimetres(value: number, unit: MeasurementUnit): number {
	return unit === 'in' ? value * 25.4 : value;
}

export function formatMeasurement(value: number, unit: MeasurementUnit): string {
	return String(Number(fromMillimetres(value, unit).toFixed(unit === 'in' ? 4 : 2)));
}

export function stepNumber(value: number | undefined, direction: 1 | -1, step: number, min: number, max: number): number {
	const start = value !== undefined && Number.isFinite(value) ? value : min;
	return Number(Math.min(max, Math.max(min, start + direction * step)).toFixed(8));
}
