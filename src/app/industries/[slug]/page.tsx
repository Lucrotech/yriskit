import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "../page";

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = industries.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="eyebrow">Industry RMCP</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">{item.title}</h1>
      <p className="mt-6 text-lg leading-8 text-ink/70">{item.body}</p>
      <p className="mt-6 leading-7 text-ink/70">
        The legal core of the document stays identical to the official Y Risk It
        RMCP. Vertical products inject additional control language that your
        administrators can also edit later.
      </p>
      <Link href={`/pricing?product=${item.product}`} className="btn-primary mt-8">
        Buy this RMCP
      </Link>
    </main>
  );
}
