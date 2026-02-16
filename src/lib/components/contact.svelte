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

<section id="contact" class="relative bg-surface px-5 py-16 sm:px-6 sm:py-28">
	<div
		class="pointer-events-none absolute inset-0"
		aria-hidden="true"
		style="background: radial-gradient(ellipse 60% 50% at 70% 30%, rgba(6, 182, 212, 0.04), transparent);"
	></div>

	<div class="relative mx-auto max-w-6xl">
		<div class="mb-10 sm:mb-16">
			<span class="font-rajdhani text-sm font-bold tracking-widest text-teal uppercase">Contact</span>
			<h2 class="mt-3 font-rajdhani text-3xl font-bold text-heading sm:text-4xl md:text-5xl lg:text-6xl">
				Get in Touch
			</h2>
			<p class="mt-4 max-w-lg text-lg text-body">
				Ready to transform your business? Let's talk.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 sm:gap-16 lg:grid-cols-5">
			<div class="space-y-8 lg:col-span-2">
				<div class="flex items-start gap-4">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<rect x="2" y="4" width="20" height="16" rx="2"></rect>
							<path d="M22 4 12 13 2 4"></path>
						</svg>
					</div>
					<div>
						<p class="text-xs font-medium uppercase tracking-wider text-muted">Email</p>
						<a href="mailto:accntech.dev@gmail.com" class="mt-1 block text-secondary transition-colors hover:text-teal">
							accntech.dev@gmail.com
						</a>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
						</svg>
					</div>
					<div>
						<p class="text-xs font-medium uppercase tracking-wider text-muted">Phone</p>
						<span class="mt-1 block text-secondary">+63 995 294 2417</span>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
					</div>
					<div>
						<p class="text-xs font-medium uppercase tracking-wider text-muted">Location</p>
						<span class="mt-1 block text-secondary">Oriental Mindoro, Philippines</span>
					</div>
				</div>
			</div>

			<div class="lg:col-span-3">
				{#if success}
					<div class="flex items-center gap-3 rounded-xl border border-teal/20 bg-teal/5 p-8">
						<svg class="h-6 w-6 shrink-0 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p class="font-medium text-teal">Thank you! We'll be in touch soon.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-5" novalidate>
						<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
							<div>
								<label for="contact-name" class="mb-2 block text-sm font-medium text-secondary">Name</label>
								<input
									id="contact-name"
									type="text"
									bind:value={name}
									placeholder="Your name"
									class="w-full rounded-full border border-divider bg-field px-4 py-3.5 text-secondary placeholder-faint outline-none transition-all duration-300 focus:border-teal/50 focus:bg-field-focus focus:ring-1 focus:ring-teal/30"
								/>
								{#if submitted && errors.name}
									<p class="mt-1.5 text-sm text-red-400">{errors.name}</p>
								{/if}
							</div>
							<div>
								<label for="contact-email" class="mb-2 block text-sm font-medium text-secondary">Email</label>
								<input
									id="contact-email"
									type="email"
									bind:value={email}
									placeholder="your@email.com"
									class="w-full rounded-full border border-divider bg-field px-4 py-3.5 text-secondary placeholder-faint outline-none transition-all duration-300 focus:border-teal/50 focus:bg-field-focus focus:ring-1 focus:ring-teal/30"
								/>
								{#if submitted && errors.email}
									<p class="mt-1.5 text-sm text-red-400">{errors.email}</p>
								{/if}
							</div>
						</div>

						<div>
							<label for="contact-subject" class="mb-2 block text-sm font-medium text-secondary">Subject</label>
							<input
								id="contact-subject"
								type="text"
								bind:value={subject}
								placeholder="How can we help?"
								class="w-full rounded-full border border-divider bg-field px-4 py-3.5 text-secondary placeholder-faint outline-none transition-all duration-300 focus:border-teal/50 focus:bg-field-focus focus:ring-1 focus:ring-teal/30"
							/>
							{#if submitted && errors.subject}
								<p class="mt-1.5 text-sm text-red-400">{errors.subject}</p>
							{/if}
						</div>

						<div>
							<label for="contact-message" class="mb-2 block text-sm font-medium text-secondary">Message</label>
							<textarea
								id="contact-message"
								bind:value={message}
								placeholder="Tell us about your project..."
								rows="5"
								class="w-full resize-none rounded-3xl border border-divider bg-field px-4 py-3.5 text-secondary placeholder-faint outline-none transition-all duration-300 focus:border-teal/50 focus:bg-field-focus focus:ring-1 focus:ring-teal/30"
							></textarea>
							{#if submitted && errors.message}
								<p class="mt-1.5 text-sm text-red-400">{errors.message}</p>
							{/if}
						</div>

						<button
							type="submit"
							class="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal py-4 font-semibold text-navy-dark transition-all duration-300 hover:bg-teal-light hover:shadow-lg hover:shadow-teal/20 sm:w-auto sm:px-10"
						>
							Send Message
							<svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>
