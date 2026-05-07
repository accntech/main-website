<script lang="ts">
	import Icon from '@iconify/svelte';
	import CodeTyper from './code-typer.svelte';
</script>

<section
	id="hero"
	class="relative flex items-center bg-paper px-6 sm:px-8 min-h-dvh overflow-hidden"
>
	<div
		class="absolute inset-0 opacity-[0.08] dark:opacity-[0.1] text-ink pointer-events-none"
		aria-hidden="true"
		style="background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 80px 80px;"
	></div>
	<div
		class="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] text-ink pointer-events-none"
		aria-hidden="true"
		style="background-image: radial-gradient(currentColor 0.7px, transparent 0.7px); background-size: 6px 6px;"
	></div>

	<div class="relative mx-auto pt-32 sm:pt-40 pb-20 sm:pb-28 w-full max-w-310">
		<div class="gap-x-6 grid grid-cols-12">
			<div class="flex flex-wrap items-center gap-3 sm:gap-5 col-span-12 mb-10 reveal-up">
				<span class="inline-flex items-center gap-2 bg-seal-tint px-3 py-1 rounded-full font-mono text-[10px] text-seal-deep dark:text-seal-bright uppercase tracking-[0.16em]">
					<span class="inline-block bg-seal rounded-full w-1.5 h-1.5 pulse-dot"></span>
					Practice live · Mon–Fri
				</span>
				<span class="hidden sm:block bg-rule w-8 sm:w-12 h-px"></span>
				<span class="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
					Oriental Mindoro
				</span>
				<span class="hidden sm:block bg-rule w-8 sm:w-12 h-px"></span>
				<span class="font-mono text-[11px] text-ink-muted uppercase tracking-[0.18em]">
					Est. 2017
				</span>
			</div>

			<h1
				class="col-span-12 lg:col-span-11 font-serif font-light text-[clamp(2.75rem,9vw,8.5rem)] text-ink leading-[0.96] tracking-[-0.025em] reveal-up"
				style="animation-delay: 80ms;"
			>
				Where accounting<br />
				meets <em class="font-medium not-italic">technology</em><span class="text-seal">.</span>
			</h1>

			<div
				class="gap-x-6 gap-y-10 grid grid-cols-12 col-span-12 mt-12 sm:mt-16 reveal-up"
				style="animation-delay: 220ms;"
			>
				<div class="col-span-12 md:col-span-7 lg:col-span-6">
					<p class="max-w-[42ch] font-serif text-[1.35rem] text-ink-soft sm:text-[1.5rem] leading-[1.45]">
						A licensed CPA practice that also writes the software it depends on. We
						handle BIR compliance, registrations and audits — and build the systems
						that make the books painless.
					</p>

					<div class="flex flex-wrap items-center gap-x-6 gap-y-4 mt-10">
						<a
							href="#contact"
							class="group inline-flex items-center gap-3 bg-seal hover:bg-seal-deep shadow-sm hover:shadow-md px-5 py-3.5 border border-seal hover:border-seal-deep rounded-md font-mono text-[11px] text-paper dark:text-ink uppercase tracking-[0.18em] transition-all duration-200 press"
						>
							Start a conversation
							<Icon
								icon="solar:arrow-right-linear"
								width="14"
								height="14"
								class="transition-transform group-hover:translate-x-1 duration-300"
								style="transition-timing-function: var(--ease-out-strong);"
								aria-hidden="true"
							/>
						</a>
						<a
							href="#services"
							class="inline-flex items-center font-mono text-[11px] text-ink-soft hover:text-ink uppercase tracking-[0.18em] transition-colors rule-grow"
						>
							Browse the services index
						</a>
					</div>

					<div class="flex flex-wrap items-center gap-x-5 gap-y-2 mt-12 font-mono text-[10px] text-ink-faint uppercase tracking-[0.18em]">
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
		class="hidden right-6 sm:right-8 bottom-6 sm:bottom-8 absolute sm:flex flex-col items-center gap-2 text-ink-muted pointer-events-none"
		aria-hidden="true"
	>
		<span class="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
		<span class="bg-current w-px h-10"></span>
	</div>
</section>
