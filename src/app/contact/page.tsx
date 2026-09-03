export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Speak to Y Risk It</h1>
      <p className="mt-4 text-lg text-ink/70">
        For RMCP programmes, renewals and industry wording.
      </p>
      <div className="mt-10 space-y-4 border border-navy/10 bg-white p-6 text-sm leading-7">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:jackie@yriskit.co.za">jackie@yriskit.co.za</a>
        </p>
        <p>
          <strong>Registered office:</strong> 2 Hartog Street, De Zalze
          Winelands Estate, Stellenbosch 7600
        </p>
        <p>
          <strong>Company:</strong> Y RISK IT (Pty) Ltd · 2024/622275/07
        </p>
      </div>
    </main>
  );
}
