import type { ActionType, CalendarDay } from "$lib/types/tax-calendar";

export const JANUARY: CalendarDay[] = [
  {
    date: "2026-01-01",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers - December 16-31, 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs - Fiscal Year beginning March 1, 2026",
      },
    ],
  },
  {
    date: "2026-01-05",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC) - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2000"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return) - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2000", "2000-OT"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions) - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-08",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles - Month of December 2025",
      },
      {
        action: "e-SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "e-SUBMISSION of Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-10",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative - Month of December 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill - Month of December 2025",
      },
      {
        action: "e-SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "e-SUBMISSION of Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2200-M"],
        description:
          "e-FILING & PAYMENT/REMITTANCE (Online/Manual) of BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2200-C"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1600-PT", "1600-VT"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1606"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt) - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1600-PT", "1600-VT"],
        description:
          "e-FILING & e-PAYMENT/REMITTANCE of BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) - National Government Agencies (NGAs) - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-11",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-FILING of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-12",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-FILING of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group D - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-13",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-FILING of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group C - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-14",
    deadlines: [
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-FILING of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group B - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-15",
    deadlines: [
      {
        action: "REGISTRATION" as ActionType,
        formNumbers: [],
        description:
          "REGISTRATION (Online thru ORUS or Manual) of Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records - Calendar Year ending December 31, 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Notarized Income Payee's Sworn Declaration of Gross Sales with required attachments of Individuals to the Payor or Withholding Agent (Annex B1 for Several Income Payors and Annex B2 for Lone Income Payor) - Calendar Year 2026",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of the List of Medical Practitioners - For the Quarter ending December 31, 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Quarterly List (with Monthly Breakdown) of Contractors (Annex A-3) of Gov't. Contracts entered into by the Provinces/Cities/Municipalities/Barangays - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - Non-eFPS Filers - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2200-M"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2200-M (Excise Tax Return for Mineral Products) - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1702-RT", "1702-EX", "1702-MX"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1702-RT/1702-EX/1702-MX - Fiscal Year ending September 30, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1707-A"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers - Fiscal Year ending September 30, 2025",
      },
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-FILING of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group A - Month of December 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-FILING & e-PAYMENT/REMITTANCE of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs) - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-16",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers - January 1-15, 2026",
      },
    ],
  },
  {
    date: "2026-01-20",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Quarterly Information on OCWs or OFWs Remittances Exempt from DST furnished by the Local Banks and Non-Bank Money Transfer Agents - For the Quarter ending December 31, 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Quarterly Report of Printer - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1600-WP"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1600-WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Racetrack Operators) - eFPS & Non-eFPS Filers - Month of December 2025",
      },
      {
        action: "e-PAYMENT" as ActionType,
        formNumbers: ["1601-C"],
        description:
          "e-PAYMENT of BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E, D, C, B & A - Month of December 2025",
      },
    ],
  },
  {
    date: "2026-01-25",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2550Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2551Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["2550-DS"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider) - For the Quarter ending December 31, 2025",
      },
    ],
  },
  {
    date: "2026-01-29",
    deadlines: [
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1702Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT) - Fiscal Quarter ending November 30, 2025",
      },
    ],
  },
  {
    date: "2026-01-30",
    deadlines: [
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: ["1702-RT", "1702-EX", "1702-MX", "1709"],
        description:
          "SUBMISSION of Proof of e-Filed BIR Form 1702-RT/1702-EX/1702-MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS) - Fiscal Year ending September 30, 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of the Soft Copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with a Notarized Sworn Declaration - Calendar Year ending December 31, 2025",
      },
      {
        action: "e-SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "e-SUBMISSION of Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "ONLINE REGISTRATION" as ActionType,
        formNumbers: [],
        description:
          "ONLINE REGISTRATION (thru ORUS) of Computerized Books of Accounts and Other Accounting Records - Calendar Year ending December 31, 2025",
      },
    ],
  },
  {
    date: "2026-01-31",
    deadlines: [
      {
        action: "DISTRIBUTION" as ActionType,
        formNumbers: ["2316"],
        description:
          "DISTRIBUTION of BIR Form 2316 (Certificate of Compensation Payment/Tax Withheld - For Compensation Payment With or Without Tax Withheld) to the Employees - Calendar Year 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Sworn Declaration of Motels & Other Similar Establishments - Taxable Year 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Sworn Statement by Senior Citizens whose Annual Income does not exceed the poverty level as determined by NEDA thru the NSCB - Taxable Year 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Annual Information by all Accredited Tax Agents/Practitioners to be submitted to RNAB/RRAB - Taxable Year 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Annual Alphabetical List of Professionals/Persons who were issued Professional/Occupational Tax Receipt (PTR/OTR) by LGUs (Annex A-2) - Calendar Year ending December 31, 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Sworn Certification from the International Carrier stating that there is no change in the Domestic Laws of its Home Country Granting Income Tax Exemption to Philippine Carriers - Calendar Year 2026 for Exemptions issued in 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Notarized Income Payor/Withholding Agent's Sworn Declaration with List of Payees Not Subjected To Withholding Tax (Annex B1 for Several Income Payors and Annex B2 for Lone Income Payor) - Calendar Year 2026",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Contract of Lease and Lessee Information Statement and Other Attachments by Lessors/Sub-Lessors of Commercial Establishments, Buildings or Spaces for Tenants - 2nd Semester of 2025",
      },
      {
        action: "SUBMISSION" as ActionType,
        formNumbers: [],
        description:
          "SUBMISSION of Sworn Statement by every Lessee/Concessionaire/Owner/Operator of Mines or Quarry/Processor of Minerals/Producers or Manufacturers of Mineral Products - 2nd Semester of 2025",
      },
      {
        action: "e-FILING" as ActionType,
        formNumbers: ["1604-C", "1604-F"],
        description:
          "e-FILING of BIR Form 1604-C (Annual Information Return of Income Taxes Withheld on Compensation) and/or BIR Form 1604-F (Annual Information Return of Income Payments Subjected to Final Withholding Taxes) and Related Alphalist - Calendar Year 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1601-EQ"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1601-EQ (Quarterly Remittance Return of Creditable Income Taxes Withheld-Expanded) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1601-FQ"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1601-FQ (Quarterly Remittance Return of Final Income Taxes Withheld) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1602Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1602Q (Quarterly Remittance Return of Final Taxes Withheld on Interest Paid on Deposits and Yield on Deposit Substitutes/Trusts/Etc.) - eFPS & Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1603Q"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1603Q (Quarterly Remittance Return of Final Income Taxes Withheld on Fringe Benefits Paid to Employees Other Than Rank and File) - eFPS & Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
      {
        action: "e-FILING & PAYMENT" as ActionType,
        formNumbers: ["1621"],
        description:
          "e-FILING & PAYMENT (Online/Manual) of BIR Form 1621 (Quarterly Remittance Return of Tax Withheld on the Amount Withdrawn from Decedent's Deposit Account) - eFPS & Non-eFPS Filers - For the Quarter ending December 31, 2025",
      },
    ],
  },
];
