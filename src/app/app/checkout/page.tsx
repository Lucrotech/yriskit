import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { CheckoutForm } from "@/components/checkout-form";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  await requireUser();
  const { product } = await searchParams;
  const items = db.select().from(products).where(eq(products.isActive, true)).all();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="eyebrow">Checkout</p>
      <h1 className="mt-2 font-serif text-4xl text-navy">Pay for your RMCP</h1>
      <p className="mt-3 text-ink/70">
        You will be redirected to iKhokha. After a successful payment the wizard
        unlocks immediately.
      </p>
      <CheckoutForm products={items} defaultSlug={product || "generic"} />
    </main>
  );
}
