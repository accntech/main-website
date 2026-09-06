import { test } from 'node:test';
import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
import { readBarcodeWorkbook, createBarcodeTemplate } from '../src/lib/utils/barcodes/excel.ts';
import { layoutBarcodes, getSheetLayout, encodeBarcode } from '../src/lib/utils/barcodes/layout.ts';
import { barcodeDocument } from '../src/lib/client/pdf/barcodes.ts';

async function workbook(rows: unknown[][], format?: string) {
	const book = new ExcelJS.Workbook();
	const sheet = book.addWorksheet('BARCODES');
	for (const row of rows) sheet.addRow(row);
	if (format) sheet.getCell('A2').numFmt = format;
	return new Uint8Array(await book.xlsx.writeBuffer()).buffer;
}

test('imports text and zero-formatted numbers without losing leading zeroes', async () => {
	const data = await workbook([
		['BARCODE', 'LABEL', 'QUANTITY'],
		[123, 'Numeric with a mask', 2],
		['00001234567890123456', 'Long text', 1],
		[],
		['SKU-001', '', null]
	], '000000');
	assert.deepEqual(await readBarcodeWorkbook(data), [
		{ row: 2, barcode: '000123', label: 'Numeric with a mask', quantity: 2 },
		{ row: 3, barcode: '00001234567890123456', label: 'Long text', quantity: 1 },
		{ row: 5, barcode: 'SKU-001', label: '', quantity: 1 }
	]);
});

test('finds columns by header and accepts a barcode-only workbook', async () => {
	assert.deepEqual(await readBarcodeWorkbook(await workbook([
		[' quantity ', 'barcode', 'Label'], [3, ' A-001 ', 'Widget']
	])), [{ row: 2, barcode: ' A-001 ', label: 'Widget', quantity: 3 }]);
	assert.equal((await readBarcodeWorkbook(await workbook([['BARCODE'], ['123']])))[0].quantity, 1);
});

test('rejects invalid workbooks and reports the offending row', async () => {
	for (const [rows, message] of [
		[[['VALUE'], ['123']], /BARCODE.*header/i],
		[[['BARCODE', 'BARCODE'], ['1', '2']], /duplicate/i],
		[[['BARCODE']], /no barcode/i],
		[[['BARCODE', 'LABEL'], ['', 'Missing code']], /row 2.*barcode/i],
		[[['BARCODE'], ['café']], /row 2.*ASCII/i],
		[[['BARCODE'], [1234567890123456]], /row 2.*text/i],
		[[['BARCODE'], [{ formula: '1+1', result: 2 }]], /row 2.*formula/i],
		[[['BARCODE'], [new Date('2026-01-01')]], /row 2.*text/i],
		[[['BARCODE', 'QUANTITY'], ['123', 0]], /row 2.*quantity/i],
		[[['BARCODE', 'QUANTITY'], ['123', 1.5]], /row 2.*quantity/i],
		[[['BARCODE', 'QUANTITY'], ['123', '2abc']], /row 2.*quantity/i],
		[[['BARCODE', 'QUANTITY'], ['123', 1000], ['456', 1]], /1,000 labels/i]
	] as [unknown[][], RegExp][]) {
		await assert.rejects(readBarcodeWorkbook(await workbook(rows)), message);
	}
	await assert.rejects(readBarcodeWorkbook(new Uint8Array([1, 2, 3]).buffer), /valid.*xlsx/i);
});

test('downloadable template round-trips and formats the barcode column as text', async () => {
	const bytes = await createBarcodeTemplate();
	const book = new ExcelJS.Workbook();
	await book.xlsx.load(new Uint8Array(bytes).buffer);
	assert.equal(book.getWorksheet('BARCODES')!.getColumn(1).numFmt, '@');
	const records = await readBarcodeWorkbook(new Uint8Array(bytes).buffer);
	assert.equal(records[0].barcode, '000012345678');
	assert.equal(records.length, 3);
	assert.ok(book.getWorksheet('Instructions'));
});

const settings = { paper: 'A4', columns: 2, guides: true } as const;
const record = { row: 2, barcode: '000123456789', label: 'Test item', quantity: 15 };

test('paginates quantities in order and keeps every label inside the printable area', () => {
	for (const paper of ['A4', 'LETTER'] as const) {
		for (const columns of [1, 2, 3] as const) {
			const sheet = getSheetLayout({ paper, columns });
			const pages = layoutBarcodes([record], { paper, columns });
			assert.equal(pages.flat().length, 15);
			assert.equal(pages.length, Math.ceil(15 / sheet.perPage));
			assert.ok(pages[0].length <= sheet.perPage);
			for (const label of pages.flat()) {
				assert.equal(label.barcode, record.barcode);
				assert.ok(label.x >= sheet.margins.left && label.y >= sheet.margins.top);
				assert.ok(label.x + sheet.labelWidth <= sheet.width - sheet.margins.right + 0.01);
				assert.ok(label.y + sheet.labelHeight <= sheet.height - sheet.margins.bottom + 0.01);
			}
		}
	}
});

