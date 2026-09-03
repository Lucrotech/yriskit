const faqs = [
  {
    q: "Is a template RMCP enough for the FIC?",
    a: "No. FIC Guidance Note 7A is clear that an RMCP must be unique to the institution. Y Risk It captures your particulars and officers, then places them into locked legal wording. Your board must still approve and implement it.",
  },
  {
    q: "Do you file the RMCP with the FIC?",
    a: "You remain responsible for goAML registration, the Risk and Compliance Return, and any filing your supervisor requires. We produce the programme document.",
  },
  {
    q: "How often must we review it?",
    a: "The programme uses a 12-month review cycle. Annual support sends reminders at 60, 30 and 7 days before the due date.",
  },
  {
    q: "Can we add a vertical later?",
    a: "Yes. Administrators can attach extra clause blocks for lawyers, dealers, accountants and other industries without changing the locked FIC core.",
  },
  {
    q: "How do we pay?",
    a: "Checkout is processed by iKhokha. Card, Instant EFT and digital wallets are supported on their hosted payment page.",
  },
  {
    q: "Can I get a refund after I pay?",
    a: "Platform access is a non-refundable digital product once granted. See the refund and cancellation policy. POPIA still lets you ask us to delete personal data.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Questions</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Frequently asked questions</h1>
      <dl className="mt-10 space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="font-serif text-xl text-navy">{item.q}</dt>
            <dd className="mt-2 leading-7 text-ink/70">{item.a}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
