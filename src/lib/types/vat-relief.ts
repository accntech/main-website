export interface Info {
	tin: string;
	month: number;
	year: number;
	regName: string;
	lastName: string;
	firstName: string;
	middleName: string;
	tradeName: string;
	street: string;
	city: string;
	rdo: string;
	periodEnd: number;
	nonIndividual: boolean;
}

export interface SalesRecord {
	endOfMonth: Date;
	tin: string;
	regName: string;
	lastName: string;
	firstName: string;
	middleName: string;
	street: string;
	city: string;
	exempt: number;
	zeroRated: number;
	netTaxable: number;
	vat: number;
}

export interface PurchaseRecord {
	endOfMonth: Date;
	tin: string;
	regName: string;
	lastName: string;
	firstName: string;
	middleName: string;
	street: string;
	city: string;
	exempt: number;
	zeroRated: number;
	service: number;
	capitalGoods: number;
	otherGoods: number;
	inputTax: number;
	nonCreditable: number;
}

export interface ExcelData {
	info: Info;
	sales: SalesRecord[];
	purchases: PurchaseRecord[];
}

export interface GeneratedFile {
	name: string;
	content: string | Uint8Array;
	path: string;
}
