export type ActionType =
	| 'SUBMISSION'
	| 'e-FILING'
	| 'e-FILING & PAYMENT'
	| 'e-PAYMENT'
	| 'e-SUBMISSION'
	| 'REGISTRATION'
	| 'DISTRIBUTION'
	| 'ONLINE REGISTRATION';

export interface TaxDeadline {
	action: ActionType;
	formNumbers: string[];
	description: string;
}

export interface CalendarDay {
	date: string;
	deadlines: TaxDeadline[];
}

export interface Holiday {
	date: string;
	name: string;
	isSpecialWorkingDay: boolean;
}

export interface BirForm {
	formNumber: string;
	description: string;
}
