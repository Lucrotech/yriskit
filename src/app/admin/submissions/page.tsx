import { desc } from "drizzle-orm";
import { db } from "@/db";
import { products, submissions, user } from "@/db/schema";
import { formatDate } from "@/lib/utils";

export default async function SubmissionsPage() {
  const rows = db.select().from(submissions).orderBy(desc(submissions.updatedAt)).all();
  const people = db.select().from(user).all();
  const catalogue = db.select().from(products).all();
  return (
    <main>
      <h1 className="font-serif text-3xl text-navy">RMCP submissions</h1>
      <div className="mt-6 overflow-x-auto border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream">
            <tr>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Renews</th>
              <th className="px-3 py-2">Files</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-stone-200">
                <td className="px-3 py-2">{people.find((p) => p.id === row.userId)?.email}</td>
                <td className="px-3 py-2">{catalogue.find((p) => p.id === row.productId)?.name}</td>
                <td className="px-3 py-2">{row.status}</td>
                <td className="px-3 py-2">{formatDate(row.renewsAt)}</td>
                <td className="px-3 py-2">
                  {row.docxKey ? (
                    <>
                      <a className="underline" href={`/api/admin/download/${row.id}?format=docx`}>
                        Word
                      </a>{" "}
                      <a className="underline" href={`/api/admin/download/${row.id}?format=pdf`}>
                        PDF
                      </a>
                    </>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
