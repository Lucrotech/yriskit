import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Speak to Y Risk It</h1>
      <p className="mt-4 text-lg text-ink/70">
        For RMCP programmes, renewals and industry wording.
      </p>
      <ContactForm />
    </main>
  );
}
