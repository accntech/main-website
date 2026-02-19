<script lang="ts">
	import Nav from '$lib/components/nav.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Seo from '$lib/components/seo.svelte';

	let file = $state<File | null>(null);
	let status = $state<'idle' | 'loaded' | 'processing' | 'complete' | 'error'>('idle');
	let errorMessage = $state('');
	let zipBlob = $state<Blob | null>(null);
	let zipFilename = $state('');
	let dragOver = $state(false);
	let statusText = $state('');

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		dragOver = true;
	}

	function handleDragLeave() {
		dragOver = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		const f = e.dataTransfer?.files[0];
		if (f) handleFile(f);
	}

	function handleFileInput(e: Event) {
		const input = e.target as HTMLInputElement;
		const f = input.files?.[0];
		if (f) handleFile(f);
	}

	function handleFile(f: File) {
		const ext = f.name.split('.').pop()?.toLowerCase();
		if (ext !== 'xls' && ext !== 'xlsx') {
			errorMessage = 'Please upload an Excel file (.xls or .xlsx)';
			status = 'error';
			return;
		}
		file = f;
		status = 'loaded';
		errorMessage = '';
	}

	async function generate() {
		if (!file) return;
		status = 'processing';

		try {
			statusText = 'Reading Excel file...';
			const { readExcelTemplate } = await import('$lib/utils/vat-relief/excel-reader');
			const data = await readExcelTemplate(file);

			statusText = 'Generating DAT files...';
			const { generateDatFiles } = await import('$lib/utils/vat-relief/dat-generator');
			const datFiles = generateDatFiles(data);

			statusText = 'Creating reconciliation report...';
			const { writeReconReport } = await import('$lib/utils/vat-relief/recon-writer');
			const reconReport = await writeReconReport(data);

			statusText = 'Building ZIP...';
			const { buildZip } = await import('$lib/utils/vat-relief/zip-builder');
			const result = await buildZip(datFiles, reconReport, data.info);

			zipBlob = result.blob;
			zipFilename = result.filename;
			status = 'complete';
		} catch (e) {
			errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
			status = 'error';
		}
	}

	function downloadZip() {
		if (!zipBlob) return;
		const url = URL.createObjectURL(zipBlob);
		const a = document.createElement('a');
		a.href = url;
		a.download = zipFilename;
		a.click();
		URL.revokeObjectURL(url);
	}

	function reset() {
		file = null;
		status = 'idle';
		errorMessage = '';
		zipBlob = null;
		zipFilename = '';
		statusText = '';
	}
</script>

<Seo
	title="VAT Relief Generator | AccounTech"
	description="Generate BIR-compliant VAT relief DAT files and reconciliation reports. Upload your Excel template and download everything as a ZIP."
/>

<Nav />

