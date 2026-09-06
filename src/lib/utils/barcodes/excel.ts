import type { Cell, CellValue } from 'exceljs';
import { MAX_LABELS, type BarcodeRecord } from './types.ts';

function cellText(value: CellValue): string {
	if (value === null || value === undefined) return '';
	if (typeof value === 'string' || typeof value === 'number') return String(value);
	if (typeof value === 'object' && 'richText' in value) {
		return value.richText.map((part) => part.text).join('');
	}
	throw new Error('Use plain text or numbers, without formulas, dates, or links.');
}

function barcodeText(cell: Cell, row: number): string {
	const value = cell.value;
	if (value && typeof value === 'object' && ('formula' in value || 'sharedFormula' in value)) {
		throw new Error(`Row ${row}: replace the barcode formula with its value, stored as text.`);
	}
	if (typeof value === 'number') {
		// Excel retains only 15 significant digits. Never print a potentially rounded identifier.
		if (!Number.isSafeInteger(value) || value < 0 || value > 999999999999999) {
			throw new Error(`Row ${row}: store the original barcode as text to avoid Excel rounding.`);
		}
		if (/^0+$/.test(cell.numFmt)) return String(value).padStart(cell.numFmt.length, '0');
		if (cell.numFmt && !['General', '@', '0'].includes(cell.numFmt)) {
			throw new Error(`Row ${row}: store the barcode as text instead of using a numeric display format.`);
		}
	}
	try {
		return cellText(value);
	} catch {
		throw new Error(`Row ${row}: store the barcode as plain text, without dates, formulas, or links.`);
	}
}

export async function readBarcodeWorkbook(buffer: ArrayBuffer): Promise<BarcodeRecord[]> {
	const ExcelJS = (await import('exceljs')).default;
	const workbook = new ExcelJS.Workbook();
	try {
		await workbook.xlsx.load(buffer);
	} catch {
		throw new Error('Please choose a valid .xlsx workbook. Save older .xls files as .xlsx first.');
	}
	const sheet = workbook.getWorksheet('BARCODES') ?? workbook.worksheets[0];
	if (!sheet) throw new Error('No worksheet found. Use the downloadable template.');
	if (sheet.actualRowCount > MAX_LABELS + 1) throw new Error('Import at most 1,000 labels at a time.');

	const columns = new Map<string, number>();
	sheet.getRow(1).eachCell((cell, column) => {
		const name = cellText(cell.value).trim().toUpperCase();
		if (!['BARCODE', 'LABEL', 'QUANTITY'].includes(name)) return;
		if (columns.has(name)) throw new Error(`Duplicate ${name} header. Keep one column per field.`);
		columns.set(name, column);
	});
	const barcodeColumn = columns.get('BARCODE');
	if (!barcodeColumn) throw new Error('Add a BARCODE header in row 1, or use the downloadable template.');
	const records: BarcodeRecord[] = [];
	let count = 0;
	sheet.eachRow((row, number) => {
		if (number === 1) return;
		const barcode = barcodeText(row.getCell(barcodeColumn), number);
		let label: string;
		let quantityText: string;
		try {
			label = columns.has('LABEL') ? cellText(row.getCell(columns.get('LABEL')!).value).trim() : '';
			quantityText = columns.has('QUANTITY') ? cellText(row.getCell(columns.get('QUANTITY')!).value).trim() : '';
		} catch {
			throw new Error(`Row ${number}: use plain text for LABEL and a whole number for QUANTITY.`);
		}
		if (!barcode.trim() && !label && !quantityText) return;
		if (!barcode.trim()) throw new Error(`Row ${number}: BARCODE is required.`);
		if (!/^[\x20-\x7E]+$/.test(barcode)) {
			throw new Error(`Row ${number}: Code 128 requires printable ASCII letters, numbers, or symbols.`);
		}
		if (barcode.length > 80) throw new Error(`Row ${number}: use a barcode of 80 characters or fewer.`);
		if (label.length > 60 || /[\r\n]/.test(label)) {
			throw new Error(`Row ${number}: keep LABEL on one line with 60 characters or fewer.`);
		}
		const quantity = quantityText === '' ? 1 : Number(quantityText);
		if (!/^\d+$/.test(quantityText || '1') || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_LABELS) {
			throw new Error(`Row ${number}: QUANTITY must be a whole number from 1 to 1,000.`);
		}
		count += quantity;
		if (count > MAX_LABELS) throw new Error('Import at most 1,000 labels at a time, including quantities.');
		records.push({ row: number, barcode, label, quantity });
	});
	if (!records.length) throw new Error('No barcode values found. Add your data below the header row.');
	return records;
}

export async function createBarcodeTemplate(): Promise<Uint8Array<ArrayBuffer>> {
	const ExcelJS = (await import('exceljs')).default;
	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'AccounTech';
	const sheet = workbook.addWorksheet('BARCODES', { views: [{ state: 'frozen', ySplit: 1 }] });
	sheet.columns = [
		{ header: 'BARCODE', key: 'barcode', width: 30, style: { numFmt: '@' } },
		{ header: 'LABEL', key: 'label', width: 38 },
		{ header: 'QUANTITY', key: 'quantity', width: 14, style: { numFmt: '0' } }
	];
	sheet.addRows([
		['000012345678', 'Sample item — replace this row', 1],
		['SKU-0001', 'Another sample item', 2],
		['ASSET-2026-001', 'Sample asset', 1]
	]);
	sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
	sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF225F8A' } };
	sheet.getRow(1).height = 26;
	sheet.autoFilter = 'A1:C1';
	const instructions = workbook.addWorksheet('Instructions');
	instructions.getColumn(1).width = 110;
	for (const instruction of [
		'AccounTech Barcode Generator — Excel template',
		'Replace the three sample rows on BARCODES with your own data. Keep the row 1 headers.',
		'BARCODE (required): printable ASCII letters, numbers, and symbols, up to 80 characters.',
		'Keep the BARCODE column formatted as Text BEFORE typing or pasting. This preserves leading zeroes and long values.',
		'If Excel has already removed zeroes or rounded a value, re-enter the original value as text. Formatting cannot restore lost digits.',
		'Paste values only. Formula cells, dates, and links are not accepted as barcode values.',
		'LABEL (optional): a short description, up to 60 characters on one line.',
		'QUANTITY (optional): number of copies, a whole number from 1 to 1,000. A blank cell means one copy.',
		'Limit: 1,000 labels per import, including all quantities. Save as .xlsx (maximum 10 MB).',
		'Import the workbook at accountech.dev/apps/barcode-generator. The BARCODES sheet is read, or the first sheet if absent.',
		'Before printing, choose A4, Letter, or Legal paper, margins in millimetres or inches, portrait/landscape, and one to three columns.',
		'Longer barcodes need wider labels. Use fewer columns, smaller margins, or landscape orientation.',
		'Open the generated PDF and print at Actual size / 100%. These are cut-out labels, not a specific adhesive-sheet template.',
		'Excel import and PDF generation run in your browser. Your workbook is not uploaded.'
	]) instructions.addRow([instruction]);
	instructions.getRow(1).font = { bold: true, size: 16 };
	return new Uint8Array(await workbook.xlsx.writeBuffer());
}
