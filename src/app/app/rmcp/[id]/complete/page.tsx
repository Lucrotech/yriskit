import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { DemoResetButton } from "@/components/demo-reset-button";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { isDemoClientEmail } from "@/lib/demo-client";
import { requireUser } from "@/lib/session";
import { formatDate } from "@/lib/utils";

export default async function CompletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireUser();
  const { id } = await params;
  const sub = db
    .select()
    .from(submissions)
    .where(and(eq(submissions.id, id), eq(submissions.userId, session.user.id)))
    .get();
  if (!sub) notFound();
  const demo = isDemoClientEmail(session.user.email);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-center">
      <p className="eyebrow">Complete</p>
      <h1 className="mt-3 font-serif text-4xl text-navy">Your RMCP is ready</h1>
      <p className="mt-4 text-ink/70">
        Download the Word original (locked FIC wording) and the board PDF.
        Review date: {formatDate(sub.renewsAt)}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a className="btn-primary" href={`/api/rmcp/${id}/download?format=docx`}>
          Download Word
        </a>
        <a className="btn-secondary" href={`/api/rmcp/${id}/download?format=pdf`}>
          Download PDF
        </a>
        {demo ? <DemoResetButton label="Re-run demo" /> : null}
      </div>
      <p className="mt-8 text-sm text-ink/60">
        The board or senior management must still approve and implement this
        programme.{" "}
        <Link href="/legal/disclaimer" className="underline">
          Read the disclaimer
        </Link>
        .
      </p>
      <Link href="/app" className="mt-6 inline-block text-sm text-navy underline">
        Back to dashboard
      </Link>
    </main>
  );
}
