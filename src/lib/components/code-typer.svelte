<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const snippets = [
		`// monthly VAT due, BIR-style
function vat(sale: number): number {
  return sale * 0.12;
}

const gross = 56_000;
const net = gross / 1.12;
const due = vat(net);
// → ₱6,000.00`,

		`type Filing = {
  code: '1701Q' | '2550M' | '0619E';
  due: Date;
  status: 'open' | 'filed';
};

const calendar = await
  bir.filings.upcoming({
    quarter: 'Q2',
  });`,

		`const trial = ledger
  .filter(e => e.posted)
  .reduce(
    (acc, e) => ({
      debit:  acc.debit  + e.debit,
      credit: acc.credit + e.credit,
    }),
    { debit: 0, credit: 0 },
  );

assert(trial.debit === trial.credit);`,

		`async function payroll(period: Date) {
  const slips = await loadSlips(period);

  return slips.map(s => ({
    name:  s.employee,
    gross: s.basic + s.allowance,
    sss:   contribution(s, 'SSS'),
    ph:    contribution(s, 'PhilHealth'),
    tax:   withholding(s),
  }));
}`
	];

	type Token = {
		type: 'kw' | 'type' | 'string' | 'comment' | 'num' | 'fn' | 'punct' | 'text';
		text: string;
	};

	const KEYWORDS = new Set([
		'function',
		'const',
		'let',
		'var',
		'return',
		'type',
		'await',
		'async',
		'if',
		'else',
		'for',
		'of',
		'in',
		'from',
		'import',
		'export',
		'interface',
		'new',
		'true',
		'false',
		'null',
		'undefined'
	]);

	const TYPES = new Set([
		'number',
		'string',
		'boolean',
		'Date',
		'void',
		'never',
		'unknown',
		'any',
		'Promise'
	]);

	function tokenize(code: string): Token[] {
		const tokens: Token[] = [];
		let i = 0;
		const len = code.length;

		while (i < len) {
			const ch = code[i];

			if (ch === '/' && code[i + 1] === '/') {
				let end = code.indexOf('\n', i);
				if (end === -1) end = len;
				tokens.push({ type: 'comment', text: code.slice(i, end) });
				i = end;
				continue;
			}

			if (ch === "'" || ch === '"' || ch === '`') {
				let j = i + 1;
				while (j < len && code[j] !== ch) {
					if (code[j] === '\\') j++;
					j++;
				}
				j = Math.min(j + 1, len);
				tokens.push({ type: 'string', text: code.slice(i, j) });
				i = j;
				continue;
			}

			if (/[0-9]/.test(ch)) {
				let j = i;
				while (j < len && /[0-9._]/.test(code[j])) j++;
				tokens.push({ type: 'num', text: code.slice(i, j) });
				i = j;
				continue;
			}

			if (/[a-zA-Z_$]/.test(ch)) {
				let j = i;
				while (j < len && /[\w$]/.test(code[j])) j++;
				const word = code.slice(i, j);
				let next = j;
				while (next < len && code[next] === ' ') next++;
				if (KEYWORDS.has(word)) {
					tokens.push({ type: 'kw', text: word });
				} else if (TYPES.has(word)) {
					tokens.push({ type: 'type', text: word });
				} else if (code[next] === '(') {
					tokens.push({ type: 'fn', text: word });
				} else {
					tokens.push({ type: 'text', text: word });
				}
				i = j;
				continue;
			}

			if (/[{}()[\];,.:<>=+\-*/&|!?]/.test(ch)) {
				tokens.push({ type: 'punct', text: ch });
				i++;
				continue;
			}

			tokens.push({ type: 'text', text: ch });
			i++;
		}

		return tokens;
	}

	let snippetIndex = $state(0);
	let typed = $state('');
	let phase: 'typing' | 'pause' | 'erasing' | 'idle' = 'typing';
	let charIndex = 0;
	let timer: ReturnType<typeof setTimeout> | null = null;
	let mounted = false;

	const tokens = $derived(tokenize(typed));
	const lines = $derived(typed.split('\n'));
	const filename = $derived(['vat.ts', 'filings.ts', 'trial-balance.ts', 'payroll.ts'][snippetIndex] ?? 'sample.ts');

	function schedule(fn: () => void, ms: number) {
		if (!mounted) return;
		timer = setTimeout(fn, ms);
	}

	function tick() {
		const current = snippets[snippetIndex];

		if (phase === 'typing') {
			if (charIndex < current.length) {
				charIndex++;
				typed = current.slice(0, charIndex);
				const last = current[charIndex - 1];
				let delay = 18 + Math.random() * 22;
				if (last === '\n') delay = 110;
				else if (last === ' ') delay = 12;
				else if (',;.{}()'.includes(last)) delay = 60;
				schedule(tick, delay);
			} else {
				phase = 'pause';
				schedule(tick, 2400);
			}
			return;
		}

		if (phase === 'pause') {
			phase = 'erasing';
			schedule(tick, 30);
			return;
		}

		if (phase === 'erasing') {
			if (charIndex > 0) {
				charIndex = Math.max(0, charIndex - 4);
				typed = current.slice(0, charIndex);
				schedule(tick, 8);
			} else {
				snippetIndex = (snippetIndex + 1) % snippets.length;
				phase = 'typing';
				schedule(tick, 350);
			}
		}
	}

	onMount(() => {
		mounted = true;
		schedule(tick, 700);
	});

	onDestroy(() => {
		mounted = false;
		if (timer) clearTimeout(timer);
	});
