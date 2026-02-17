import type { CalendarDay } from "$lib/types/tax-calendar";

import { JANUARY } from "./months/january";
import { FEBRUARY } from "./months/february";
import { MARCH } from "./months/march";
import { APRIL } from "./months/april";
import { MAY } from "./months/may";
import { JUNE } from "./months/june";
import { JULY } from "./months/july";
import { AUGUST } from "./months/august";
import { SEPTEMBER } from "./months/september";
import { OCTOBER } from "./months/october";
import { NOVEMBER } from "./months/november";
import { DECEMBER } from "./months/december";

export { HOLIDAYS, HOLIDAY_MAP } from "./holidays";
export { BIR_FORMS } from "./bir-forms";

export const CALENDAR_DATA: CalendarDay[] = [
  ...JANUARY,
  ...FEBRUARY,
  ...MARCH,
  ...APRIL,
  ...MAY,
  ...JUNE,
  ...JULY,
  ...AUGUST,
  ...SEPTEMBER,
  ...OCTOBER,
  ...NOVEMBER,
  ...DECEMBER,
];

export const CALENDAR_MAP = new Map<string, CalendarDay>(
  CALENDAR_DATA.map((d) => [d.date, d]),
);
