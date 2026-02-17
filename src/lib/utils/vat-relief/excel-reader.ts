import type { ExcelData, Info, SalesRecord, PurchaseRecord } from '$lib/types/vat-relief';
import { cleanUp, strip, isValidTin, parseMonth, isTrue } from './helpers';

type Worksheet = import('exceljs').Worksheet;

function getCellString(sheet: Worksheet, row: number, col: number): string {
	const cell = sheet.getCell(row, col);
	const v = cell.value;
	if (v === null || v === undefined) return '';
	if (v instanceof Date) return v.toLocaleDateString('en-US');
	if (typeof v === 'object' && 'result' in v) return String(v.result ?? '');
	if (typeof v === 'object' && 'richText' in v) {
		return (v as { richText: { text: string }[] }).richText.map((r) => r.text).join('');
	}
	return String(v).trim();
}

function parseCellDate(sheet: Worksheet, row: number, col: number): Date | null {
	const cell = sheet.getCell(row, col);
	const v = cell.value;
	if (v instanceof Date) return v;
	if (typeof v === 'number') {
		const epoch = new Date(1899, 11, 30);
		return new Date(epoch.getTime() + v * 86400000);
	}
	if (typeof v === 'string') {
		const d = new Date(v);
		return isNaN(d.getTime()) ? null : d;
	}
	return null;
}

function parseCellDecimal(
	sheet: Worksheet,
	row: number,
	col: number,
	field: string,
	sheetName: string,
	rowIdx: number
): number {
	const cell = sheet.getCell(row, col);
	const v = cell.value;
	if (v === null || v === undefined || v === '') return 0;
	if (typeof v === 'number') return v;
	const str = String(v).replace(/,/g, '').trim();
	if (str === '') return 0;
	const num = parseFloat(str);
	if (isNaN(num)) {
		const colLetter = String.fromCharCode(64 + col);
		throw new Error(`Invalid [${field}] value in ${sheetName} sheet cell ${colLetter}${rowIdx}`);
	}
	return num;
}

function readInfo(sheet: Worksheet): Info {
	const tinRaw = getCellString(sheet, 2, 2);
	if (!tinRaw || !strip(tinRaw)) throw new Error('Taxpayer TIN is required in INFO sheet cell B2');

	const rdo = getCellString(sheet, 10, 2);
	if (!rdo) throw new Error('RDO is required in INFO sheet cell B10');

	const periodEndStr = getCellString(sheet, 11, 2);
	if (!periodEndStr) throw new Error('Period end is required in INFO sheet cell B11');
	const periodEnd = parseMonth(periodEndStr);
	if (periodEnd === null) throw new Error('Invalid [Period End] value in INFO sheet cell B11');

	const monthStr = getCellString(sheet, 15, 2);
	if (!monthStr) throw new Error('Starting month is required in INFO sheet cell B15');
	const month = parseMonth(monthStr);
	if (month === null) throw new Error('Invalid [Starting Month] value in INFO sheet cell B15');

	const yearStr = getCellString(sheet, 16, 2);
	if (!yearStr) throw new Error('Year is required in INFO sheet cell B16');
	const year = parseInt(yearStr, 10);
	if (isNaN(year)) throw new Error('Invalid [Year] value in INFO sheet cell B16');

	return {
		tin: strip(tinRaw),
		month,
		year,
		regName: cleanUp(getCellString(sheet, 3, 2)),
		lastName: cleanUp(getCellString(sheet, 4, 2)),
		firstName: cleanUp(getCellString(sheet, 5, 2)),
		middleName: cleanUp(getCellString(sheet, 6, 2)),
		tradeName: cleanUp(getCellString(sheet, 7, 2)),
		street: cleanUp(getCellString(sheet, 8, 2)),
		city: cleanUp(getCellString(sheet, 9, 2)),
		rdo: cleanUp(rdo),
		periodEnd,
		nonIndividual: isTrue(getCellString(sheet, 12, 2))
	};
}

