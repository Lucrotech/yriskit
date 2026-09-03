import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Y Risk It about RMCP programmes, renewals, industry wording and accountable institution compliance under the FIC Act.",
  path: "/contact",
});

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
