"use server";

import { sendContactEmail } from "@/lib/resend";

export type ContactState = {
  success?: boolean;
  error?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = (formData.get("company") as string) || "";
  const message = formData.get("message") as string;
  const honeypot = formData.get("website") as string; // spam trap

  // Honeypot check
  if (honeypot) {
    // Bot filled in the hidden field — pretend success
    return { success: true };
  }

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { error: "Please fill in all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    await sendContactEmail({ name: name.trim(), email: email.trim(), company: company.trim(), message: message.trim() });
    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { error: "Something went wrong. Please try again or email me directly." };
  }
}
