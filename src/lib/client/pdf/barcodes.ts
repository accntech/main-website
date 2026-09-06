import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { BAR_HEIGHT, BAR_TOP, LABEL_TOP, LABEL_LINE_HEIGHT, VALUE_TOP, getSheetLayout, layoutBarcodes } from '../../utils/barcodes/layout.ts';
import type { BarcodeRecord, PrintSettings } from '../../utils/barcodes/types.ts';

export function barcodeDocument(records: BarcodeRecord[], settings: PrintSettings): TDocumentDefinitions {
	const sheet = getSheetLayout(settings);
	const pages = layoutBarcodes(records, settings);
	return {
		info: { title: 'Barcode labels', author: 'AccounTech' },
		pageSize: settings.paper,
		pageOrientation: settings.orientation ?? 'portrait',
		pageMargins: 0,
		defaultStyle: { font: 'Roboto', color: '#000000' },
		content: pages.map((labels, index) => {
			const stack: Content[] = [{ text: ' ', fontSize: 1 }];
			for (const label of labels) {
				if (settings.guides) stack.push({
					canvas: [{ type: 'rect', x: 0, y: 0, w: sheet.labelWidth, h: sheet.labelHeight, lineWidth: 0.3, lineColor: '#bbbbbb' }],
					absolutePosition: { x: label.x, y: label.y }
				});
				stack.push({
					canvas: label.encoding.bars.map((bar) => ({
						type: 'rect', x: bar.x * label.scale, y: 0,
						w: bar.width * label.scale, h: BAR_HEIGHT, color: '#000000', lineWidth: 0
					})),
					absolutePosition: { x: label.x + (sheet.labelWidth - label.barcodeWidth) / 2, y: label.y + BAR_TOP }
				});
				const textLines: [string, number, number][] = label.labelLines.map((line, i) => [line, label.y + LABEL_TOP + i * LABEL_LINE_HEIGHT, label.labelFontSize]);
				textLines.push([label.barcode, label.y + VALUE_TOP, label.valueFontSize]);
				for (const [text, y, fontSize] of textLines) {
					stack.push({
						columns: [{ text, width: sheet.labelWidth - 12, alignment: 'center', fontSize, noWrap: true, preserveLeadingSpaces: true }],
						absolutePosition: { x: label.x + 6, y }
					});
				}
			}
			return { stack, ...(index > 0 ? { pageBreak: 'before' as const } : {}) };
		})
	};
}
