<script lang="ts">
	import { contactSchema, type ContactForm } from '$lib/schemas/contact';

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	let errors: Record<string, string> = $state({});
	let submitted = $state(false);
	let success = $state(false);

	function handleSubmit(e: SubmitEvent) {
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
		success = true;
		name = '';
		email = '';
		subject = '';
		message = '';

		setTimeout(() => {
			success = false;
			submitted = false;
		}, 5000);
	}
</script>

<section id="contact" class="bg-navy-dark py-24 px-6">
	<div class="mx-auto max-w-6xl">
		<!-- Section heading -->
		<div class="mb-16 text-center">
			<h2 class="font-[family-name:var(--font-syne)] text-4xl font-bold text-white md:text-5xl">
				Get in Touch
			</h2>
			<div class="mx-auto mt-4 h-1 w-16 rounded-full bg-teal"></div>
			<p class="mt-6 font-[family-name:var(--font-outfit)] text-lg text-slate-400">
				Ready to transform your business? Let's talk.
			</p>
		</div>

		<!-- Two-column layout -->
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-5">
			<!-- Left column: Contact info -->
			<div class="lg:col-span-2">
				<div class="space-y-6">
					<!-- Email -->
					<div class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-5 w-5 shrink-0 text-teal"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect x="2" y="4" width="20" height="16" rx="2"></rect>
							<path d="M22 4 12 13 2 4"></path>
						</svg>
						<a href="mailto:hello@accountech.ph" class="text-slate-300 transition-colors hover:text-teal">
							hello@accountech.ph
						</a>
					</div>

					<!-- Phone -->
					<div class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-5 w-5 shrink-0 text-teal"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
							></path>
						</svg>
						<span class="text-slate-300">+63 XXX XXX XXXX</span>
					</div>

					<!-- Address -->
					<div class="flex items-start gap-3">
						<svg
							class="mt-0.5 h-5 w-5 shrink-0 text-teal"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
						<span class="text-slate-300">Metro Manila, Philippines</span>
					</div>
				</div>

				<!-- Social links -->
				<div class="mt-10 flex items-center gap-4">
					<!-- Facebook -->
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-teal transition-colors hover:text-teal-light"
						aria-label="Facebook"
					>
						<svg
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
						</svg>
					</a>

					<!-- LinkedIn -->
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-teal transition-colors hover:text-teal-light"
						aria-label="LinkedIn"
					>
						<svg
							class="h-6 w-6"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
							<rect x="2" y="9" width="4" height="12"></rect>
							<circle cx="4" cy="4" r="2"></circle>
						</svg>
					</a>
				</div>
			</div>

			<!-- Right column: Contact form -->
			<div class="lg:col-span-3">
				{#if success}
					<div class="rounded-lg border border-teal/30 bg-teal/10 p-6 text-center">
						<p class="font-[family-name:var(--font-outfit)] text-lg font-medium text-teal">
							Thank you! We'll be in touch soon.
						</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-5" novalidate>
						<!-- Name -->
						<div>
							<label
								for="contact-name"
								class="mb-1.5 block font-[family-name:var(--font-outfit)] text-sm text-slate-300"
							>
								Name
							</label>
							<input
								id="contact-name"
								type="text"
								bind:value={name}
								placeholder="Your name"
								class="w-full rounded-lg border border-slate-700 bg-navy-light px-4 py-3 text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
							/>
							{#if submitted && errors.name}
								<p class="mt-1 text-sm text-red-400">{errors.name}</p>
							{/if}
						</div>

						<!-- Email -->
						<div>
							<label
								for="contact-email"
								class="mb-1.5 block font-[family-name:var(--font-outfit)] text-sm text-slate-300"
							>
								Email
							</label>
							<input
								id="contact-email"
								type="email"
								bind:value={email}
								placeholder="your@email.com"
								class="w-full rounded-lg border border-slate-700 bg-navy-light px-4 py-3 text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
							/>
							{#if submitted && errors.email}
								<p class="mt-1 text-sm text-red-400">{errors.email}</p>
							{/if}
						</div>

						<!-- Subject -->
						<div>
							<label
								for="contact-subject"
								class="mb-1.5 block font-[family-name:var(--font-outfit)] text-sm text-slate-300"
							>
								Subject
							</label>
							<input
								id="contact-subject"
								type="text"
								bind:value={subject}
								placeholder="How can we help?"
								class="w-full rounded-lg border border-slate-700 bg-navy-light px-4 py-3 text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
							/>
							{#if submitted && errors.subject}
								<p class="mt-1 text-sm text-red-400">{errors.subject}</p>
							{/if}
						</div>

						<!-- Message -->
						<div>
							<label
								for="contact-message"
								class="mb-1.5 block font-[family-name:var(--font-outfit)] text-sm text-slate-300"
							>
								Message
							</label>
							<textarea
								id="contact-message"
								bind:value={message}
								placeholder="Tell us about your project..."
								rows="5"
								class="w-full resize-none rounded-lg border border-slate-700 bg-navy-light px-4 py-3 text-slate-200 placeholder-slate-500 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal"
							></textarea>
							{#if submitted && errors.message}
								<p class="mt-1 text-sm text-red-400">{errors.message}</p>
							{/if}
						</div>

						<!-- Submit button -->
						<button
							type="submit"
							class="w-full rounded-lg bg-teal py-3 font-[family-name:var(--font-outfit)] font-semibold text-white transition-colors hover:bg-teal-dark"
						>
							Send Message
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
