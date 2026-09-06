import { writeFile } from 'node:fs/promises';
import { createBarcodeTemplate } from '../src/lib/utils/barcodes/excel.ts';

await writeFile(new URL('../static/barcode-template.xlsx', import.meta.url), await createBarcodeTemplate());
console.log('Created static/barcode-template.xlsx');