test('retains Code 128 quiet zones and rejects codes too dense for the selected labels', () => {
	const encoding = encodeBarcode('000123456789');
	assert.ok(encoding.bars.length > 0);
	assert.ok(encoding.bars[0].x >= 10);
	const last = encoding.bars.at(-1)!;
	assert.ok(encoding.width - last.x - last.width >= 10);
	assert.throws(() => layoutBarcodes([{ ...record, barcode: 'A'.repeat(48) }], settings), /row 2.*wider/i);
	assert.equal(layoutBarcodes([{ ...record, barcode: 'A'.repeat(48), quantity: 1 }], { paper: 'A4', columns: 1 }).length, 1);
});

test('creates a vector PDF definition with explicit page breaks and readable values', () => {
	const doc = barcodeDocument([record], settings);
	assert.equal(doc.pageSize, 'A4');
	const content = doc.content as { pageBreak?: string }[];
	assert.equal(content.length, 2);
	assert.equal(content[1].pageBreak, 'before');
	const json = JSON.stringify(doc);
	assert.ok(json.includes('000123456789'));
	assert.ok(json.includes('Test item'));
	assert.ok(json.includes('canvas'));
	assert.ok(!json.includes('data:image'));
});

test('applies paper size, landscape orientation, and each page margin to PDF layout', () => {
	const custom = {
		...settings, paper: 'LEGAL' as const, orientation: 'landscape' as const,
		margins: { top: 15, right: 20, bottom: 25, left: 30 }
	};
	const sheet = getSheetLayout(custom);
	assert.equal(sheet.width, 1008);
	assert.equal(sheet.height, 612);
	const pages = layoutBarcodes([record], custom);
	assert.ok(Math.abs(pages[0][0].x - 30 * 72 / 25.4) < 0.001);
	assert.ok(Math.abs(pages[0][0].y - 15 * 72 / 25.4) < 0.001);
	for (const label of pages.flat()) {
		assert.ok(label.x + sheet.labelWidth <= sheet.width - 20 * 72 / 25.4 + 0.01);
		assert.ok(label.y + sheet.labelHeight <= sheet.height - 25 * 72 / 25.4 + 0.01);
	}
	const doc = barcodeDocument([record], custom);
	assert.equal(doc.pageSize, 'LEGAL');
	assert.equal(doc.pageOrientation, 'landscape');
});

test('rejects invalid margins before creating a document', () => {
	for (const top of [-1, NaN, Infinity, 51]) {
		assert.throws(() => getSheetLayout({ ...settings, margins: { top, right: 10, bottom: 10, left: 10 } }), /margin/i);
	}
});

test('fits long descriptions into two lines without entering neighbouring labels', () => {
	const sheet = getSheetLayout({ ...settings, columns: 3 });
	const [label] = layoutBarcodes([{ ...record, label: 'W'.repeat(60), quantity: 1 }], { ...settings, columns: 3 })[0];
	assert.equal(label.labelLines.join(''), 'W'.repeat(60));
	assert.ok(label.labelLines.length <= 2);
	for (const line of label.labelLines) assert.ok(line.length * label.labelFontSize <= sheet.labelWidth - 16 + 0.01);
});

test('wraps product descriptions at word boundaries in the preview layout and PDF', () => {
	for (const description of ['Bond Paper Letter 80gsm - 500 Sheets', 'Bond Paper Legal 80gsm - 500 Sheets']) {
		const item = { ...record, label: description, quantity: 1 };
		const [label] = layoutBarcodes([item], settings)[0];
		assert.deepEqual(label.labelLines, [description.replace(' Sheets', ''), 'Sheets']);
		const pdf = JSON.stringify(barcodeDocument([item], settings));
		for (const line of label.labelLines) assert.ok(pdf.includes(JSON.stringify(line)));
	}
});

test('keeps words intact and fits long descriptions within two lines on narrow labels', () => {
	const narrow = { ...settings, columns: 3 as const };
	const sheet = getSheetLayout(narrow);
	for (const description of ['Heavy Duty Transparent Packaging Tape 48mm x 100m', 'W'.repeat(60), '', 'Short label']) {
		const [label] = layoutBarcodes([{ ...record, label: description, quantity: 1 }], narrow)[0];
		assert.equal(label.labelLines.join(' '), description);
		assert.ok(label.labelLines.length <= 2);
		for (const line of label.labelLines) assert.ok(line.length * label.labelFontSize <= sheet.labelWidth - 16 + 0.01);
	}
});
