#!/usr/bin/env bun
import { $ } from 'bun';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const browse = path.join(os.homedir(), '.claude/skills/gstack/browse/dist/browse');
const url = 'http://localhost:5173';
const output = 'static/cv.pdf';

if (!existsSync(browse)) {
	console.error(`gstack browse binary not found at ${browse}`);
	console.error('Install gstack (https://github.com/garryslist/gstack) or render the PDF manually.');
	process.exit(1);
}

async function isUp() {
	try {
		const r = await fetch(url, { signal: AbortSignal.timeout(500) });
		return r.ok;
	} catch {
		return false;
	}
}

let devServer: ReturnType<typeof Bun.spawn> | null = null;

try {
	if (!(await isUp())) {
		console.log('Starting dev server...');
		devServer = Bun.spawn(['bun', 'run', 'dev'], { stdout: 'ignore', stderr: 'ignore' });
		const start = Date.now();
		while (!(await isUp())) {
			if (Date.now() - start > 30_000) throw new Error('Dev server did not respond within 30s');
			await Bun.sleep(500);
		}
	}

	console.log('Rendering /cv to PDF...');
	await $`${browse} goto ${url}/cv`.quiet();
	await $`${browse} wait --networkidle`.quiet();
	await $`${browse} pdf ${output} --format a4 --print-background --prefer-css-page-size`.quiet();
	console.log(`Wrote ${output}`);
} finally {
	devServer?.kill();
}
