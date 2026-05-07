<script lang="ts">
	import Icon from '@iconify/svelte';
	import CodeTyper from './code-typer.svelte';
</script>

<section
	id="hero"
	class="relative flex min-h-dvh items-center overflow-hidden bg-paper px-6 sm:px-8"
>
	<div
		class="pointer-events-none absolute inset-0 text-ink opacity-[0.08] dark:opacity-[0.1]"
		aria-hidden="true"
		style="background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 80px 80px;"
	></div>
	<div
		class="pointer-events-none absolute inset-0 text-ink opacity-[0.06] dark:opacity-[0.08]"
		aria-hidden="true"
		style="background-image: radial-gradient(currentColor 0.7px, transparent 0.7px); background-size: 6px 6px;"
	></div>

	<div class="relative mx-auto w-full max-w-[1240px] pt-32 pb-20 sm:pt-40 sm:pb-28">
		<div class="grid grid-cols-12 gap-x-6">
			<div class="col-span-12 mb-10 flex flex-wrap items-center gap-3 reveal-up sm:gap-5">
				<span class="inline-flex items-center gap-2 rounded-full bg-seal-tint px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-seal-deep uppercase dark:text-seal-bright">
					<span class="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-seal"></span>
					Practice live · Mon–Fri
				</span>
				<span class="hidden h-px w-8 bg-rule sm:block sm:w-12"></span>
				<span class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
					Oriental Mindoro
				</span>
				<span class="hidden h-px w-8 bg-rule sm:block sm:w-12"></span>
				<span class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
					Est. 2017
				</span>
			</div>

			<h1
				class="col-span-12 font-serif text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.96] font-light tracking-[-0.025em] text-ink reveal-up lg:col-span-11"
				style="animation-delay: 80ms;"
			>
				Where accounting<br />
				meets <em class="font-medium not-italic">technology</em><span class="text-seal">.</span>
			</h1>

			<div
				class="col-span-12 mt-12 grid grid-cols-12 gap-x-6 gap-y-10 reveal-up sm:mt-16"
				style="animation-delay: 220ms;"
			>
				<div class="col-span-12 md:col-span-7 lg:col-span-6">
					<p class="max-w-[42ch] font-serif text-[1.35rem] leading-[1.45] text-ink-soft sm:text-[1.5rem]">
						A licensed CPA practice that also writes the software it depends on. We
						handle BIR compliance, registrations and audits — and build the systems
						that make the books painless.
					</p>

					<div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
						<a
							href="#contact"
							class="press group inline-flex items-center gap-3 rounded-md border border-seal bg-seal px-5 py-3.5 font-mono text-[11px] tracking-[0.18em] text-paper uppercase shadow-sm transition-all duration-200 hover:bg-seal-deep hover:border-seal-deep hover:shadow-md dark:text-ink"
						>
							Start a conversation
							<Icon
								icon="solar:arrow-right-linear"
								width="14"
								height="14"
								class="transition-transform duration-300 group-hover:translate-x-1"
								style="transition-timing-function: var(--ease-out-strong);"
								aria-hidden="true"
							/>
						</a>
						<a
							href="#services"
							class="rule-grow inline-flex items-center font-mono text-[11px] tracking-[0.18em] text-ink-soft uppercase transition-colors hover:text-ink"
						>
							Browse the services index
						</a>
					</div>

					<div class="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.18em] text-ink-faint uppercase">
						<span class="inline-flex items-center gap-2">
							<Icon icon="solar:check-circle-linear" width="11" height="11" aria-hidden="true" />
							PRC-Licensed CPA
						</span>
					</div>
				</div>

				<div class="col-span-12 md:col-span-5 lg:col-span-5 lg:col-start-8">
					<CodeTyper />
				</div>
			</div>
		</div>
	</div>

	<div
		class="pointer-events-none absolute right-6 bottom-6 hidden flex-col items-center gap-2 text-ink-muted sm:flex sm:right-8 sm:bottom-8"
		aria-hidden="true"
	>
		<span class="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
		<span class="h-10 w-px bg-current"></span>
	</div>
</section>
