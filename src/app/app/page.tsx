import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, products, submissions } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { formatDate, formatRand } from "@/lib/utils";

export default async function AppHome() {
  const session = await requireUser();
  const myOrders = db
    .select()
    .from(orders)
    .where(eq(orders.userId, session.user.id))
    .all()
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  const mySubs = db
    .select()
    .from(submissions)
    .where(eq(submissions.userId, session.user.id))
    .orderBy(desc(submissions.createdAt))
    .all();
  const paid = myOrders.some((o) => o.status === "paid");
  const catalogue = db.select().from(products).all();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1 className="mt-2 font-serif text-4xl text-navy">
            {session.user.name || "Your RMCP"}
          </h1>
          <p className="mt-2 text-ink/70">{session.user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/app/profile" className="btn-secondary">
            Profile
          </Link>
          <Link href="/app/checkout" className="btn-primary">
            {paid ? "New RMCP" : "Purchase RMCP"}
          </Link>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-navy">Your programmes</h2>
        {mySubs.length === 0 ? (
          <p className="mt-4 border border-navy/10 bg-white p-6 text-ink/70">
            No RMCP yet. Purchase a product to unlock the questionnaire.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto border border-navy/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-cream text-navy">
                <tr>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Renews</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {mySubs.map((sub) => {
                  const product = catalogue.find((p) => p.id === sub.productId);
                  return (
                    <tr key={sub.id} className="border-t border-stone-200">
                      <td className="px-4 py-3 capitalize">{sub.status.replace("_", " ")}</td>
                      <td className="px-4 py-3">{product?.name}</td>
                      <td className="px-4 py-3">{formatDate(sub.updatedAt)}</td>
                      <td className="px-4 py-3">{formatDate(sub.renewsAt)}</td>
                      <td className="px-4 py-3 text-right">
                        {sub.status === "generated" ? (
                          <div className="flex justify-end gap-3">
                            <a className="underline" href={`/api/rmcp/${sub.id}/download?format=docx`}>
                              Word
                            </a>
                            <a className="underline" href={`/api/rmcp/${sub.id}/download?format=pdf`}>
                              PDF
                            </a>
                          </div>
                        ) : (
                          <Link className="underline" href={`/app/rmcp/${sub.id}/wizard`}>
                            Continue
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-navy">Payments</h2>
        <div className="mt-4 overflow-x-auto border border-navy/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-navy">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Annual</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order.id} className="border-t border-stone-200">
                  <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3">{formatRand(order.amountCents)}</td>
                  <td className="px-4 py-3 capitalize">{order.status}</td>
                  <td className="px-4 py-3">{order.includesAnnual ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
