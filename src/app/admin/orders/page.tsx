import { desc } from "drizzle-orm";
import { db } from "@/db";
import { orders, products, user } from "@/db/schema";
import { formatDate, formatRand } from "@/lib/utils";

export default async function OrdersPage() {
  const rows = db.select().from(orders).orderBy(desc(orders.createdAt)).all();
  const people = db.select().from(user).all();
  const catalogue = db.select().from(products).all();
  return (
    <main>
      <h1 className="font-serif text-3xl text-navy">Orders</h1>
      <div className="mt-6 overflow-x-auto border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-stone-200">
                <td className="px-3 py-2">{formatDate(row.createdAt)}</td>
                <td className="px-3 py-2">
                  {people.find((p) => p.id === row.userId)?.email}
                </td>
                <td className="px-3 py-2">
                  {catalogue.find((p) => p.id === row.productId)?.name}
                </td>
                <td className="px-3 py-2">{formatRand(row.amountCents)}</td>
                <td className="px-3 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
