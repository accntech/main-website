export type BarcodeRecord = {
	row: number;
	barcode: string;
	label: string;
	quantity: number;
};

export type PrintSettings = {
	paper: 'A4' | 'LETTER' | 'LEGAL';
	orientation?: 'portrait' | 'landscape';
	margins?: { top: number; right: number; bottom: number; left: number };
	columns: 1 | 2 | 3;
	guides: boolean;
};

export const DEFAULT_PRINT_SETTINGS: PrintSettings = {
	paper: 'A4', orientation: 'portrait',
	margins: { top: 10, right: 10, bottom: 10, left: 10 },
	columns: 2, guides: true
};

export const MAX_LABELS = 1000;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
