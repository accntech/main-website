import { env } from "$env/dynamic/private";
import { generate as generateContactBody } from "./email-templates/contact";
import type { ContactForm } from "$lib/schemas/contact";

type EmailPayload = {
  from: EmailContact;
  to: EmailContact[];
  subject: string;
  html: string;
};

type EmailContact = {
  address: string;
  display_name?: string;
};

export const sendContactEmail = async (
  data: ContactForm,
): Promise<{ success: boolean; error?: string }> => {
  const html = generateContactBody(data);

  const {
    MAILEROO_BASE_URL,
    MAILEROO_API_KEY,
    MAILEROO_SENDER_EMAIL,
    MAILEROO_SENDER_NAME,
    CONTACT_RECIPIENT_EMAIL,
  } = env;

  if (
    !MAILEROO_BASE_URL ||
    !MAILEROO_API_KEY ||
    !MAILEROO_SENDER_EMAIL ||
    !CONTACT_RECIPIENT_EMAIL
  ) {
    console.error("Email environment variables:", {
      MAILEROO_BASE_URL,
      MAILEROO_API_KEY: MAILEROO_API_KEY ? "***" : undefined,
      MAILEROO_SENDER_EMAIL,
      CONTACT_RECIPIENT_EMAIL,
    });
    console.error("Missing required email environment variables");
    return { success: false, error: "Email service not configured" };
  }

  const payload: EmailPayload = {
    from: {
      address: MAILEROO_SENDER_EMAIL,
      display_name: MAILEROO_SENDER_NAME || "Accountech",
    },
    to: [
      {
        address: CONTACT_RECIPIENT_EMAIL,
        display_name: "Accountech",
      },
    ],
    subject: `Contact Form: ${data.subject}`,
    html,
  };

  try {
    const response = await fetch(MAILEROO_BASE_URL, {
      method: "POST",
      headers: {
        "x-api-key": MAILEROO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Email send failed:", errorText);
      return {
        success: false,
        error: `Email service error: ${response.status}`,
      };
    }

    return { success: true };
  } catch (e) {
    console.error("Email send error:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};
