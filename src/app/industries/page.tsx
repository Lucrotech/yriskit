import Link from "next/link";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "RMCP programmes for South African Schedule 1 accountable institutions, including legal practitioners, motor dealers, accountants, estate agents and crypto service providers.",
  path: "/industries",
});

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
