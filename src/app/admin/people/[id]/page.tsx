import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { crmNotes, crmTags, orders, organizations, submissions, user } from "@/db/schema";
import { formatDate, formatRand } from "@/lib/utils";
import { CrmForm } from "@/components/crm-form";

export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const person = db.select().from(user).where(eq(user.id, id)).get();
  if (!person) notFound();
  const org = db.select().from(organizations).where(eq(organizations.userId, id)).get();
  const notes = db.select().from(crmNotes).where(eq(crmNotes.userId, id)).all();
  const tags = db.select().from(crmTags).where(eq(crmTags.userId, id)).all();
  const personOrders = db.select().from(orders).where(eq(orders.userId, id)).all();
  const personSubs = db.select().from(submissions).where(eq(submissions.userId, id)).all();

  return (
    <main>
      <h1 className="font-serif text-3xl text-navy">{person.name}</h1>
      <p className="text-ink/70">{person.email}</p>
      <CrmForm
        userId={id}
        status={org?.crmStatus || "lead"}
        tags={tags.map((t) => t.tag).join(", ")}
      />
      <h2 className="mt-8 font-serif text-xl text-navy">Notes</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {notes.map((note) => (
          <li key={note.id} className="border border-navy/10 bg-white p-3">
            <p>{note.body}</p>
            <p className="mt-1 text-xs text-ink/50">{formatDate(note.createdAt)}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-8 font-serif text-xl text-navy">Orders</h2>
      <ul className="mt-3 text-sm">
        {personOrders.map((o) => (
          <li key={o.id}>
            {formatDate(o.createdAt)} · {formatRand(o.amountCents)} · {o.status}
          </li>
        ))}
      </ul>
      <h2 className="mt-8 font-serif text-xl text-navy">RMCPs</h2>
      <ul className="mt-3 text-sm">
        {personSubs.map((s) => (
          <li key={s.id}>
            {s.status} · renews {formatDate(s.renewsAt)}
            {s.docxKey ? (
              <>
                {" "}
                · <a className="underline" href={`/api/admin/download/${s.id}?format=docx`}>Word</a>
                {" "}
                · <a className="underline" href={`/api/admin/download/${s.id}?format=pdf`}>PDF</a>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
