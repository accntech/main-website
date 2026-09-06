<script lang="ts">
	import Icon from '@iconify/svelte';
	import { asset, resolve } from '$app/paths';
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';
	import SelectField from '$lib/components/ui/select.svelte';
	import NumberInput from '$lib/components/ui/number-input.svelte';
	import { formatMeasurement, fromMillimetres, toMillimetres, type MeasurementUnit } from '$lib/utils/measurements';
	import { BAR_HEIGHT, BAR_TOP, LABEL_TOP, LABEL_LINE_HEIGHT, VALUE_TOP, MM, getSheetLayout, layoutBarcodes } from '$lib/utils/barcodes/layout';
	import { DEFAULT_PRINT_SETTINGS, MAX_FILE_BYTES, type BarcodeRecord, type PrintSettings } from '$lib/utils/barcodes/types';

	let records = $state.raw<BarcodeRecord[]>([]);
	let filename = $state('');
	let paper = $state<PrintSettings['paper']>('A4');
	let columns = $state<PrintSettings['columns']>(2);
	let guides = $state(true);
	let orientation = $state<'portrait' | 'landscape'>('portrait');
	let margins = $state({ top: 10, right: 10, bottom: 10, left: 10 });
	let draft = $state<Required<PrintSettings>>({ ...DEFAULT_PRINT_SETTINGS, orientation: 'portrait', margins: { top: 10, right: 10, bottom: 10, left: 10 } });
	let dialogAction = $state<'settings' | 'open' | 'download'>('settings');
	let settingsDialog: HTMLDialogElement;
	let measurementUnit = $state<MeasurementUnit>('mm');
	let importing = $state(false);
	let dragging = $state(false);
	let dragDepth = 0;
	let exporting = $state<'open' | 'download' | null>(null);
	let error = $state('');
	let notice = $state('');
	let previewIndex = $state(0);
	let fileInput: HTMLInputElement;

	const samples: BarcodeRecord[] = [
		{ row: 2, barcode: '000012345678', label: 'Sample item', quantity: 2 },
		{ row: 3, barcode: 'SKU-0001', label: 'Another sample item', quantity: 2 },
		{ row: 4, barcode: 'ASSET-2026-001', label: 'Sample asset', quantity: 2 }
	];
	const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal';
	const paperOptions: { value: PrintSettings['paper']; label: string; description: string }[] = [
		{ value: 'A4', label: 'A4', description: '210 × 297 mm · 8.27 × 11.69 in' },
		{ value: 'LETTER', label: 'Letter', description: '8.5 × 11 in · 215.9 × 279.4 mm' },
		{ value: 'LEGAL', label: 'Legal', description: '8.5 × 14 in · 215.9 × 355.6 mm' }
	];
	const orientationOptions: { value: 'portrait' | 'landscape'; label: string }[] = [
		{ value: 'portrait', label: 'Portrait' }, { value: 'landscape', label: 'Landscape' }
	];
	const columnOptions = [
		{ value: '1', label: '1 column', description: 'Wide labels' },
		{ value: '2', label: '2 columns' },
		{ value: '3', label: '3 columns', description: 'Compact labels' }
	];
	const button = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${focus}`;
	let busy = $derived(importing || exporting !== null);
	let total = $derived(records.reduce((sum, record) => sum + record.quantity, 0));
	let settings = $derived({ paper, columns, guides, orientation, margins });
	let sheet = $derived(getSheetLayout(settings));
	let preview = $derived.by(() => {
		try {
			return { pages: layoutBarcodes(records.length ? records : samples, settings), error: '' };
		} catch (cause) {
			return { pages: [], error: cause instanceof Error ? cause.message : 'Unable to lay out these barcodes.' };
		}
	});
	let currentPage = $derived(Math.min(previewIndex, Math.max(0, preview.pages.length - 1)));
	let canExport = $derived(records.length > 0 && !preview.error && !busy);
	let draftLayout = $derived.by(() => {
		try {
			if (Object.values(draft.margins).some((value) => !Number.isFinite(value) || value < 0 || value > 50)) {
				throw new Error(`Each page margin must be between 0 and ${formatMeasurement(50, measurementUnit)} ${measurementUnit}.`);
			}
			const layout = getSheetLayout(draft);
			if (records.length) layoutBarcodes(records, draft);
			return { layout, error: '' };
		} catch (cause) {
			return { layout: null, error: cause instanceof Error ? cause.message : 'Check your page settings.' };
		}
	});

	function displayedMargin(side: keyof typeof margins): number | undefined {
		const value = draft.margins[side];
		return Number.isFinite(value) ? Number(formatMeasurement(value, measurementUnit)) : undefined;
	}

	function setMargin(side: keyof typeof margins, value: number | undefined) {
		draft.margins[side] = value == null ? NaN : toMillimetres(value, measurementUnit);
	}

	function showPageSettings(action: typeof dialogAction) {
		draft = { paper, columns, guides, orientation, margins: { ...margins } };
		dialogAction = action;
		settingsDialog.showModal();
	}

	function applyPageSettings(event: SubmitEvent) {
		event.preventDefault();
		if (draftLayout.error) return;
		paper = draft.paper;
		columns = draft.columns;
		guides = draft.guides;
		orientation = draft.orientation;
		margins = { ...draft.margins };
		previewIndex = 0;
		notice = '';
		settingsDialog.close();
		if (dialogAction !== 'settings') void exportPdf(dialogAction, { ...draft, margins: { ...draft.margins } });
	}

	function importFile(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		// Allow importing the same corrected workbook again.
		input.value = '';
		if (file) void importWorkbook(file);
	}

	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		if (busy) return;
		dragDepth++;
		dragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		dragDepth = Math.max(0, dragDepth - 1);
		dragging = dragDepth > 0;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragDepth = 0;
		dragging = false;
		if (busy) return;
		const files = event.dataTransfer?.files;
		if (!files?.length) return;
		if (files.length > 1) {
			reset();
			error = 'Drop one Excel workbook at a time.';
			return;
		}
		void importWorkbook(files[0]);
	}

	async function importWorkbook(file: File) {
		if (busy) return;
		records = [];
		filename = '';
		error = '';
		notice = '';
		previewIndex = 0;
		if (!/\.xlsx$/i.test(file.name)) {
			error = 'Choose an .xlsx workbook. Save older .xls files as .xlsx first.';
			return;
		}
		if (file.size > MAX_FILE_BYTES) {
			error = 'This workbook is larger than 10 MB. Import a smaller workbook.';
			return;
		}
		importing = true;
		try {
			const { readBarcodeWorkbook } = await import('$lib/utils/barcodes/excel');
			records = await readBarcodeWorkbook(await file.arrayBuffer());
			filename = file.name;
		} catch (cause) {
			error = cause instanceof Error ? cause.message : 'Could not read this workbook. Try the downloadable template.';
		} finally {
			importing = false;
		}
	}

	function reset() {
		records = [];
		filename = '';
		error = '';
		notice = '';
		previewIndex = 0;
		fileInput.value = '';
	}

	async function exportPdf(mode: 'open' | 'download', printSettings: PrintSettings) {
		if (!records.length || busy) return;
		// Reserve the viewer during the click, before any asynchronous imports.
		const target = mode === 'open' ? window.open('about:blank', '_blank') : null;
		if (target) {
			target.opener = null;
			target.document.title = 'Preparing barcode labels…';
			target.document.body.textContent = 'Preparing your barcode PDF…';
		}
		exporting = mode;
		error = '';
		notice = '';
		try {
			const [{ barcodeDocument }, { printPdf }] = await Promise.all([
				import('$lib/client/pdf/barcodes'), import('$lib/client/pdf/client')
			]);
			const bytes = await printPdf(barcodeDocument(records, printSettings));
			const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
			if (target && !target.closed) {
				target.location.href = url;
				notice = 'PDF opened. Print at Actual size / 100% for the dimensions shown.';
			} else {
				const link = document.createElement('a');
				link.href = url;
				link.download = `${filename.replace(/\.xlsx$/i, '')}-barcodes.pdf`;
				document.body.appendChild(link);
				link.click();
				link.remove();
				notice = mode === 'open'
					? 'The PDF viewer could not open, so your PDF was downloaded. Open it to print.'
					: 'PDF downloaded. Open it and print at Actual size / 100%.';
			}
			// Allow the browser viewer/download to consume the blob before releasing it.
			window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
		} catch (cause) {
			target?.close();
			error = cause instanceof Error ? cause.message : 'Could not generate the PDF. Please try again.';
		} finally {
			exporting = null;
		}
	}

	const jsonLd = {
		'@context': 'https://schema.org', '@type': 'WebApplication', name: 'Barcode Generator',
		url: 'https://accountech.dev/apps/barcode-generator', applicationCategory: 'BusinessApplication',
		operatingSystem: 'Any', description: 'Generate printable Code 128 barcode labels from an Excel workbook, entirely in your browser.',
		isPartOf: { '@id': 'https://accountech.dev/#website' }
	};
</script>

<Seo
	title="Barcode Generator | AccounTech"
	description="Import an Excel workbook and create printable Code 128 barcode labels. Download the free Excel template, preview your labels, and export a PDF in your browser."
	ogImage="https://accountech.dev/og-apps.png"
	ogImageAlt="AccounTech tools and resources"
	{jsonLd}
/>

<Nav />

<main class="min-h-screen bg-base">
	<div class="mx-auto max-w-7xl px-5 pt-28 pb-20 sm:px-6">
		<nav class="mb-6 text-sm text-muted" aria-label="Breadcrumb">
			<ol class="flex items-center gap-2">
				<li><a href={resolve('/apps')} class="rounded-sm hover:text-heading {focus}">Apps</a></li>
				<li aria-hidden="true" class="text-faint">/</li>
				<li aria-current="page" class="text-heading">Barcode Generator</li>
			</ol>
		</nav>

		<header class="mb-10">
			<p class="mb-2 text-sm font-semibold tracking-widest text-teal uppercase">Inventory &amp; Asset Tools</p>
			<h1 class="font-rajdhani text-4xl font-bold text-heading sm:text-5xl">Barcode Generator</h1>
			<p class="mt-4 max-w-2xl text-sm leading-relaxed text-body">
				From spreadsheet to printable labels. Import your barcode values, check the sheet,
				and create a PDF ready to print.
			</p>
		</header>

		<div class="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
			<div class="min-w-0">
				<div class="overflow-hidden rounded-2xl border border-divider-subtle bg-surface">
					<section class="p-5 sm:p-6" aria-labelledby="import-heading">
						<h2 id="import-heading" class="font-rajdhani text-xl font-bold text-heading">1. Import your workbook</h2>
						<div class="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-divider bg-base p-4">
							<div>
								<p class="text-sm font-medium text-heading">Start with the Excel template</p>
								<p class="mt-1 text-xs text-muted">Includes sample rows and instructions.</p>
							</div>
							<a href={asset('/barcode-template.xlsx')} download="barcode-template.xlsx" class="{button} border border-divider text-teal hover:border-teal">
								<Icon icon="solar:download-minimalistic-linear" width="18" height="18" />
								Download template
							</a>
						</div>
						<p class="mt-5 text-sm font-medium text-heading">Excel workbook</p>
						<input
							bind:this={fileInput}
							id="barcode-workbook"
							type="file"
							accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							aria-label="Excel workbook"
							hidden
							disabled={busy}
							onchange={importFile}
						/>
						<button
							type="button"
							aria-label="Choose or drop an Excel workbook"
							aria-describedby="workbook-help"
							disabled={busy}
							onclick={() => fileInput.click()}
							ondragenter={handleDragEnter}
							ondragleave={handleDragLeave}
							ondragover={(event) => { event.preventDefault(); if (event.dataTransfer) event.dataTransfer.dropEffect = busy ? 'none' : 'copy'; }}
							ondrop={handleDrop}
							class="mt-2 flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-5 py-7 text-center transition-colors disabled:cursor-wait disabled:opacity-60 {dragging ? 'border-teal bg-teal/10' : 'border-divider bg-base hover:border-teal/60 hover:bg-teal/5'} {focus}"
						>
							<Icon icon="solar:upload-minimalistic-linear" width="28" height="28" class="mb-1 text-teal" />
							<span class="text-sm font-medium text-heading">{importing ? 'Reading your workbook…' : dragging ? 'Drop your workbook to import' : 'Drag & drop your Excel workbook here'}</span>
							<span class="text-xs text-muted">or <span class="font-semibold text-teal underline underline-offset-4">browse files</span></span>
						</button>
						<p id="workbook-help" class="mt-2 text-xs leading-relaxed text-muted">.xlsx only · Up to 10 MB · Maximum 1,000 labels including copies</p>
						<div aria-live="polite" aria-atomic="true">
							{#if importing}
								<p class="mt-4 text-sm text-teal">Reading and validating your workbook…</p>
							{:else if records.length}
								<div class="mt-4 flex items-start justify-between gap-3 rounded-lg bg-teal/10 p-3">
									<div class="min-w-0">
										<p class="text-sm font-medium break-all text-heading">{filename}</p>
										<p class="mt-1 text-xs text-body">{records.length} {records.length === 1 ? 'row' : 'rows'} imported · {total.toLocaleString()} {total === 1 ? 'label' : 'labels'}</p>
									</div>
									<button type="button" onclick={reset} disabled={busy} class="min-h-11 shrink-0 rounded-md px-2 text-xs font-semibold text-teal disabled:opacity-45 {focus}">Clear</button>
								</div>
							{/if}
						</div>
						<details class="mt-4 text-xs text-muted">
							<summary class="w-fit cursor-pointer rounded-sm py-2 font-medium text-body {focus}">Workbook format &amp; leading zeroes</summary>
							<ul class="mt-2 list-disc space-y-2 pl-4 leading-relaxed">
								<li><code>BARCODE</code> is required. <code>LABEL</code> and <code>QUANTITY</code> are optional; a blank quantity means one copy.</li>
								<li>Format barcode cells as <strong>Text before entering data</strong>. Re-enter original values if Excel has already removed zeroes or rounded digits.</li>
								<li>Use letters, numbers, and printable ASCII symbols. Paste values instead of formulas. Labels can contain up to 60 characters.</li>
								<li>Keep headers in row 1. The BARCODES sheet is read, or the first worksheet if it is absent. Replace all sample rows before importing.</li>
							</ul>
						</details>
					</section>

					<section class="border-t border-divider-subtle p-5 sm:p-6" aria-labelledby="settings-heading">
						<h2 id="settings-heading" class="font-rajdhani text-xl font-bold text-heading">2. Set up the sheet</h2>
						<div class="mt-4 flex flex-wrap items-center justify-between gap-3">
							<p class="text-sm text-heading">{paper === 'LETTER' ? 'Letter' : paper === 'LEGAL' ? 'Legal' : 'A4'} · {orientation === 'portrait' ? 'Portrait' : 'Landscape'} · {columns} {columns === 1 ? 'column' : 'columns'}</p>
							<button type="button" onclick={() => showPageSettings('settings')} disabled={busy} class="{button} border border-divider text-heading hover:border-teal hover:text-teal">
								<Icon icon="solar:settings-linear" width="18" height="18" />Page settings
							</button>
						</div>
						<p class="mt-3 text-xs leading-relaxed text-muted">
							{formatMeasurement(sheet.labelWidth / MM, measurementUnit)} × {formatMeasurement(35, measurementUnit)} {measurementUnit} per label · {sheet.perPage} per sheet<br />
							Margins: {formatMeasurement(margins.top, measurementUnit)} top, {formatMeasurement(margins.right, measurementUnit)} right, {formatMeasurement(margins.bottom, measurementUnit)} bottom, {formatMeasurement(margins.left, measurementUnit)} left ({measurementUnit})<br />
							{formatMeasurement(3, measurementUnit)} {measurementUnit} gaps · Code 128 · Cut lines {guides ? 'on' : 'off'}
						</p>
					</section>

					<section class="border-t border-divider-subtle p-5 sm:p-6" aria-labelledby="export-heading">
						<h2 id="export-heading" class="font-rajdhani text-xl font-bold text-heading">3. Create your PDF</h2>
						<p class="mt-2 text-sm text-muted">
							{#if records.length && !preview.error}
								{total.toLocaleString()} labels on {preview.pages.length} {preview.pages.length === 1 ? 'page' : 'pages'}, ready to print.
							{:else}
								Import a workbook to generate your labels.
							{/if}
						</p>
						<div class="mt-4 flex flex-wrap gap-3">
							<button type="button" onclick={() => showPageSettings('open')} disabled={!canExport} class="{button} bg-teal text-paper hover:bg-teal-dark">
								<Icon icon="solar:printer-linear" width="18" height="18" />
								{exporting === 'open' ? 'Creating PDF…' : 'Open PDF to print'}
							</button>
							<button type="button" onclick={() => showPageSettings('download')} disabled={!canExport} class="{button} border border-divider text-heading hover:border-teal hover:text-teal">
								<Icon icon="solar:download-minimalistic-linear" width="18" height="18" />
								{exporting === 'download' ? 'Creating PDF…' : 'Download PDF'}
							</button>
						</div>
						<p class="mt-4 text-xs leading-relaxed text-muted">Print at <strong class="font-medium text-body">Actual size / 100%</strong>. These are cut-out labels for plain paper or full-sheet sticker paper, not a specific adhesive-sheet format.</p>
					</section>
				</div>

				{#if error || (records.length && preview.error)}
					<div role="alert" class="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">{error || preview.error}</div>
				{/if}
				<div role="status" aria-live="polite" class="mt-4 text-sm text-teal">{notice}</div>
				<p class="mt-4 flex items-center gap-2 text-xs text-muted">
					<Icon icon="solar:shield-check-linear" width="16" height="16" />
					Your workbook stays on your device. Everything runs in your browser.
				</p>
			</div>

			<section class="min-w-0 lg:sticky lg:top-24" aria-labelledby="preview-heading">
				<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
					<h2 id="preview-heading" class="font-rajdhani text-xl font-bold text-heading">Sheet preview</h2>
					<span class="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">{records.length ? `${paper === 'LETTER' ? 'Letter' : paper} · Code 128` : 'Sample labels'}</span>
				</div>
				<div class="rounded-2xl border border-divider-subtle bg-elevated p-4 sm:p-6">
					{#if preview.error}
						<div class="flex min-h-80 items-center justify-center p-8 text-center text-sm leading-relaxed text-body">
							Choose fewer columns to fit your barcode values. The preview will update when they fit.
						</div>
					{:else}
						<svg
							viewBox="0 0 {sheet.width} {sheet.height}"
							role="img"
							aria-label="{records.length ? 'Imported' : 'Sample'} barcode sheet, page {currentPage + 1} of {preview.pages.length}"
							class="mx-auto block w-full max-w-[460px] bg-white shadow-sm"
						>
							<title>{records.length ? 'Your barcode labels' : 'Sample barcode labels'}</title>
							<rect width={sheet.width} height={sheet.height} fill="white" />
							{#each preview.pages[currentPage] ?? [] as label (label.id)}
								{#if guides}
									<rect x={label.x} y={label.y} width={sheet.labelWidth} height={sheet.labelHeight} fill="none" stroke="#bbbbbb" stroke-width="0.3" />
								{/if}
								{#each label.labelLines as line, lineIndex (`${label.id}-line-${lineIndex}`)}
									<text x={label.x + sheet.labelWidth / 2} y={label.y + LABEL_TOP + lineIndex * LABEL_LINE_HEIGHT + label.labelFontSize} fill="black" font-size={label.labelFontSize} text-anchor="middle" font-family="Arial, sans-serif">{line}</text>
								{/each}
								{#each label.encoding.bars as bar (bar.x)}
									<rect x={label.x + (sheet.labelWidth - label.barcodeWidth) / 2 + bar.x * label.scale} y={label.y + BAR_TOP} width={bar.width * label.scale} height={BAR_HEIGHT} fill="black" />
								{/each}
								<text x={label.x + sheet.labelWidth / 2} y={label.y + VALUE_TOP + label.valueFontSize} fill="black" font-size={label.valueFontSize} text-anchor="middle" font-family="Arial, sans-serif" xml:space="preserve">{label.barcode}</text>
							{/each}
						</svg>
					{/if}
				</div>
				{#if records.length && preview.pages.length > 1}
					<div class="mt-3 flex items-center justify-center gap-4">
						<button type="button" aria-label="Previous preview page" disabled={currentPage === 0} onclick={() => previewIndex = currentPage - 1} class="flex size-11 items-center justify-center rounded-full border border-divider text-body disabled:opacity-35 {focus}">
							<Icon icon="solar:alt-arrow-left-linear" width="18" height="18" />
						</button>
						<p class="text-xs text-muted" aria-live="polite">Page {currentPage + 1} of {preview.pages.length}</p>
						<button type="button" aria-label="Next preview page" disabled={currentPage >= preview.pages.length - 1} onclick={() => previewIndex = currentPage + 1} class="flex size-11 items-center justify-center rounded-full border border-divider text-body disabled:opacity-35 {focus}">
							<Icon icon="solar:alt-arrow-right-linear" width="18" height="18" />
						</button>
					</div>
				{/if}
				<p class="mt-3 text-center text-xs leading-relaxed text-muted">{records.length ? 'Layout preview. Use the PDF for printing at full size.' : 'Example only. Import your workbook to see your labels here.'}</p>
			</section>
		</div>
	</div>
</main>

<dialog bind:this={settingsDialog} aria-labelledby="page-settings-title" aria-describedby="page-settings-description" class="m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border border-divider bg-base p-0 text-body shadow-xl backdrop:bg-black/50">
	<form onsubmit={applyPageSettings} class="p-5 sm:p-7">
		<div class="flex items-start justify-between gap-4">
			<div>
				<h2 id="page-settings-title" class="font-rajdhani text-2xl font-bold text-heading">Page settings</h2>
				<p id="page-settings-description" class="mt-2 text-sm leading-relaxed text-muted">Choose your paper, margins, and layout before creating the PDF.</p>
			</div>
			<button type="button" aria-label="Close page settings" onclick={() => settingsDialog.close()} class="flex size-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-elevated {focus}">
				<Icon icon="solar:close-circle-linear" width="24" height="24" />
			</button>
		</div>
		<div class="mt-6 grid grid-cols-2 gap-4">
			<div>
				<label for="paper-size" class="mb-2 block text-sm font-medium text-heading">Paper size</label>
				<SelectField id="paper-size" label="Paper size" items={paperOptions} bind:value={draft.paper} />
			</div>
			<div>
				<label for="page-orientation" class="mb-2 block text-sm font-medium text-heading">Layout</label>
				<SelectField id="page-orientation" label="Layout" items={orientationOptions} bind:value={draft.orientation} />
			</div>
		</div>
		<div role="group" aria-label="Measurement units" class="mt-5 flex w-fit rounded-lg border border-divider bg-surface p-1">
			<button type="button" aria-pressed={measurementUnit === 'mm'} onclick={() => measurementUnit = 'mm'} class="min-h-10 cursor-pointer rounded-md px-3 text-sm font-medium transition-colors {measurementUnit === 'mm' ? 'bg-teal/10 text-teal' : 'text-muted hover:text-heading'} {focus}">Millimetres (mm)</button>
			<button type="button" aria-pressed={measurementUnit === 'in'} onclick={() => measurementUnit = 'in'} class="min-h-10 cursor-pointer rounded-md px-3 text-sm font-medium transition-colors {measurementUnit === 'in' ? 'bg-teal/10 text-teal' : 'text-muted hover:text-heading'} {focus}">Inches (in)</button>
		</div>
		<fieldset class="mt-5">
			<legend class="text-sm font-medium text-heading">Margins ({measurementUnit})</legend>
			<div class="mt-2 grid grid-cols-2 gap-3">
				{#each ['top', 'right', 'bottom', 'left'] as side (side)}
					{@const key = side as keyof typeof margins}
					<div>
						<label for="margin-{side}" class="mb-1.5 block text-xs text-muted capitalize">{side}</label>
						<NumberInput id="margin-{side}" label="{side} margin" min={0} max={fromMillimetres(50, measurementUnit)} step={measurementUnit === 'in' ? 0.05 : 0.5} unit={measurementUnit} bind:value={() => displayedMargin(key), (value) => setMargin(key, value)} />
					</div>
				{/each}
			</div>
		</fieldset>
		<div class="mt-5">
			<label for="label-columns" class="mb-2 block text-sm font-medium text-heading">Labels across</label>
			<SelectField id="label-columns" label="Labels across" items={columnOptions} bind:value={() => String(draft.columns), (value) => { draft.columns = Number(value) as PrintSettings['columns']; }} />
		</div>
		<label class="mt-3 flex min-h-11 w-fit cursor-pointer items-center gap-2.5 text-sm text-body">
			<input type="checkbox" bind:checked={draft.guides} class="size-4 cursor-pointer accent-teal {focus}" />Show cut lines
		</label>
		<div aria-live="polite" class="mt-3 rounded-xl bg-surface p-4 text-sm leading-relaxed">
			{#if draftLayout.layout}
				<p class="font-medium text-heading">{formatMeasurement(draftLayout.layout.labelWidth / MM, measurementUnit)} × {formatMeasurement(35, measurementUnit)} {measurementUnit} labels · {draftLayout.layout.perPage} per sheet</p>
				<p class="mt-1 text-xs text-muted">Paper: {formatMeasurement(draftLayout.layout.width / MM, measurementUnit)} × {formatMeasurement(draftLayout.layout.height / MM, measurementUnit)} {measurementUnit}</p>
				<p class="mt-1 text-xs text-muted">{total ? `${total.toLocaleString()} labels · ${Math.ceil(total / draftLayout.layout.perPage)} pages` : 'Import your workbook to create a PDF.'} · {formatMeasurement(3, measurementUnit)} {measurementUnit} gaps</p>
			{:else}
				<p class="text-red-700 dark:text-red-300">{draftLayout.error}</p>
			{/if}
		</div>
		<div class="mt-6 flex flex-wrap justify-end gap-3">
			<button type="button" onclick={() => settingsDialog.close()} class="{button} border border-divider text-body hover:text-heading">Cancel</button>
			<button type="submit" disabled={!!draftLayout.error} class="{button} bg-teal text-paper hover:bg-teal-dark">{dialogAction === 'settings' ? 'Save settings' : dialogAction === 'open' ? 'Create & open PDF' : 'Create & download PDF'}</button>
		</div>
	</form>
</dialog>

<Footer />
