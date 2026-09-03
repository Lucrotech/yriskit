import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { requireUser } from "@/lib/session";
import { Wizard } from "@/components/wizard";

export default async function WizardPage({
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
  if (sub.status === "generated") redirect(`/app/rmcp/${id}/complete`);
  const answers = JSON.parse(sub.answersJson || "{}") as Record<string, unknown>;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="eyebrow">RMCP questionnaire</p>
      <p className="mt-3 border border-navy/10 bg-cream p-4 text-sm leading-6 text-ink/80">
        This form collects the details required to complete your organisation&apos;s
        Risk Management and Compliance Programme. As an accountable institution
        under the FIC Act you must have a documented, implemented and maintained
        RMCP. Information is used solely to populate that document.
      </p>
      <div className="mt-8">
        <Wizard submissionId={id} initialAnswers={answers} />
      </div>
    </main>
  );
}
