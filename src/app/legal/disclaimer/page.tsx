export default function DisclaimerPage() {
  return (
    <main className="prose-legal mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-serif text-4xl">FIC and RMCP disclaimer</h1>
      <p className="mt-6 leading-7 text-ink/75">
        Y Risk It provides a documented Risk Management and Compliance
        Programme based on information you supply and on locked wording
        prepared for accountable institutions under the Financial Intelligence
        Centre Act, 38 of 2001.
      </p>
      <p className="mt-4 leading-7 text-ink/75">
        The accountable institution — through its board, senior management, or
        person with the highest authority — remains responsible for:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink/75">
        <li>approving the RMCP;</li>
        <li>implementing the controls described in it;</li>
        <li>training employees;</li>
        <li>registering on goAML and submitting reports to the FIC;</li>
        <li>keeping the programme current as the business and risks change.</li>
      </ul>
      <p className="mt-4 leading-7 text-ink/75">
        This service is not legal advice, not a FIC approval, and not a
        representation that the institution is compliant merely because a
        document was generated.
      </p>
    </main>
  );
}
