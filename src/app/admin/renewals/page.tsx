import { and, gte, isNotNull, lte } from "drizzle-orm";
import { db } from "@/db";
import { submissions, user } from "@/db/schema";
import { formatDate } from "@/lib/utils";

export default async function RenewalsPage() {
  const horizon = new Date();
  horizon.setDate(horizon.getDate() + 90);
  const rows = db
    .select()
    .from(submissions)
    .where(and(isNotNull(submissions.renewsAt), lte(submissions.renewsAt, horizon), gte(submissions.renewsAt, new Date(0))))
    .all()
    .filter((row) => row.renewsAt && Number(row.renewsAt) <= horizon.getTime());
  const people = db.select().from(user).all();
  return (
    <main>
      <h1 className="font-serif text-3xl text-navy">Renewals due in 90 days</h1>
      <ul className="mt-6 space-y-3">
        {rows.map((row) => (
          <li key={row.id} className="border border-navy/10 bg-white p-4 text-sm">
            {people.find((p) => p.id === row.userId)?.email} · renews {formatDate(row.renewsAt)}
          </li>
        ))}
        {rows.length === 0 ? <p className="text-ink/60">None due.</p> : null}
      </ul>
    </main>
  );
}
