import { db } from "@/db";
import { clauseBlocks, products } from "@/db/schema";
import { formatRand } from "@/lib/utils";
import { ProductAdmin } from "@/components/product-admin";

export default async function ProductsAdminPage() {
  const items = db.select().from(products).all();
  const clauses = db.select().from(clauseBlocks).all();
  return (
    <main>
      <h1 className="font-serif text-3xl text-navy">Products and clauses</h1>
      <p className="mt-2 text-sm text-ink/70">
        Core FIC wording stays locked in the Word template. Vertical products
        attach extra clause blocks that appear in the generated PDF annexure.
      </p>
      <ProductAdmin
        products={items.map((p) => ({
          ...p,
          createdAt: Number(p.createdAt),
        }))}
        clauses={clauses.map((c) => ({
          ...c,
          createdAt: Number(c.createdAt),
        }))}
      />
    </main>
  );
}
