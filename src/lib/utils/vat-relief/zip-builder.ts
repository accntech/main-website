import type { Info, GeneratedFile } from '$lib/types/vat-relief';
import { quarterRangeString } from './helpers';

export async function buildZip(
	datFiles: GeneratedFile[],
	reconReport: { buffer: Uint8Array; filename: string },
	info: Info
): Promise<{ blob: Blob; filename: string }> {
	const JSZip = (await import('jszip')).default;
	const zip = new JSZip();

	const root = zip.folder('vat-relief-output')!;

	// Add DAT files
	const datFolder = root.folder('DAT Files')!;
	for (const file of datFiles) {
		datFolder.file(file.name, file.content);
	}

	// Add reconciliation report
	root.file(reconReport.filename, reconReport.buffer);

	const blob = await zip.generateAsync({ type: 'blob' });
	const zipFilename = `vat-relief-${quarterRangeString(info.month, info.year)}.zip`;
	return { blob, filename: zipFilename };
}
