"use server";

import { sendEmail } from "@/lib/email";

export type ContactState = {
  ok: boolean;
  error?: string;
};

const inbox =
  process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL || "hello@yriskit.co.za";

function text(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (text(formData, "website")) {
    return { ok: true };
  }

  const name = text(formData, "name");
  const email = text(formData, "email");
  const organisation = text(formData, "organisation");
  const phone = text(formData, "phone");
  const message = text(formData, "message");

  if (name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!validEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return { ok: false, error: "Please include a short message." };
  }
  if (message.length > 4000) {
    return { ok: false, error: "Please keep your message under 4 000 characters." };
  }

  const html = `
    <div style="font-family:Georgia,serif;color:#1c1917;line-height:1.6">
      <p>New website enquiry</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${organisation ? `<p><strong>Organisation:</strong> ${escapeHtml(organisation)}</p>` : ""}
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    </div>
  `;

  const result = await sendEmail(
    inbox,
    `Website enquiry from ${name}`,
    html,
    { replyTo: email },
  );

  if (!result.ok) {
    return {
      ok: false,
      error: "Could not send your message. Please try again in a moment.",
    };
  }

  return { ok: true };
}
