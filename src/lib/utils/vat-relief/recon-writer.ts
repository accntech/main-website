import type { ExcelData, Info, SalesRecord, PurchaseRecord } from '$lib/types/vat-relief';
import { strip, buildFullName, formatDate, getEndOfMonth, quarterRangeString, datesEqual } from './helpers';

type Worksheet = import('exceljs').Worksheet;

const CURRENCY_FMT = '###,###,###,##0.00';
const FONT_SIZE = 10;

function setBoldRange(sheet: Worksheet, startRow: number, endRow: number, startCol: number, endCol: number) {
	for (let r = startRow; r <= endRow; r++) {
		for (let c = startCol; c <= endCol; c++) {
			sheet.getCell(r, c).font = { bold: true, size: FONT_SIZE };
		}
	}
}

function writeSalesSheet(sheet: Worksheet, info: Info, sales: SalesRecord[]) {
	sheet.getColumn('A').width = 10;
	sheet.getColumn('B').width = 13;
	sheet.getColumn('C').width = 35;
	sheet.getColumn('D').width = 35;
	sheet.getColumn('E').width = 40;
	for (const col of ['F', 'G', 'H', 'I', 'J', 'K']) {
		sheet.getColumn(col).width = 14;
	}

	sheet.getCell('A1').value = 'SALES TRANSACTION';
	sheet.getCell('A2').value = 'RECONCILIATION OF LISTING FOR ENFORCEMENT';
	sheet.getCell('A6').value = `TIN : ${strip(info.tin)}`;

	const name = info.nonIndividual
		? info.regName
		: buildFullName(info.lastName, info.firstName, info.middleName);
	sheet.getCell('A7').value = `OWNER'S NAME: ${name}`;
	sheet.getCell('A8').value = `OWNER'S TRADE NAME : ${info.tradeName}`;

	const address = info.city ? `${info.street} ${info.city}` : info.street;
	sheet.getCell('A9').value = `OWNER'S ADDRESS : ${address}`;

	sheet.getCell('A11').value = 'TAXABLE';
	sheet.getCell('B11').value = 'TAXPAYER';
	sheet.getCell('C11').value = 'REGISTERED NAME';
	sheet.getCell('D11').value = 'NAME OF CUSTOMER';
	sheet.getCell('E11').value = "CUSTOMER'S ADDRESS";
	for (const col of ['F', 'G', 'H', 'I', 'J', 'K']) {
		sheet.getCell(`${col}11`).value = 'AMOUNT OF';
	}

	sheet.getCell('A12').value = 'MONTH';
	sheet.getCell('B12').value = 'IDENTIFICATION';
	sheet.getCell('D12').value = '(Last Name, First Name, Middle Name)';
	sheet.getCell('F12').value = 'GROSS SALES';
	sheet.getCell('G12').value = 'EXEMPT SALES';
	sheet.getCell('H12').value = 'ZERO-RATED SALES';
	sheet.getCell('I12').value = 'TAXABLE SALES';
	sheet.getCell('J12').value = 'OUTPUT TAX';
	sheet.getCell('K12').value = 'GROSS TAXABLE SALES';

	sheet.getCell('B13').value = 'NUMBER';

	const colNums = ['(1)', '(2)', '(3)', '(4)', '(5)', '(6)', '(7)', '(8)', '(9)', '(10)', '(11)'];
	const colLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
	colNums.forEach((num, idx) => {
		sheet.getCell(`${colLetters[idx]}14`).value = num;
	});

	setBoldRange(sheet, 1, 14, 1, 11);

	let row = 15;
	for (const item of sales) {
		const fullName = buildFullName(item.lastName, item.firstName, item.middleName);
		sheet.getCell(`A${row}`).value = formatDate(item.endOfMonth, 'MM/dd/yyyy');
		sheet.getCell(`B${row}`).value = !item.tin ? '   -   -   ' : item.tin.slice(0, 11);
		sheet.getCell(`C${row}`).value = item.regName;
		sheet.getCell(`D${row}`).value = fullName;
		sheet.getCell(`E${row}`).value = `${item.street} ${item.city}`;
		sheet.getCell(`F${row}`).value = item.exempt + item.zeroRated + item.netTaxable;
		sheet.getCell(`G${row}`).value = item.exempt;
		sheet.getCell(`H${row}`).value = item.zeroRated;
		sheet.getCell(`I${row}`).value = item.netTaxable;
		sheet.getCell(`J${row}`).value = item.vat;
		sheet.getCell(`K${row}`).value = item.netTaxable + item.vat;

		for (const col of ['F', 'G', 'H', 'I', 'J', 'K']) {
			const cell = sheet.getCell(`${col}${row}`);
			cell.numFmt = CURRENCY_FMT;
			cell.font = { size: FONT_SIZE };
		}
		for (const col of ['A', 'B', 'C', 'D', 'E']) {
			sheet.getCell(`${col}${row}`).font = { size: FONT_SIZE };
		}

		row++;
	}

	const totalRow = row + 2;
	sheet.getCell(`A${totalRow}`).value = 'Grand Total :';
	sheet.getCell(`A${totalRow}`).font = { bold: true, size: FONT_SIZE };
	for (const col of ['F', 'G', 'H', 'I', 'J', 'K']) {
		const cell = sheet.getCell(`${col}${totalRow}`);
		cell.value = { formula: `SUM(${col}15:${col}${row - 1})` };
		cell.numFmt = CURRENCY_FMT;
		cell.font = { bold: true, size: FONT_SIZE };
	}

	sheet.getCell(`A${totalRow + 2}`).value = 'END OF REPORT';
	sheet.getCell(`A${totalRow + 2}`).font = { size: FONT_SIZE };
}

