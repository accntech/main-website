import type { ActionType, CalendarDay } from "$lib/types/tax-calendar";

export const DECEMBER: CalendarDay[] = [
  {
    date: "2026-12-01",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers - November 16-30, 2026",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs - Fiscal Year beginning February 1, 2027",
      },
    ],
  },
  {
    date: "2026-12-05",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC) - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2000"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return) - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2000-OT"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions) - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-08",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles - Month of November 2026",
      },
      {
        action: "e-SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "e-SUBMISSION of Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-10",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative - Month of November 2026",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill - Month of November 2026",
      },
      {
        action: "e-SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "e-SUBMISSION of Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2200-M"],
        description:
          "e-FILING & PAYMENT/REMITTANCE (Online/Manual) of BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["0619-E", "0619-F", "1601-C"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2200-C"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1600-PT", "1600-VT"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1606"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt) - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["0620"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers - Month of November 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1600-PT", "1600-VT", "1601-C"],
        description:
          "e-FILING & e-PAYMENT/REMITTANCE of BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs) - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-11",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["0619-E", "0619-F", "1601-C"],
        description:
          "e-FILING of BIR Forms 1601-C and/or 0619-E and/or 0619-F - eFPS Filers under Group E - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-12",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["0619-E", "0619-F", "1601-C"],
        description:
          "e-FILING of BIR Forms 1601-C and/or 0619-E and/or 0619-F - eFPS Filers under Group D - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-13",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["0619-E", "0619-F", "1601-C"],
        description:
          "e-FILING of BIR Forms 1601-C and/or 0619-E and/or 0619-F - eFPS Filers under Group C - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-14",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["0619-E", "0619-F", "1601-C"],
        description:
          "e-FILING of BIR Forms 1601-C and/or 0619-E and/or 0619-F - eFPS Filers under Group B - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-15",
    deadlines: [
      {
        action: "REGISTRATION" as ActionType,
        formNumbers: [],
        description:
          "REGISTRATION (Online thru ORUS or Manual) of Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records - Fiscal Year ending November 30, 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1702-RT", "1702-EX", "1702-MX"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1702-RT/1702-EX/1702-MX - Fiscal Year ending August 31, 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1707-A"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers - Fiscal Year ending August 31, 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["0619-E", "0619-F", "1601-C"],
        description:
          "e-FILING & e-PAYMENT of BIR Forms 1601-C and/or 0619-E and/or 0619-F - eFPS Filers under Group A - Month of November 2026",
      },
      {
        action: "e-PAYMENT" as ActionType,
        formNumbers: ["0619-E", "0619-F", "1601-C"],
        description:
          "e-PAYMENT of BIR Forms 1601-C and/or 0619-E and/or 0619-F - eFPS Filers under Group E, D, C & B - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-16",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers - December 1-15, 2026",
      },
    ],
  },
  {
    date: "2026-12-20",
    deadlines: [
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1600-WP"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1600-WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Racetrack Operators) - eFPS & Non-eFPS Filers - Month of November 2026",
      },
    ],
  },
  {
    date: "2026-12-25",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers - Fiscal Quarter ending November 30, 2026",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products - Fiscal Quarter ending November 30, 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2550Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers - Fiscal Quarter ending November 30, 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2551Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers - Fiscal Quarter ending November 30, 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2550-DS"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider) - Fiscal Quarter ending November 30, 2026",
      },
    ],
  },
  {
    date: "2026-12-30",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Proof of eFiled BIR Form 1702-RT/1702-EX/1702-MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS) - Fiscal Year ending August 31, 2026",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of the Soft Copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with a Notarized Sworn Declaration - Fiscal Year ending November 30, 2026",
      },
      {
        action: "e-SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "e-SUBMISSION of Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers - Fiscal Quarter ending November 30, 2026",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1702Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT) - Fiscal Quarter ending October 31, 2026",
      },
      {
        action: "ONLINE REGISTRATION" as ActionType,
        formNumbers: [],
        description:
          "ONLINE REGISTRATION (thru ORUS) of Computerized Books of Accounts and Other Accounting Records - Fiscal Year ending November 30, 2026",
      },
    ],
  },
  {
    date: "2026-12-31",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Manufacturers'/Assemblers'/Importers' Sworn Statement of each Particular Brand/Model - 2nd Semester of 2026",
      },
    ],
  },
];
