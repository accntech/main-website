# Barcode generator

Open `/apps/barcode-generator` from the Apps directory. Excel import and pdfmake generation run in the browser; no workbook data is sent to the server.

## Workbook format

The app reads the `BARCODES` worksheet (or the first worksheet), with headers in row 1:

| Column | Purpose |
| --- | --- |
| `BARCODE` | Required Code 128 value. Store as Text to preserve leading zeroes and long identifiers. |
| `LABEL` | Optional description, up to 60 characters. |
| `QUANTITY` | Optional whole-number copy count; defaults to 1. |

Imports accept `.xlsx` files up to 10 MB and 1,000 total labels. Formula cells and potentially rounded numeric identifiers are rejected. A simple Excel zero mask such as `000000` is preserved. Values must fit the selected label width at a minimum narrow-bar width of 0.75 points; ten-module quiet zones are reserved on both sides.

The downloadable file is `static/barcode-template.xlsx`. Regenerate it after changing the template instructions or examples:

```sh
bun run barcode:template
```

## Printing

Both PDF actions open a Page Settings dialog. Custom select and number-input components support A4, Letter, or Legal; portrait or landscape; individual margins in millimetres or inches; 1–3 columns; and optional cut lines. Switching units preserves the physical margin values. Labels are 35 mm high with 3 mm gaps. Print the PDF at Actual size / 100%. The layout is intended for cut-out labels, rather than a named adhesive-sheet product.

`src/lib/client/pdf/client.ts` follows PCSTI ERP's lazy, cached pdfmake initialization and `getBuffer()` flow. Roboto fonts are bundled in the virtual file system. Barcode bars remain vectors in the PDF, and the page preview and PDF share the same positioning calculations.

Run validation with `bun run test`, `bun run check`, and `bun run build`. The test script uses Node's native TypeScript support (Node 22.18+).
