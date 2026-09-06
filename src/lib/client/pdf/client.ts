import type { TDocumentDefinitions } from 'pdfmake/interfaces';

// Same client-only, cached bootstrap and getBuffer flow as PCSTI's ERP.
// Bundled Roboto VFS keeps label generation independent of external font requests.
async function loadPdfMake() {
	const [{ default: pdfMake }, { default: fonts }] = await Promise.all([
		import('pdfmake/build/pdfmake'),
		import('pdfmake/build/vfs_fonts')
	]);
	pdfMake.addVirtualFileSystem(fonts);
	return pdfMake;
}

let pdfMakePromise: ReturnType<typeof loadPdfMake> | null = null;

export async function printPdf(definition: TDocumentDefinitions): Promise<Uint8Array<ArrayBuffer>> {
	pdfMakePromise ??= loadPdfMake().catch((error) => {
		pdfMakePromise = null;
		throw error;
	});
	const pdfMake = await pdfMakePromise;
	const buffer = await pdfMake.createPdf(definition).getBuffer();
	return new Uint8Array(buffer);
}
