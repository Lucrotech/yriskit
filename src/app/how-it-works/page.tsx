import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Choose the programme",
    body: "Select the generic RMCP or an industry vertical. Optional annual support includes a yearly regeneration and reminder emails.",
  },
  {
    n: "02",
    title: "Create an account and pay",
    body: "Checkout uses iKhokha (cards, Instant EFT and wallets). Payment unlocks the questionnaire for your organisation.",
  },
  {
    n: "03",
    title: "Complete the RMCP wizard",
    body: "The same information previously collected in Tally — organisation, officers, policies, directors and staff — with save-and-resume.",
  },
  {
    n: "04",
    title: "Download immediately",
    body: "We merge your answers into the official RMCP wording and produce a professional Word file and a board-ready PDF.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow">Process</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">How the RMCP is produced</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
        Section 42 of the FIC Act requires every accountable institution to
        develop, document, maintain and implement a Risk Management and
        Compliance Programme. Y Risk It turns that obligation into a controlled
        document you can approve internally.
      </p>
      <ol className="mt-12 space-y-8">
        {steps.map((step) => (
          <li key={step.n} className="grid gap-4 border-t border-navy/10 pt-8 md:grid-cols-[80px_1fr]">
            <span className="font-serif text-3xl text-gold">{step.n}</span>
            <div>
              <h2 className="font-serif text-2xl text-navy">{step.title}</h2>
              <p className="mt-2 leading-7 text-ink/70">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-12 border border-navy/10 bg-cream p-6 text-sm leading-6 text-ink/80">
        The generated file is a customized programme, not a rubber stamp.
        Your board or senior management must still approve it, implement the
        controls, train staff, and keep it current. See our{" "}
        <Link href="/legal/disclaimer" className="underline">
          FIC disclaimer
        </Link>
        .
      </p>
      <Link href="/pricing" className="btn-primary mt-8">
        Get started
      </Link>
    </main>
  );
}
