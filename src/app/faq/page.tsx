import { FAQS } from "@/lib/faqs";
import { faqPageJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata = pageMetadata({
  title: "Frequently asked questions",
  description:
    "Answers about RMCP requirements, FIC Act compliance, reviews, payments, refunds and industry-specific programmes from Y Risk It.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={faqPageJsonLd([...FAQS])} />
      <p className="eyebrow">Questions</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Frequently asked questions</h1>
      <dl className="mt-10 space-y-8">
        {FAQS.map((item) => (
          <div key={item.q}>
            <dt className="font-serif text-xl text-navy">{item.q}</dt>
            <dd className="mt-2 leading-7 text-ink/70">{item.a}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
