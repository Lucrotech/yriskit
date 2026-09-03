import Link from "next/link";

export const industries = [
  {
    slug: "lawyers",
    title: "Legal practitioners",
    product: "lawyers",
    summary: "Attorneys, notaries and conveyancers handling property, trust money and client funds.",
    body: "Legal practices that transfer property, manage trust accounts or form legal persons are accountable institutions. The lawyer RMCP adds trust-account, conveyancing and mandate-level CDD language to the locked FIC core.",
  },
  {
    slug: "dealers",
    title: "Motor dealers & high-value goods",
    product: "dealers",
    summary: "Vehicle, jewellery, art, boat and aircraft dealers taking large cash payments.",
    body: "High-value goods dealers are in Schedule 1 when cash thresholds are met. The dealer RMCP emphasises cash, third-party payments and delivery controls.",
  },
  {
    slug: "accountants",
    title: "Accountants & company service providers",
    product: "accountants",
    summary: "Accountants, auditors and TCSPs that form companies, manage client assets or tax affairs.",
    body: "Company formation, nominee services and client-fund administration create ML/TF exposure. This vertical adds beneficial-ownership and structure-risk clauses.",
  },
  {
    slug: "financial",
    title: "Financial services",
    product: "generic",
    summary: "Credit providers, FSPs, insurers, forex and investment managers.",
    body: "Use the generic RMCP as the baseline and describe products, delivery channels and client types in the wizard. Additional vertical wording can be added by our team in admin.",
  },
  {
    slug: "estate",
    title: "Estate agents & property practitioners",
    product: "generic",
    summary: "Agencies and rental practitioners handling deposits and transfers.",
    body: "Property is a well-known ML typology. Complete the generic RMCP and record PPRA membership, deposits and beneficial ownership of buyers and sellers.",
  },
  {
    slug: "crypto",
    title: "Crypto & remittance",
    product: "generic",
    summary: "CASPs, exchanges, wallets and money or value transfer services.",
    body: "Crypto asset service providers and remittance businesses should document travel-rule, sanctions and cross-border exposure in the wizard free-text fields.",
  },
];

export default function IndustriesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Schedule 1</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Who we help</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Accountable institutions as defined in the FIC Act, with extra RMCP
        products for the verticals that need them most.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {industries.map((item) => (
          <Link
            key={item.slug}
            href={`/industries/${item.slug}`}
            className="border border-navy/10 bg-white p-6 hover:border-navy"
          >
            <h2 className="font-serif text-2xl text-navy">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{item.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
