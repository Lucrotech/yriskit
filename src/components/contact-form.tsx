"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/contact/actions";

const initialState: ContactState = { ok: false };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  if (state.ok) {
    return (
      <div className="mt-10 border border-navy/10 bg-white p-6">
        <p className="font-serif text-2xl text-navy">Message sent</p>
        <p className="mt-3 text-sm leading-6 text-ink/70">
          Thank you. We will reply to the email address you provided.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-10 space-y-4 border border-navy/10 bg-white p-6">
      <label className="block sr-only" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      </label>
      <label className="block">
        <span className="label">Full name</span>
        <input name="name" required maxLength={120} className="input" autoComplete="name" />
      </label>
      <label className="block">
        <span className="label">Email</span>
        <input name="email" type="email" required className="input" autoComplete="email" />
      </label>
      <label className="block">
        <span className="label">Organisation</span>
        <input name="organisation" maxLength={160} className="input" autoComplete="organization" />
      </label>
      <label className="block">
        <span className="label">Phone</span>
        <input name="phone" type="tel" maxLength={40} className="input" autoComplete="tel" />
      </label>
      <label className="block">
        <span className="label">Message</span>
        <textarea name="message" required minLength={10} maxLength={4000} rows={6} className="input min-h-32" />
      </label>
      {state.error ? (
        <p className="text-sm text-red-700" aria-live="polite">
          {state.error}
        </p>
      ) : null}
      <button className="btn-primary" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