function writePurchasesSheet(sheet: Worksheet, info: Info, purchases: PurchaseRecord[]) {
	sheet.getColumn('A').width = 10;
	sheet.getColumn('B').width = 13;
	sheet.getColumn('C').width = 35;
	sheet.getColumn('D').width = 35;
	sheet.getColumn('E').width = 40;
	for (const col of ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']) {
		sheet.getColumn(col).width = 14;
	}

	sheet.getCell('A1').value = 'PURCHASE TRANSACTION';
	sheet.getCell('A2').value = 'RECONCILIATION OF LISTING FOR ENFORCEMENT';
	sheet.getCell('A6').value = `TIN : ${strip(info.tin)}`;

	const name = info.nonIndividual
		? info.regName
		: buildFullName(info.lastName, info.firstName, info.middleName);
	sheet.getCell('A7').value = `OWNER'S NAME: ${name}`;
	sheet.getCell('A8').value = `OWNER'S TRADE NAME : ${info.tradeName}`;

	const address = info.city ? `${info.street} ${info.city}` : info.street;
	sheet.getCell('A9').value = `OWNER'S ADDRESS : ${address}`;

	sheet.getCell('A11').value = 'TAXABLE';
	sheet.getCell('B11').value = 'TAXPAYER';
	sheet.getCell('C11').value = 'REGISTERED NAME';
	sheet.getCell('D11').value = 'NAME OF SUPPLIER';
	sheet.getCell('E11').value = "SUPPLIER'S ADDRESS";
	for (const col of ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']) {
		sheet.getCell(`${col}11`).value = 'AMOUNT OF';
	}

	sheet.getCell('A12').value = 'MONTH';
	sheet.getCell('B12').value = 'IDENTIFICATION';
	sheet.getCell('D12').value = '(Last Name, First Name, Middle Name)';
	sheet.getCell('F12').value = 'GROSS PURCHASES';
	sheet.getCell('G12').value = 'EXEMPT PURCHASES';
	sheet.getCell('H12').value = 'ZERO-RATED PURCHASES';
	sheet.getCell('I12').value = 'TAXABLE PURCHASES';
	sheet.getCell('J12').value = 'PURCHASE OF SERVICES';
	sheet.getCell('K12').value = 'PURCHASE OF CAPITAL GOODS';
	sheet.getCell('L12').value = 'PURCHASE OF GOODS OTHER THAN CAPITAL GOODS';
	sheet.getCell('M12').value = 'INPUT TAX';
	sheet.getCell('N12').value = 'GROSS TAXABLE PURCHASE';

	sheet.getCell('B13').value = 'NUMBER';

	const colNums14 = ['(1)','(2)','(3)','(4)','(5)','(6)','(7)','(8)','(9)','(10)','(11)','(12)','(13)','(14)'];
	const colLetters14 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];
	colNums14.forEach((num, idx) => {
		sheet.getCell(`${colLetters14[idx]}14`).value = num;
	});

	setBoldRange(sheet, 1, 14, 1, 14);

	let row = 15;
	for (const item of purchases) {
		const fullName = buildFullName(item.lastName, item.firstName, item.middleName);
		sheet.getCell(`A${row}`).value = formatDate(item.endOfMonth, 'MM/dd/yyyy');
		sheet.getCell(`B${row}`).value = item.tin.slice(0, 11);
		sheet.getCell(`C${row}`).value = item.regName;
		sheet.getCell(`D${row}`).value = fullName;
		sheet.getCell(`E${row}`).value = `${item.street} ${item.city}`;
		sheet.getCell(`F${row}`).value = item.exempt + item.zeroRated + item.service + item.capitalGoods + item.otherGoods;
		sheet.getCell(`G${row}`).value = item.exempt;
		sheet.getCell(`H${row}`).value = item.zeroRated;
		sheet.getCell(`I${row}`).value = item.service + item.capitalGoods + item.otherGoods;
		sheet.getCell(`J${row}`).value = item.service;
		sheet.getCell(`K${row}`).value = item.capitalGoods;
		sheet.getCell(`L${row}`).value = item.otherGoods;
		sheet.getCell(`M${row}`).value = item.inputTax;
		sheet.getCell(`N${row}`).value = item.service + item.capitalGoods + item.otherGoods + item.inputTax;

		for (const col of ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']) {
			const cell = sheet.getCell(`${col}${row}`);
			cell.numFmt = CURRENCY_FMT;
			cell.font = { size: FONT_SIZE };
		}
		for (const col of ['A', 'B', 'C', 'D', 'E']) {
			sheet.getCell(`${col}${row}`).font = { size: FONT_SIZE };
		}

		row++;
	}

	const totalRow = row + 2;
	sheet.getCell(`A${totalRow}`).value = 'Grand Total :';
	sheet.getCell(`A${totalRow}`).font = { bold: true, size: FONT_SIZE };
	for (const col of ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']) {
		const cell = sheet.getCell(`${col}${totalRow}`);
		cell.value = { formula: `SUM(${col}15:${col}${row - 1})` };
		cell.numFmt = CURRENCY_FMT;
		cell.font = { bold: true, size: FONT_SIZE };
	}

	sheet.getCell(`A${totalRow + 2}`).value = 'END OF REPORT';
	sheet.getCell(`A${totalRow + 2}`).font = { size: FONT_SIZE };
}

