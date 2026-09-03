import Link from "next/link";
import { BrandDiamond } from "@/components/logo";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, pageMetadata, serviceJsonLd, webSiteJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "RMCP Compliance for Accountable Institutions",
  description:
    "Produce a board-ready Risk Management and Compliance Programme under the FIC Act. Locked legal wording, industry-specific controls, and immediate Word and PDF downloads.",
  path: "/",
});

const pillars = [
  {
    title: "FIC Act s42 wording",
    body: "The generated RMCP uses our locked legal text, aligned to Guidance Note 7A — not a blank template you have to interpret.",
  },
  {
    title: "Industry-specific controls",
    body: "Start with the generic programme, or choose a vertical for lawyers, motor dealers, accountants and other Schedule 1 businesses.",
  },
  {
    title: "Immediate download",
    body: "Pay with iKhokha, complete the questionnaire, and download a professional Word and PDF pack the same day.",
  },
];

const sectors = [
  "Banks, credit providers and insurers",
  "Attorneys and conveyancers",
  "Accountants and company service providers",
  "Motor vehicle and high-value goods dealers",
  "Estate agents and property practitioners",
  "Crypto asset service providers",
  "Remittance and money-value transfer",
  "Casinos and gambling operators",
];

export default function HomePage() {
  return (
    <main>
      <JsonLd
        data={[
          organizationJsonLd(),
          webSiteJsonLd(),
          serviceJsonLd({
            name: "RMCP document generation",
            description:
              "Online Risk Management and Compliance Programme drafting for South African accountable institutions.",
            path: "/",
          }),
        ]}
      />
      <section className="bg-navy text-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow !text-gold">Financial Intelligence Centre Act</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              RMCP compliance, documented with authority.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cream/75">
              Everything an accountable institution needs to produce a Risk
              Management and Compliance Programme — training-grade wording,
              a guided questionnaire, and a board-ready document you can
              download immediately.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/pricing" className="btn-primary">
                Get your RMCP
              </Link>
              <Link href="/how-it-works" className="btn-secondary !bg-transparent !text-cream !border-cream/30">
                How it works
              </Link>
            </div>
          </div>
          <blockquote className="self-center border-l-2 border-gold pl-6">
            <p className="font-serif text-2xl leading-snug text-white">
              “If you think compliance is expensive, try non-compliance.”
            </p>
            <footer className="mt-4 text-sm text-gold">
              Paul McNulty · Former U.S. Deputy Attorney General
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="eyebrow">Why Y Risk It</p>
        <h2 className="mt-3 font-serif text-3xl text-navy">
          Built for South African accountable institutions
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.title} className="border border-navy/10 bg-white p-6">
              <BrandDiamond className="mb-4 h-3 w-3 text-gold" />
              <h3 className="font-serif text-xl text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
          <div>
            <p className="eyebrow">Who we help</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">
              Schedule 1 institutions, without generic advice
            </h2>
            <p className="mt-4 leading-7 text-ink/70">
              At Y Risk It we help accountable institutions implement, manage
              and maintain a risk-based RMCP as required by the FIC Act —
              whether you are a financial services provider, legal firm, crypto
              platform or high-value goods dealer.
            </p>
            <Link href="/industries" className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-navy">
              View industries →
            </Link>
          </div>
          <ul className="grid gap-2 text-sm md:grid-cols-2">
            {sectors.map((sector) => (
              <li key={sector} className="border border-navy/10 bg-white px-4 py-3">
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["South African", "Specialists in FIC Act RMCP — not imported generic AML packs."],
            ["Aligned", "Wording mapped to s42 and Guidance Note 7A."],
            ["Immediate", "Pay, complete, download. No waiting on a consultant draft."],
            ["Accountable", "You keep a login, history, and renewal reminders."],
          ].map(([title, body]) => (
            <div key={title}>
              <BrandDiamond className="mb-3 h-2.5 w-2.5 text-teal" />
              <p className="font-serif text-2xl text-navy">{title}</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 border border-navy/10 bg-navy px-8 py-10 text-center text-cream">
          <h2 className="font-serif text-3xl">Ready to get compliant?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-cream/70">
            Choose a programme, pay securely via iKhokha, and generate a
            professional RMCP for board approval.
          </p>
          <Link href="/pricing" className="btn-primary mt-6 !bg-gold !text-navy">
            View pricing
          </Link>
        </div>
      </section>
    </main>
  );
}
