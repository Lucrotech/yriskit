import Link from "next/link";
import { db } from "@/db";
import { hasDatabase, isCloudflareWorker } from "@/db/runtime";
import { products } from "@/db/schema";
import { PRODUCT_CATALOGUE } from "@/lib/catalogue";
import { formatRand } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { eq } from "drizzle-orm";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "RMCP programme pricing for South African accountable institutions. Pay once to generate your document, with optional annual support for renewal reminders and regeneration.",
  path: "/pricing",
});

export const dynamic = "force-dynamic";

type PricingItem = {
  id: string;
  slug: string;
  name: string;
  vertical: string;
  description: string;
  oneOffPriceCents: number;
  annualPriceCents: number;
  sortOrder: number;
};

function catalogueItems(): PricingItem[] {
  return PRODUCT_CATALOGUE.map((item) => ({
    id: item.slug,
    slug: item.slug,
    name: item.name,
    vertical: item.vertical,
    description: item.description,
    oneOffPriceCents: item.oneOffPriceCents,
    annualPriceCents: item.annualPriceCents,
    sortOrder: item.sortOrder,
  }));
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: selected } = await searchParams;
  const items: PricingItem[] = !hasDatabase()
    ? catalogueItems()
    : isCloudflareWorker()
      ? (await db
          .select()
          .from(products)
          .where(eq(products.isActive, true)))
          .sort((a, b) => a.sortOrder - b.sortOrder)
      : db
          .select()
          .from(products)
          .where(eq(products.isActive, true))
          .all()
          .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow">Fees</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">RMCP programmes</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Pay once to generate your RMCP. Add annual support for renewal
        reminders and one regeneration each year. Prices exclude VAT unless
        stated on your invoice.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => {
          const active = selected ? selected === item.slug : item.slug === "generic";
          return (
            <article
              key={item.id}
              className={`border bg-white p-6 ${active ? "border-navy" : "border-navy/10"}`}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-gold-dark">
                {item.vertical}
              </p>
              <h2 className="mt-2 font-serif text-2xl text-navy">{item.name}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{item.description}</p>
              <p className="mt-6 font-serif text-3xl text-navy">
                {formatRand(item.oneOffPriceCents)}
              </p>
              <p className="text-sm text-ink/60">one-off document generation</p>
              <p className="mt-2 text-sm text-ink/70">
                Optional annual support {formatRand(item.annualPriceCents)} / year
              </p>
              <Link href={`/register?product=${item.slug}`} className="btn-primary mt-6">
                Continue
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
