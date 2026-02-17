import type { Holiday } from "$lib/types/tax-calendar";

export const HOLIDAYS: Holiday[] = [
  { date: "2026-01-01", name: "New Year's Day", isSpecialWorkingDay: false },
  { date: "2026-02-17", name: "Chinese New Year", isSpecialWorkingDay: false },
  {
    date: "2026-02-25",
    name: "EDSA Revolution Anniversary",
    isSpecialWorkingDay: true,
  },
  { date: "2026-04-02", name: "Maundy Thursday", isSpecialWorkingDay: false },
  { date: "2026-04-03", name: "Good Friday", isSpecialWorkingDay: false },
  { date: "2026-04-04", name: "Black Saturday", isSpecialWorkingDay: false },
  {
    date: "2026-04-09",
    name: "Araw ng Kagitingan",
    isSpecialWorkingDay: false,
  },
  { date: "2026-05-01", name: "Labor Day", isSpecialWorkingDay: false },
  { date: "2026-06-12", name: "Independence Day", isSpecialWorkingDay: false },
  { date: "2026-08-21", name: "Ninoy Aquino Day", isSpecialWorkingDay: false },
  {
    date: "2026-08-31",
    name: "National Heroes' Day",
    isSpecialWorkingDay: false,
  },
  { date: "2026-11-01", name: "All Saints' Day", isSpecialWorkingDay: false },
  { date: "2026-11-02", name: "All Souls' Day", isSpecialWorkingDay: false },
  { date: "2026-11-30", name: "Bonifacio Day", isSpecialWorkingDay: false },
  {
    date: "2026-12-08",
    name: "Feast of Immaculate Conception of Mary",
    isSpecialWorkingDay: false,
  },
  { date: "2026-12-24", name: "Christmas Eve", isSpecialWorkingDay: false },
  { date: "2026-12-25", name: "Christmas Day", isSpecialWorkingDay: false },
  { date: "2026-12-30", name: "Rizal Day", isSpecialWorkingDay: false },
  { date: "2026-12-31", name: "New Year's Eve", isSpecialWorkingDay: false },
];

export const HOLIDAY_MAP = new Map<string, Holiday>(
  HOLIDAYS.map((h) => [h.date, h]),
);
