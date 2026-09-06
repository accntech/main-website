import JsBarcode from 'jsbarcode';
import { MAX_LABELS, type BarcodeRecord, type PrintSettings } from './types.ts';

export const MM = 72 / 25.4;
export const BAR_HEIGHT = 14 * MM;
export const BAR_TOP = 11 * MM;
export const VALUE_TOP = 27 * MM;
export const LABEL_TOP = 9;
export const LABEL_LINE_HEIGHT = 10;

type LayoutSettings = Omit<PrintSettings, 'guides'>;

export function getSheetLayout(settings: LayoutSettings) {
	if (!['A4', 'LETTER', 'LEGAL'].includes(settings.paper) || ![1, 2, 3].includes(settings.columns)) {
		throw new Error('Choose a supported paper size and number of columns.');
	}
	if (settings.orientation && !['portrait', 'landscape'].includes(settings.orientation)) {
		throw new Error('Choose portrait or landscape orientation.');
	}
	const marginMm = settings.margins ?? { top: 10, right: 10, bottom: 10, left: 10 };
	if (['top', 'right', 'bottom', 'left'].some((side) => {
		const value = marginMm[side as keyof typeof marginMm];
		return !Number.isFinite(value) || value < 0 || value > 50;
	})) throw new Error('Each page margin must be a number between 0 and 50 mm.');
	let [width, height] = settings.paper === 'A4' ? [595.28, 841.89] : settings.paper === 'LEGAL' ? [612, 1008] : [612, 792];
	if (settings.orientation === 'landscape') [width, height] = [height, width];
	const margins = { top: marginMm.top * MM, right: marginMm.right * MM, bottom: marginMm.bottom * MM, left: marginMm.left * MM };
	const gap = 3 * MM;
	const labelHeight = 35 * MM;
	const labelWidth = (width - margins.left - margins.right - gap * (settings.columns - 1)) / settings.columns;
	const rows = Math.floor((height - margins.top - margins.bottom + gap) / (labelHeight + gap));
	return { width, height, margins, gap, labelWidth, labelHeight, rows, perPage: rows * settings.columns };
}

export function encodeBarcode(value: string) {
	if (!/^[\x20-\x7E]{1,80}$/.test(value)) throw new Error('Use 1–80 printable ASCII characters for the barcode.');
	const target: { encodings?: { data: string }[] } = {};
	JsBarcode(target, value, { format: 'CODE128', displayValue: false });
	const binary = target.encodings!.map((encoding) => encoding.data).join('');
	const bars: { x: number; width: number }[] = [];
	for (let i = 0; i < binary.length;) {
		if (binary[i] === '0') { i++; continue; }
		const start = i;
		while (binary[i] === '1') i++;
		bars.push({ x: start + 10, width: i - start });
	}
	// Ten narrow modules of white space on both sides are part of the barcode.
	return { bars, width: binary.length + 20 };
}

function wrapLabel(text: string, width: number) {
	const words = text.trim().split(/\s+/);
	const description = words.join(' ');
	// Reserve one em per character so even wide glyphs stay inside the label.
	let labelFontSize = Math.min(8, width / Math.max(1, description.length));
	let labelLines = [description];
	if (labelFontSize === 8) return { labelFontSize, labelLines };

	// Choose the largest font that fits two whole-word lines. At the same size,
	// prefer filling the first line before wrapping. Unbroken words shrink to fit.
	for (let split = 1; split < words.length; split++) {
		const lines = [words.slice(0, split).join(' '), words.slice(split).join(' ')];
		const fontSize = Math.min(8, width / Math.max(...lines.map((line) => line.length)));
		if (fontSize >= labelFontSize) {
			labelFontSize = fontSize;
			labelLines = lines;
		}
	}
	return { labelFontSize, labelLines };
}

export function layoutBarcodes(records: BarcodeRecord[], settings: LayoutSettings) {
	const sheet = getSheetLayout(settings);
	const total = records.reduce((sum, record) => sum + record.quantity, 0);
	if (!total || total > MAX_LABELS || records.some((record) => !Number.isInteger(record.quantity) || record.quantity < 1)) {
		throw new Error('Choose between 1 and 1,000 labels, using whole-number quantities.');
	}
	const labels = records.flatMap((record) => {
		const encoding = encodeBarcode(record.barcode);
		const scale = Math.min(1.2, (sheet.labelWidth - 12) / encoding.width);
		if (scale < 0.75) {
			throw new Error(`Row ${record.row}: this barcode needs a wider label. Choose fewer columns or shorten the value.`);
		}
		const { labelFontSize, labelLines } = wrapLabel(record.label, sheet.labelWidth - 16);
		return Array.from({ length: record.quantity }, (_, copy) => ({
			...record, id: `${record.row}-${copy}`, encoding, scale,
			barcodeWidth: encoding.width * scale,
			labelFontSize, labelLines,
			valueFontSize: Math.min(9, (sheet.labelWidth - 16) / record.barcode.length)
		}));
	});
	const pages: PositionedLabel[][] = [];
	for (let i = 0; i < labels.length; i++) {
		const slot = i % sheet.perPage;
		const page = Math.floor(i / sheet.perPage);
		(pages[page] ??= []).push({
			...labels[i],
			x: sheet.margins.left + (slot % settings.columns) * (sheet.labelWidth + sheet.gap),
			y: sheet.margins.top + Math.floor(slot / settings.columns) * (sheet.labelHeight + sheet.gap)
		});
	}
	return pages;
}

export type PositionedLabel = BarcodeRecord & {
	id: string;
	encoding: ReturnType<typeof encodeBarcode>;
	scale: number;
	barcodeWidth: number;
	labelFontSize: number;
	labelLines: string[];
	valueFontSize: number;
	x: number;
	y: number;
};