</script>

<div
	class="rounded-xl border border-rule bg-surface/70 shadow-sm backdrop-blur-sm"
	aria-hidden="true"
>
	<div class="flex items-center justify-between border-b border-rule-subtle px-4 py-2.5">
		<div class="flex items-center gap-2">
			<span class="inline-block h-2 w-2 rounded-full bg-seal/70"></span>
			<span class="inline-block h-2 w-2 rounded-full bg-ink-faint/40"></span>
			<span class="inline-block h-2 w-2 rounded-full bg-ink-faint/40"></span>
		</div>
		<span class="font-mono text-[10px] tracking-[0.16em] text-ink-muted uppercase">
			{filename}
		</span>
	</div>

	<div class="flex font-mono text-[12.5px] leading-[1.65] sm:text-[13px]">
		<div
			class="shrink-0 border-r border-rule-subtle px-3 py-4 text-right text-ink-faint select-none"
			style="font-variant-numeric: tabular-nums;"
		>
			{#each lines as _, i (i)}
				<div>{String(i + 1).padStart(2, '0')}</div>
			{/each}
		</div>

		<pre class="min-h-[16em] flex-1 overflow-x-auto px-4 py-4 text-ink"><code>{#each tokens as tok, i (i)}<span class="tok tok-{tok.type}">{tok.text}</span>{/each}<span class="caret">▍</span></code></pre>
	</div>
</div>

<style>
	pre {
		font-family: var(--font-mono);
		white-space: pre;
		tab-size: 2;
	}

	.tok-kw {
		color: var(--seal);
		font-weight: 500;
	}

	.tok-type {
		color: var(--seal-bright);
	}

	.tok-string {
		color: oklch(58% 0.13 145);
	}

	:global(.dark) .tok-string {
		color: oklch(74% 0.13 150);
	}

	.tok-comment {
		color: var(--ink-faint);
		font-style: italic;
	}

	.tok-num {
		color: oklch(60% 0.16 50);
	}

	:global(.dark) .tok-num {
		color: oklch(76% 0.13 60);
	}

	.tok-fn {
		color: oklch(50% 0.18 290);
	}

	:global(.dark) .tok-fn {
		color: oklch(74% 0.14 285);
	}

	.tok-punct {
		color: var(--ink-muted);
	}

	.caret {
		display: inline-block;
		color: var(--seal);
		font-weight: 400;
		margin-left: -2px;
		animation: caret-blink 1.05s steps(2, end) infinite;
	}

	@keyframes caret-blink {
		0%,
		50% {
			opacity: 1;
		}
		50.01%,
		100% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.caret {
			animation: none;
		}
	}
</style>
