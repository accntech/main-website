<script lang="ts">
	import Icon from '@iconify/svelte';
	import { contactSchema, type ContactForm } from '$lib/schemas/contact';

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	let errors: Record<string, string> = $state({});
	let submitted = $state(false);
	let success = $state(false);
	let sending = $state(false);
	let errorMessage = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		submitted = true;

		const formData: ContactForm = { name, email, subject, message };
		const result = contactSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0];
				if (typeof field === 'string' && !fieldErrors[field]) {
					fieldErrors[field] = issue.message;
				}
			}
			errors = fieldErrors;
			return;
		}

		errors = {};
		sending = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (response.ok) {
				success = true;
				name = '';
				email = '';
				subject = '';
				message = '';

				setTimeout(() => {
					success = false;
					submitted = false;
				}, 5000);
			} else {
				errorMessage = data?.error || 'Failed to send message. Please try again.';
			}
		} catch {
			errorMessage = 'Something went wrong. Please try again.';
		} finally {
			sending = false;
		}
	}
</script>

<section
	id="contact"
	class="relative bg-surface px-6 py-24 sm:px-8 sm:py-36"
>
	<div class="mx-auto max-w-[1240px]">
		<div class="grid grid-cols-12 gap-x-6 gap-y-10 mb-16 sm:mb-20">
			<div class="col-span-12 md:col-span-4">
				<div class="flex items-center gap-3">
					<span class="font-mono text-[11px] tracking-[0.2em] text-seal uppercase">
						↳ Correspondence
					</span>
					<span class="h-px flex-1 bg-rule"></span>
				</div>
			</div>
			<div class="col-span-12 md:col-span-8">
				<h2 class="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-light tracking-[-0.02em] text-ink">
					Write to us<span class="text-seal">.</span>
				</h2>
				<p class="mt-6 max-w-[50ch] text-base leading-[1.6] text-ink-soft sm:text-lg">
					Tell us roughly what you need and the rough shape of the business. We'll
					reply within two working days with the right person to take it forward.
				</p>
			</div>
		</div>

		<div class="grid grid-cols-12 gap-x-6 gap-y-12">
			<aside class="col-span-12 lg:col-span-4">
				<dl class="space-y-8">
					<div>
						<dt class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
							Email
						</dt>
						<dd class="mt-2">
							<a
								href="mailto:accntech.dev@gmail.com"
								class="rule-grow font-serif text-xl text-ink transition-colors hover:text-seal sm:text-2xl"
							>
								accntech.dev@gmail.com
							</a>
						</dd>
					</div>

					<div>
						<dt class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
							Phone
						</dt>
						<dd class="mt-2">
							<a
								href="tel:+639952942417"
								class="font-serif text-xl text-ink transition-colors hover:text-seal sm:text-2xl"
							>
								+63 995 294 2417
							</a>
						</dd>
					</div>

					<div>
						<dt class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
							Offices
						</dt>
						<dd class="mt-2 font-serif text-lg leading-[1.4] text-ink sm:text-xl">
							Roxas · Mansalay
							<br />
							<span class="text-ink-muted">Oriental Mindoro, Philippines</span>
						</dd>
					</div>

					<div>
						<dt class="font-mono text-[11px] tracking-[0.18em] text-ink-muted uppercase">
							Hours
						</dt>
						<dd class="mt-2 font-mono lining text-base text-ink-soft">
							Mon–Fri · 08:00 – 17:00 PHT
						</dd>
					</div>
				</dl>
			</aside>

			<div class="col-span-12 lg:col-span-8">
				{#if success}
					<div class="rounded-xl border border-seal/30 bg-seal-tint p-6 sm:p-10">
						<p class="font-mono text-[11px] tracking-[0.18em] text-seal uppercase">
							Received
						</p>
						<p class="mt-4 font-serif text-xl leading-[1.4] text-ink sm:text-3xl sm:leading-[1.35]">
							Thank you. Your message is in our inbox — we'll be in touch shortly.
						</p>
					</div>
				{:else}
					{#if errorMessage}
						<div class="mb-8 rounded-xl border border-red-500/30 bg-red-500/5 p-5 sm:p-6">
							<p class="font-mono text-[11px] tracking-[0.18em] text-red-500 uppercase">
								Couldn't send
							</p>
							<p class="mt-2 font-serif text-base leading-[1.4] text-ink sm:text-lg">{errorMessage}</p>
						</div>
					{/if}

					<form onsubmit={handleSubmit} class="space-y-7 sm:space-y-10" novalidate>
						<div class="grid grid-cols-1 gap-x-10 gap-y-7 sm:gap-y-10 sm:grid-cols-2">
							<div class="form-field">
								<label for="contact-name" class="form-label">Name</label>
								<input
									id="contact-name"
									type="text"
									name="name"
									autocomplete="name"
									autocapitalize="words"
									spellcheck="false"
									bind:value={name}
									disabled={sending}
									placeholder="—"
									class="form-input"
								/>
								{#if submitted && errors.name}
									<p class="form-error">{errors.name}</p>
								{/if}
							</div>
							<div class="form-field">
								<label for="contact-email" class="form-label">Email</label>
								<input
									id="contact-email"
									type="email"
									name="email"
									autocomplete="email"
									autocapitalize="none"
									autocorrect="off"
									spellcheck="false"
									inputmode="email"
									bind:value={email}
									disabled={sending}
									placeholder="—"
									class="form-input"
								/>
								{#if submitted && errors.email}
									<p class="form-error">{errors.email}</p>
								{/if}
							</div>
						</div>

						<div class="form-field">
							<label for="contact-subject" class="form-label">Subject</label>
							<input
								id="contact-subject"
								type="text"
								name="subject"
								autocomplete="off"
								bind:value={subject}
								disabled={sending}
								placeholder="—"
								class="form-input"
							/>
							{#if submitted && errors.subject}
								<p class="form-error">{errors.subject}</p>
							{/if}
						</div>

						<div class="form-field">
							<label for="contact-message" class="form-label">Message</label>
							<textarea
								id="contact-message"
								name="message"
								autocomplete="off"
								bind:value={message}
								disabled={sending}
								placeholder="—"
								rows="5"
								class="form-input form-textarea"
							></textarea>
							{#if submitted && errors.message}
								<p class="form-error">{errors.message}</p>
							{/if}
						</div>

						<div class="flex flex-col-reverse sm:flex-row sm:flex-wrap items-stretch sm:items-center sm:justify-between gap-6 pt-2 sm:pt-4">
							<p class="max-w-[36ch] font-mono text-[10px] sm:text-[11px] leading-[1.5] tracking-[0.14em] text-ink-muted uppercase">
								By writing to us, you agree to be contacted about your inquiry.
							</p>
							<button
								type="submit"
								disabled={sending}
								class="press group inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-3 rounded-md border border-seal bg-seal px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] text-paper uppercase shadow-sm transition-[background-color,border-color,box-shadow,opacity] duration-200 hover:bg-seal-deep hover:border-seal-deep hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:text-ink"
							>
								{#if sending}
									Sending…
								{:else}
									Send dispatch
									<Icon
										icon="solar:arrow-right-linear"
										width="14"
										height="14"
										class="transition-transform duration-300 group-hover:translate-x-1"
										style="transition-timing-function: var(--ease-out-strong);"
										aria-hidden="true"
									/>
								{/if}
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.form-field {
		position: relative;
	}

	.form-label {
		display: block;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--ink-muted);
		margin-bottom: 12px;
	}

	.form-input {
		width: 100%;
		background: transparent;
		border: 0;
		border-bottom: 1px solid var(--rule);
		padding: 10px 0 12px;
		color: var(--ink);
		font-family: var(--font-serif);
		font-size: 1.25rem;
		line-height: 1.4;
		transition: border-color 240ms var(--ease-out-strong);
		outline: none;
	}

	.form-input::placeholder {
		color: var(--ink-faint);
	}

	.form-input:focus {
		border-color: var(--seal);
	}

	.form-input:disabled {
		opacity: 0.5;
	}

	.form-textarea {
		resize: vertical;
		min-height: 6rem;
	}

	.form-error {
		margin-top: 10px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: oklch(60% 0.22 25);
	}
</style>
