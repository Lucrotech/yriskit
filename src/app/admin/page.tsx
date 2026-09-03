import { count, eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, submissions, user } from "@/db/schema";

export default async function AdminHome() {
  const users = db.select({ value: count() }).from(user).get()?.value || 0;
  const paid = db.select({ value: count() }).from(orders).where(eq(orders.status, "paid")).get()?.value || 0;
  const completed =
    db.select({ value: count() }).from(submissions).where(eq(submissions.status, "generated")).get()?.value || 0;
  const drafts =
    db.select({ value: count() }).from(submissions).where(eq(submissions.status, "in_progress")).get()?.value || 0;

  return (
    <main>
      <h1 className="font-serif text-3xl text-navy">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {[
          ["Signups", users],
          ["Paid orders", paid],
          ["Generated RMCPs", completed],
          ["In progress", drafts],
        ].map(([label, value]) => (
          <div key={String(label)} className="border border-navy/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-gold-dark">{label}</p>
            <p className="mt-2 font-serif text-3xl text-navy">{value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
