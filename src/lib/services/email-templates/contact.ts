import type { ContactForm } from '$lib/schemas/contact';

export function generate(data: ContactForm): string {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
	<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 32px 16px;">
		<tr>
			<td align="center">
				<table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
					<tr>
						<td style="background-color: #0f172a; padding: 24px 32px;">
							<h1 style="margin: 0; color: #06b6d4; font-size: 20px; font-weight: 700;">
								New Contact Form Submission
							</h1>
						</td>
					</tr>
					<tr>
						<td style="padding: 32px;">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td style="padding: 0 0 20px 0;">
										<p style="margin: 0 0 4px 0; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Name</p>
										<p style="margin: 0; font-size: 16px; color: #18181b;">${escapeHtml(data.name)}</p>
									</td>
								</tr>
								<tr>
									<td style="padding: 0 0 20px 0;">
										<p style="margin: 0 0 4px 0; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Email</p>
										<p style="margin: 0; font-size: 16px; color: #18181b;">
											<a href="mailto:${escapeHtml(data.email)}" style="color: #06b6d4; text-decoration: none;">${escapeHtml(data.email)}</a>
										</p>
									</td>
								</tr>
								<tr>
									<td style="padding: 0 0 20px 0;">
										<p style="margin: 0 0 4px 0; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Subject</p>
										<p style="margin: 0; font-size: 16px; color: #18181b;">${escapeHtml(data.subject)}</p>
									</td>
								</tr>
								<tr>
									<td style="padding: 0 0 8px 0;">
										<p style="margin: 0 0 4px 0; font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Message</p>
										<div style="margin: 0; font-size: 16px; color: #18181b; line-height: 1.6; background-color: #f9fafb; padding: 16px; border-radius: 6px; border: 1px solid #e4e4e7;">
											${escapeHtml(data.message).replace(/\n/g, '<br />')}
										</div>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td style="padding: 16px 32px; background-color: #f9fafb; border-top: 1px solid #e4e4e7;">
							<p style="margin: 0; font-size: 12px; color: #a1a1aa;">
								Sent from the Accountech website contact form
							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