<main class="relative bg-base min-h-screen">
	<div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 80% 50% at 70% 40%, rgba(6, 182, 212, 0.04), transparent);"></div>
	<div class="relative mx-auto px-5 sm:px-6 pt-28 pb-20 max-w-7xl">

		<nav class="relative mb-6 text-sm" aria-label="Breadcrumb">
			<ol class="flex items-center gap-2 text-muted">
				<li><a href="/apps" class="hover:text-heading transition-colors">Apps</a></li>
				<li class="text-faint">/</li>
				<li class="text-heading">VAT Relief</li>
			</ol>
		</nav>

		<header class="relative mb-10">
			<p class="mb-2 font-semibold text-teal text-sm uppercase tracking-widest">VAT Compliance Tool</p>
			<h1 class="font-rajdhani font-bold text-heading text-4xl sm:text-5xl">
				VAT Relief Generator
			</h1>
			<div class="bg-teal mt-4 rounded-full w-16 h-1"></div>
			<p class="mt-4 max-w-2xl text-body text-sm">
				Generate BIR-compliant DAT files and reconciliation reports from your VAT relief Excel template.
			</p>
		</header>

		<div class="relative gap-8 grid grid-cols-1 lg:grid-cols-3">
			<div class="lg:top-28 lg:sticky lg:self-start space-y-6">
				<div class="bg-surface p-6 border border-divider-subtle rounded-2xl">
					<div class="flex items-center gap-3 mb-4">
						<div class="flex justify-center items-center bg-teal/10 rounded-xl w-10 h-10">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="text-teal">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
								<polyline points="14 2 14 8 20 8" />
								<line x1="16" y1="13" x2="8" y2="13" />
								<line x1="16" y1="17" x2="8" y2="17" />
								<polyline points="10 9 9 9 8 9" />
							</svg>
						</div>
						<div>
							<p class="font-medium text-heading text-sm">Excel Template</p>
							<p class="text-muted text-xs">Required format for upload</p>
						</div>
					</div>
					<a
						href="/vat-relief-template.xltx"
						download="vat-relief-template.xltx"
						class="inline-flex justify-center items-center gap-2 px-4 py-2.5 border border-faint hover:border-teal/50 rounded-full w-full font-semibold text-body hover:text-teal text-sm transition-all duration-200"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" y1="15" x2="12" y2="3" />
						</svg>
						Download Template
					</a>
				</div>

				<div class="bg-surface p-6 border border-divider-subtle rounded-2xl">
					<h2 class="mb-4 font-rajdhani font-bold text-heading text-lg">How It Works</h2>
					<ol class="space-y-4">
						<li class="flex gap-3">
							<span class="flex justify-center items-center bg-teal/10 rounded-full w-7 h-7 font-bold text-teal text-xs shrink-0">1</span>
							<div>
								<p class="font-medium text-heading text-sm">Download the template</p>
								<p class="text-muted text-xs">Get the Excel file with the required format</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex justify-center items-center bg-teal/10 rounded-full w-7 h-7 font-bold text-teal text-xs shrink-0">2</span>
							<div>
								<p class="font-medium text-heading text-sm">Fill in your VAT data</p>
								<p class="text-muted text-xs">Enter sales and purchase records</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex justify-center items-center bg-teal/10 rounded-full w-7 h-7 font-bold text-teal text-xs shrink-0">3</span>
							<div>
								<p class="font-medium text-heading text-sm">Upload and generate</p>
								<p class="text-muted text-xs">Get DAT files and reconciliation report</p>
							</div>
						</li>
						<li class="flex gap-3">
							<span class="flex justify-center items-center bg-teal/10 rounded-full w-7 h-7 font-bold text-teal text-xs shrink-0">4</span>
							<div>
								<p class="font-medium text-heading text-sm">Validate with BIR Relief</p>
								<p class="text-muted text-xs">
									Verify your DAT files using the official
									<a href="https://bir-cdn.bir.gov.ph/local/pdf/BIRReliefv2.3.exe" class="text-teal hover:underline" target="_blank" rel="noopener noreferrer">BIR Relief app</a>
									before submission
								</p>
							</div>
						</li>
					</ol>
				</div>
			</div>

			<div class="lg:col-span-2">
				{#if status === 'idle' || status === 'loaded'}
					<div
						role="button"
						tabindex="0"
						class="relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 {dragOver
							? 'border-teal bg-teal/5'
							: 'border-divider hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5'}"
						ondragover={handleDragOver}
						ondragleave={handleDragLeave}
						ondrop={handleDrop}
						onclick={() => document.getElementById('file-input')?.click()}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') document.getElementById('file-input')?.click();
						}}
					>
						<input
							id="file-input"
							type="file"
							accept=".xls,.xlsx"
							class="hidden"
							onchange={handleFileInput}
						/>

						{#if status === 'loaded' && file}
							<div class="flex flex-col items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-teal"
								>
									<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
									<polyline points="14 2 14 8 20 8" />
									<line x1="16" y1="13" x2="8" y2="13" />
									<line x1="16" y1="17" x2="8" y2="17" />
									<polyline points="10 9 9 9 8 9" />
								</svg>
								<p class="font-medium text-heading">{file.name}</p>
								<p class="text-muted text-sm">{(file.size / 1024).toFixed(1)} KB</p>
							</div>
						{:else}
							<div class="flex flex-col items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="text-muted"
								>
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="17 8 12 3 7 8" />
									<line x1="12" y1="3" x2="12" y2="15" />
								</svg>
								<p class="font-medium text-heading">Drop your Excel file here</p>
								<p class="text-muted text-sm">or click to browse (.xls, .xlsx)</p>
							</div>
						{/if}
					</div>

					{#if status === 'loaded'}
						<div class="flex gap-3 mt-6">
							<button
								onclick={generate}
								class="inline-flex flex-1 justify-center items-center gap-2 bg-teal hover:bg-teal-light px-6 py-3 rounded-full font-semibold text-navy-dark transition-colors duration-200"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polygon points="5 3 19 12 5 21 5 3" />
								</svg>
								Generate Files
							</button>
							<button
								onclick={reset}
								class="inline-flex justify-center items-center gap-2 px-6 py-3 border border-faint hover:border-teal/50 rounded-full font-semibold text-body hover:text-teal transition-colors duration-200"
							>
								Clear
							</button>
						</div>
					{/if}
				{/if}

				{#if status === 'processing'}
					<div
						class="bg-surface p-10 border border-divider-subtle rounded-2xl text-center animate-fade-in"
					>
						<div class="flex flex-col items-center gap-4">
							<svg
								class="text-teal animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							<p class="font-medium text-heading">{statusText}</p>
							<p class="text-muted text-sm">Please wait...</p>
						</div>
					</div>
				{/if}

				{#if status === 'complete'}
					<div class="bg-teal/5 p-10 border border-teal/30 rounded-2xl text-center animate-fade-in">
						<div class="flex flex-col items-center gap-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-teal"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
								<polyline points="22 4 12 14.01 9 11.01" />
							</svg>
							<p class="font-medium text-heading text-lg">Files generated successfully</p>
							<p class="text-muted text-sm">Your VAT relief files are ready for download.</p>
						</div>

						<div class="flex sm:flex-row flex-col justify-center gap-3 mt-8">
							<button
								onclick={downloadZip}
								class="inline-flex justify-center items-center gap-2 bg-teal hover:bg-teal-light px-6 py-3 rounded-full font-semibold text-navy-dark transition-colors duration-200"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="7 10 12 15 17 10" />
									<line x1="12" y1="15" x2="12" y2="3" />
								</svg>
								Download ZIP
							</button>
							<button
								onclick={reset}
								class="inline-flex justify-center items-center gap-2 px-6 py-3 border border-faint hover:border-teal/50 rounded-full font-semibold text-body hover:text-teal transition-colors duration-200"
							>
								Process Another File
							</button>
						</div>
					</div>
				{/if}

				{#if status === 'error'}
					<div class="bg-red-500/5 p-10 border border-red-500/30 rounded-2xl text-center animate-fade-in">
						<div class="flex flex-col items-center gap-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="40"
								height="40"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="text-red-400"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="15" y1="9" x2="9" y2="15" />
								<line x1="9" y1="9" x2="15" y2="15" />
							</svg>
							<p class="font-medium text-heading">Something went wrong</p>
							<p class="max-w-md text-red-400 text-sm">{errorMessage}</p>
						</div>

						<div class="mt-8">
							<button
								onclick={reset}
								class="inline-flex justify-center items-center gap-2 px-6 py-3 border border-faint hover:border-teal/50 rounded-full font-semibold text-body hover:text-teal transition-colors duration-200"
							>
								Try Again
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<div class="relative mt-10 text-center">
			<div class="inline-flex items-center gap-2 text-muted text-xs">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal/60">
					<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</svg>
				<p>Your data is processed entirely on your device. AccounTech does not collect, store, or transmit any of your files or information.</p>
			</div>
		</div>
	</div>
</main>

<Footer />
