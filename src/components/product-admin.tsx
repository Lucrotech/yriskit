"use client";

import { useRouter } from "next/navigation";
import { formatRand } from "@/lib/utils";

type Product = {
  id: string;
  slug: string;
  name: string;
  vertical: string;
  description: string;
  oneOffPriceCents: number;
  annualPriceCents: number;
  isActive: boolean;
};
type Clause = {
  id: string;
  productId: string | null;
  title: string;
  body: string;
  isActive: boolean;
};

export function ProductAdmin({
  products,
  clauses,
}: {
  products: Product[];
  clauses: Clause[];
}) {
  const router = useRouter();

  async function createProduct(formData: FormData) {
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        slug: formData.get("slug"),
        vertical: formData.get("vertical"),
        description: formData.get("description"),
        oneOffPriceCents: Number(formData.get("oneOff")) * 100,
        annualPriceCents: Number(formData.get("annual")) * 100,
      }),
    });
    router.refresh();
  }

  async function createClause(formData: FormData) {
    await fetch("/api/admin/clauses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: formData.get("productId"),
        title: formData.get("title"),
        body: formData.get("body"),
      }),
    });
    router.refresh();
  }

  return (
    <div className="mt-8 space-y-10">
      {products.map((product) => (
        <article key={product.id} className="border border-navy/10 bg-white p-5">
          <h2 className="font-serif text-xl text-navy">{product.name}</h2>
          <p className="text-sm text-ink/60">
            {product.slug} · {formatRand(product.oneOffPriceCents)} +{" "}
            {formatRand(product.annualPriceCents)} annual
          </p>
          <p className="mt-2 text-sm">{product.description}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {clauses
              .filter((c) => c.productId === product.id)
              .map((c) => (
                <li key={c.id} className="bg-cream p-3">
                  <strong>{c.title}</strong>
                  <p className="mt-1 text-ink/70">{c.body}</p>
                </li>
              ))}
          </ul>
        </article>
      ))}

      <form action={createProduct} className="space-y-3 border border-navy/10 bg-cream p-5">
        <h3 className="font-serif text-lg text-navy">Add vertical product</h3>
        <input name="name" required placeholder="Name" className="input" />
        <input name="slug" required placeholder="slug-e.g-estate" className="input" />
        <input name="vertical" required placeholder="vertical key" className="input" />
        <textarea name="description" required placeholder="Description" className="input min-h-20" />
        <input name="oneOff" type="number" required placeholder="One-off ZAR" className="input" />
        <input name="annual" type="number" required placeholder="Annual ZAR" className="input" />
        <button className="btn-primary">Create product</button>
      </form>

      <form action={createClause} className="space-y-3 border border-navy/10 bg-cream p-5">
        <h3 className="font-serif text-lg text-navy">Add clause block</h3>
        <select name="productId" className="input" required>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input name="title" required placeholder="Clause title" className="input" />
        <textarea name="body" required placeholder="Locked-style legal wording" className="input min-h-28" />
        <button className="btn-primary">Attach clause</button>
      </form>
    </div>
  );
}