function readSales(sheet: Worksheet): SalesRecord[] {
	const sales: SalesRecord[] = [];
	const lastRow = sheet.lastRow?.number ?? 1;

	for (let i = 2; i <= lastRow; i++) {
		const row = sheet.getRow(i);
		if (!row.hasValues) throw new Error(`Empty row found in SALES sheet at row ${i}`);

		const eom = parseCellDate(sheet, i, 1);
		if (!eom) {
			const raw = getCellString(sheet, i, 1);
			if (!raw) throw new Error(`MONTH_END field is required in SALES sheet cell A${i}`);
			throw new Error(`Invalid [MONTH_END] value in SALES sheet cell A${i}`);
		}

		const daysInMonth = new Date(eom.getFullYear(), eom.getMonth() + 1, 0).getDate();
		if (eom.getDate() !== daysInMonth)
			throw new Error(`Invalid [MONTH_END] value in SALES sheet cell A${i}`);

		const tin = getCellString(sheet, i, 2);
		if (tin && !isValidTin(tin))
			throw new Error(`Invalid [TIN] value in SALES sheet cell B${i}`);

		sales.push({
			endOfMonth: eom,
			tin,
			regName: cleanUp(getCellString(sheet, i, 3)),
			lastName: cleanUp(getCellString(sheet, i, 4)),
			firstName: cleanUp(getCellString(sheet, i, 5)),
			middleName: cleanUp(getCellString(sheet, i, 6)),
			street: cleanUp(getCellString(sheet, i, 7)),
			city: cleanUp(getCellString(sheet, i, 8)),
			exempt: parseCellDecimal(sheet, i, 9, 'EXEMPT', 'SALES', i),
			zeroRated: parseCellDecimal(sheet, i, 10, 'ZERO_RATED', 'SALES', i),
			netTaxable: parseCellDecimal(sheet, i, 11, 'NET_TAXABLE', 'SALES', i),
			vat: parseCellDecimal(sheet, i, 12, 'VAT', 'SALES', i)
		});
	}

	return sales;
}

function readPurchases(sheet: Worksheet, taxpayerTin: string): PurchaseRecord[] {
	const purchases: PurchaseRecord[] = [];
	const lastRow = sheet.lastRow?.number ?? 1;

	for (let i = 2; i <= lastRow; i++) {
		const row = sheet.getRow(i);
		if (!row.hasValues) throw new Error(`Empty row found in PURCHASES sheet at row ${i}`);

		const eom = parseCellDate(sheet, i, 1);
		if (!eom) {
			const raw = getCellString(sheet, i, 1);
			if (!raw) throw new Error(`MONTH_END field is required in PURCHASES sheet cell A${i}`);
			throw new Error(`Invalid [MONTH_END] value in PURCHASES sheet cell A${i}`);
		}

		const daysInMonth = new Date(eom.getFullYear(), eom.getMonth() + 1, 0).getDate();
		if (eom.getDate() !== daysInMonth)
			throw new Error(`Invalid [MONTH_END] value in PURCHASES sheet cell A${i}`);

		const tin = getCellString(sheet, i, 2);
		if (!isValidTin(tin))
			throw new Error(`Invalid [TIN] value in PURCHASES sheet cell B${i}`);

		if (strip(tin) === taxpayerTin)
			throw new Error(
				`TIN in PURCHASES sheet cell B${i} cannot be the same as the TIN of the taxpayer`
			);

		purchases.push({
			endOfMonth: eom,
			tin,
			regName: cleanUp(getCellString(sheet, i, 3)),
			lastName: cleanUp(getCellString(sheet, i, 4)),
			firstName: cleanUp(getCellString(sheet, i, 5)),
			middleName: cleanUp(getCellString(sheet, i, 6)),
			street: cleanUp(getCellString(sheet, i, 7)),
			city: cleanUp(getCellString(sheet, i, 8)),
			exempt: parseCellDecimal(sheet, i, 9, 'EXEMPT', 'PURCHASES', i),
			zeroRated: parseCellDecimal(sheet, i, 10, 'ZERO_RATED', 'PURCHASES', i),
			service: parseCellDecimal(sheet, i, 11, 'SERVICE', 'PURCHASES', i),
			capitalGoods: parseCellDecimal(sheet, i, 12, 'CAPITAL_GOODS', 'PURCHASES', i),
			otherGoods: parseCellDecimal(sheet, i, 13, 'OTHER_GOODS', 'PURCHASES', i),
			inputTax: parseCellDecimal(sheet, i, 14, 'INPUT_TAX', 'PURCHASES', i),
			nonCreditable: parseCellDecimal(sheet, i, 15, 'NON_CREDITABLE', 'PURCHASES', i)
		});
	}

	return purchases;
}

export async function readExcelTemplate(file: File): Promise<ExcelData> {
	const ExcelJS = (await import('exceljs')).default;
	const workbook = new ExcelJS.Workbook();
	const buffer = await file.arrayBuffer();
	await workbook.xlsx.load(buffer);

	const infoSheet = workbook.getWorksheet('INFO');
	if (!infoSheet) throw new Error('INFO sheet not found');

	const salesSheet = workbook.getWorksheet('SALES');
	if (!salesSheet) throw new Error('SALES sheet not found');

	const purchasesSheet = workbook.getWorksheet('PURCHASES');
	if (!purchasesSheet) throw new Error('PURCHASES sheet not found');

	const info = readInfo(infoSheet);
	const sales = readSales(salesSheet);
	const purchases = readPurchases(purchasesSheet, info.tin);

	return { info, sales, purchases };
}
