import type { ExcelData, Info, SalesRecord, PurchaseRecord, GeneratedFile } from '$lib/types/vat-relief';
import { strip, toValue, round, buildFullName, formatDate, getEndOfMonth, datesEqual } from './helpers';

function writeSalesHeader(info: Info, month: Date, items: SalesRecord[]): string {
	const registerName = info.nonIndividual ? info.regName : '';
	const lastName = info.nonIndividual ? '' : info.lastName;
	const firstName = info.nonIndividual ? '' : info.firstName;
	const middleName = info.nonIndividual ? '' : info.middleName;

	const sumExempt = items.reduce((s, i) => s + i.exempt, 0);
	const sumZeroRated = items.reduce((s, i) => s + i.zeroRated, 0);
	const sumNetTaxable = items.reduce((s, i) => s + i.netTaxable, 0);
	const sumVat = items.reduce((s, i) => s + i.vat, 0);

	return (
		`H,S,"${info.tin}",` +
		`"${registerName}","${lastName}",` +
		`"${firstName}","${middleName}",` +
		`"${info.tradeName}",` +
		`"${info.street}",` +
		`"${info.city}",` +
		`${round(sumExempt)},` +
		`${round(sumZeroRated)},` +
		`${round(sumNetTaxable)},` +
		`${round(sumVat)},` +
		`${info.rdo},` +
		`${formatDate(month, 'MM/dd/yyyy')},` +
		`${info.periodEnd}`
	);
}

function reorderSalesItems(items: SalesRecord[]): SalesRecord[] {
	const withTin = items.filter((i) => i.tin);
	const emptyTinWithReg = items.filter((i) => !i.tin && i.regName);
	const emptyTinEmptyReg = items.filter(
		(i) => !i.tin && !i.regName && buildFullName(i.lastName, i.firstName, i.middleName)
	);

	const tinGroups = new Map<string, SalesRecord>();
	for (const item of withTin) {
		const existing = tinGroups.get(item.tin);
		if (existing) {
			existing.exempt += item.exempt;
			existing.zeroRated += item.zeroRated;
			existing.netTaxable += item.netTaxable;
			existing.vat += item.vat;
		} else {
			tinGroups.set(item.tin, { ...item });
		}
	}

	const regGroups = new Map<string, SalesRecord>();
	for (const item of emptyTinWithReg) {
		const existing = regGroups.get(item.regName);
		if (existing) {
			existing.exempt += item.exempt;
			existing.zeroRated += item.zeroRated;
			existing.netTaxable += item.netTaxable;
			existing.vat += item.vat;
		} else {
			regGroups.set(item.regName, { ...item });
		}
	}

	const nameGroups = new Map<string, SalesRecord>();
	for (const item of emptyTinEmptyReg) {
		const key = buildFullName(item.lastName, item.firstName, item.middleName);
		const existing = nameGroups.get(key);
		if (existing) {
			existing.exempt += item.exempt;
			existing.zeroRated += item.zeroRated;
			existing.netTaxable += item.netTaxable;
			existing.vat += item.vat;
		} else {
			nameGroups.set(key, { ...item });
		}
	}

	const all = [...tinGroups.values(), ...regGroups.values(), ...nameGroups.values()];
	return all.sort((a, b) => {
		const tinCmp = a.tin.localeCompare(b.tin);
		if (tinCmp !== 0) return tinCmp;
		const regCmp = a.regName.localeCompare(b.regName);
		if (regCmp !== 0) return regCmp;
		return a.lastName.localeCompare(b.lastName);
	});
}

function writeSalesData(info: Info, month: Date, items: SalesRecord[]): string {
	return items
		.map(
			(item) =>
				`D,S,"${strip(item.tin)}",` +
				`"${item.regName}",` +
				`"${item.lastName}",` +
				`"${item.firstName}",` +
				`"${item.middleName}",` +
				`"${item.street}",` +
				`"${item.city}",` +
				`${toValue(item.exempt)},` +
				`${toValue(item.zeroRated)},` +
				`${toValue(item.netTaxable)},` +
				`${toValue(item.vat)},` +
				`${info.tin},` +
				`${formatDate(month, 'MM/dd/yyyy')}`
		)
		.join('\n');
}