export async function writeReconReport(data: ExcelData): Promise<{ buffer: Uint8Array; filename: string }> {
	const ExcelJS = (await import('exceljs')).default;
	const workbook = new ExcelJS.Workbook();

	const salesSheet = workbook.addWorksheet('SALES');
	const purchasesSheet = workbook.addWorksheet('PURCHASES');

	const { info, sales, purchases } = data;

	const months = [
		getEndOfMonth(info.year, info.month),
		getEndOfMonth(info.year, info.month + 1),
		getEndOfMonth(info.year, info.month + 2)
	];

	const sortedSales: SalesRecord[] = [];
	const sortedPurchases: PurchaseRecord[] = [];

	for (const month of months) {
		const monthSales = sales
			.filter((s) => datesEqual(s.endOfMonth, month))
			.sort((a, b) => {
				const tinCmp = a.tin.localeCompare(b.tin);
				if (tinCmp !== 0) return tinCmp;
				const regCmp = a.regName.localeCompare(b.regName);
				if (regCmp !== 0) return regCmp;
				return a.lastName.localeCompare(b.lastName);
			});
		sortedSales.push(...monthSales);

		const monthPurchases = purchases
			.filter((p) => datesEqual(p.endOfMonth, month))
			.sort((a, b) => {
				const regCmp = a.regName.localeCompare(b.regName);
				if (regCmp !== 0) return regCmp;
				return a.lastName.localeCompare(b.lastName);
			});
		sortedPurchases.push(...monthPurchases);
	}

	writeSalesSheet(salesSheet, info, sortedSales);
	writePurchasesSheet(purchasesSheet, info, sortedPurchases);

	const arrayBuffer = await workbook.xlsx.writeBuffer();
	const filename = `${quarterRangeString(info.month, info.year)}.xlsx`;
	return { buffer: new Uint8Array(arrayBuffer as ArrayBuffer), filename };
}
