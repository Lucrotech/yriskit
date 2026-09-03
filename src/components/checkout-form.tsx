"use client";

import { useState } from "react";
import { formatRand } from "@/lib/utils";

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  oneOffPriceCents: number;
  annualPriceCents: number;
};

export function CheckoutForm({
  products,
  defaultSlug,
}: {
  products: Product[];
  defaultSlug: string;
}) {
  const [slug, setSlug] = useState(defaultSlug);
  const [annual, setAnnual] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const selected = products.find((p) => p.slug === slug) || products[0];
  const total = selected
    ? selected.oneOffPriceCents + (annual ? selected.annualPriceCents : 0)
    : 0;

  async function pay() {
    setPending(true);
    setError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: selected.id, annual }),
    });
    const body = await res.json();
    setPending(false);
    if (!res.ok) {
      setError(body.error || "Checkout failed.");
      return;
    }
    window.location.href = body.url;
  }

  return (
    <div className="mt-8 space-y-5 border border-navy/10 bg-white p-6">
      <label className="block">
        <span className="label">Programme</span>
        <select className="input" value={slug} onChange={(e) => setSlug(e.target.value)}>
          {products.map((p) => (
            <option key={p.id} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm text-ink/70">{selected?.description}</p>
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={annual}
          onChange={(e) => setAnnual(e.target.checked)}
          className="mt-1"
        />
        <span>
          Add annual support ({formatRand(selected?.annualPriceCents || 0)} / year)
          for renewal reminders and one regeneration.
        </span>
      </label>
      <p className="font-serif text-3xl text-navy">{formatRand(total)}</p>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button className="btn-primary" onClick={pay} disabled={pending || !selected}>
        {pending ? "Redirecting…" : "Pay with iKhokha"}
      </button>
    </div>
  );
}