function writePurchasesHeader(info: Info, month: Date, items: PurchaseRecord[]): string {
	const registerName = info.nonIndividual ? info.regName : '';
	const lastName = info.nonIndividual ? '' : info.lastName;
	const firstName = info.nonIndividual ? '' : info.firstName;
	const middleName = info.nonIndividual ? '' : info.middleName;

	const sumExempt = items.reduce((s, i) => s + i.exempt, 0);
	const sumZeroRated = items.reduce((s, i) => s + i.zeroRated, 0);
	const sumService = items.reduce((s, i) => s + i.service, 0);
	const sumCapitalGoods = items.reduce((s, i) => s + i.capitalGoods, 0);
	const sumOtherGoods = items.reduce((s, i) => s + i.otherGoods, 0);
	const sumInputTax = items.reduce((s, i) => s + i.inputTax, 0);
	const sumNonCreditable = items.reduce((s, i) => s + i.nonCreditable, 0);

	return (
		`H,P,"${info.tin}",` +
		`"${registerName}","${lastName}",` +
		`"${firstName}","${middleName}",` +
		`"${info.tradeName}",` +
		`"${info.street}",` +
		`"${info.city}",` +
		`${round(sumExempt)},` +
		`${round(sumZeroRated)},` +
		`${round(sumService)},` +
		`${round(sumCapitalGoods)},` +
		`${round(sumOtherGoods)},` +
		`${round(sumInputTax)},` +
		`${round(sumInputTax - sumNonCreditable)},` +
		`${round(sumNonCreditable)},` +
		`${info.rdo},` +
		`${formatDate(month, 'MM/dd/yyyy')},` +
		`${info.periodEnd}`
	);
}

function reorderPurchaseItems(items: PurchaseRecord[]): PurchaseRecord[] {
	const groups = new Map<string, PurchaseRecord>();
	for (const item of items) {
		const existing = groups.get(item.tin);
		if (existing) {
			existing.exempt += item.exempt;
			existing.zeroRated += item.zeroRated;
			existing.service += item.service;
			existing.capitalGoods += item.capitalGoods;
			existing.otherGoods += item.otherGoods;
			existing.inputTax += item.inputTax;
			existing.nonCreditable += item.nonCreditable;
		} else {
			groups.set(item.tin, { ...item });
		}
	}

	return [...groups.values()].sort((a, b) => {
		const regCmp = a.regName.localeCompare(b.regName);
		if (regCmp !== 0) return regCmp;
		return a.lastName.localeCompare(b.lastName);
	});
}

function writePurchasesData(info: Info, month: Date, items: PurchaseRecord[]): string {
	return items
		.map(
			(item) =>
				`D,P,"${strip(item.tin)}",` +
				`"${item.regName}",` +
				`"${item.lastName}",` +
				`"${item.firstName}",` +
				`"${item.middleName}",` +
				`"${item.street}",` +
				`"${item.city}",` +
				`${toValue(item.exempt)},` +
				`${toValue(item.zeroRated)},` +
				`${toValue(item.service)},` +
				`${toValue(item.capitalGoods)},` +
				`${toValue(item.otherGoods)},` +
				`${toValue(item.inputTax)},` +
				`${strip(info.tin)},` +
				`${formatDate(month, 'MM/dd/yyyy')}`
		)
		.join('\n');
}

export function generateDatFiles(data: ExcelData): GeneratedFile[] {
	const { info, sales, purchases } = data;
	const files: GeneratedFile[] = [];

	const months = [
		getEndOfMonth(info.year, info.month),
		getEndOfMonth(info.year, info.month + 1),
		getEndOfMonth(info.year, info.month + 2)
	];

	let hasData = false;

	for (const month of months) {
		const monthSales = sales.filter((s) => datesEqual(s.endOfMonth, month));
		const monthPurchases = purchases.filter((p) => datesEqual(p.endOfMonth, month));

		if (monthSales.length > 0) {
			hasData = true;
			const mm = String(month.getMonth() + 1).padStart(2, '0');
			const yyyy = String(month.getFullYear());
			const fileName = `${info.tin}S${mm}${yyyy}.DAT`;

			const header = writeSalesHeader(info, month, monthSales);
			const ordered = reorderSalesItems(monthSales);
			const detail = writeSalesData(info, month, ordered);

			files.push({
				name: fileName,
				content: header + '\n' + detail + '\n',
				path: `vat-relief-output/DAT Files/${fileName}`
			});
		}

		if (monthPurchases.length > 0) {
			hasData = true;
			const mm = String(month.getMonth() + 1).padStart(2, '0');
			const yyyy = String(month.getFullYear());
			const fileName = `${info.tin}P${mm}${yyyy}.DAT`;

			const header = writePurchasesHeader(info, month, monthPurchases);
			const ordered = reorderPurchaseItems(monthPurchases);
			const detail = writePurchasesData(info, month, ordered);

			files.push({
				name: fileName,
				content: header + '\n' + detail + '\n',
				path: `vat-relief-output/DAT Files/${fileName}`
			});
		}
	}

	if (!hasData) throw new Error('No data available for generating the files');

	return files;
}
