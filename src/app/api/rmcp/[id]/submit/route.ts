import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { clauseBlocks, organizations, products, submissions } from "@/db/schema";
import { getSession } from "@/lib/session";
import { generateDocx } from "@/lib/rmcp/generate-docx";
import { generatePdf } from "@/lib/rmcp/generate-pdf";
import { putFile } from "@/lib/storage";
import { addMonths } from "@/lib/utils";

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await context.params;
  const sub = db
    .select()
    .from(submissions)
    .where(and(eq(submissions.id, id), eq(submissions.userId, session.user.id)))
    .get();
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const answers = JSON.parse(sub.answersJson || "{}") as Record<string, unknown>;
  if (answers.DECLARATION !== "Yes") {
    return NextResponse.json(
      { error: "Please confirm the declaration on the last step." },
      { status: 400 },
    );
  }

  const product = db.select().from(products).where(eq(products.id, sub.productId)).get();
  const clauses = db
    .select()
    .from(clauseBlocks)
    .where(and(eq(clauseBlocks.productId, sub.productId), eq(clauseBlocks.isActive, true)))
    .all();
  answers.VERTICAL_CLAUSES = clauses.map((c) => `${c.title}\n${c.body}`).join("\n\n");

  const now = new Date();
  try {
    const docx = generateDocx(answers, now);
    const pdf = await generatePdf(answers, now);
    const docxKey = `rmcps/${id}.docx`;
    const pdfKey = `rmcps/${id}.pdf`;
    await putFile(docxKey, docx, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    await putFile(pdfKey, pdf, "application/pdf");

    const months = product?.renewalMonths || 12;
    db.update(submissions)
      .set({
        status: "generated",
        completedAt: now,
        renewsAt: addMonths(now, months),
        docxKey,
        pdfKey,
        updatedAt: now,
      })
      .where(eq(submissions.id, id))
      .run();

    db.update(organizations)
      .set({
        crmStatus: "completed",
        name: String(answers.COMPANY_NAME || ""),
        registrationNumber: String(answers.REG_NUMBER || ""),
        ficOrgId: String(answers.GOAML_FIC_REG || ""),
        updatedAt: now,
      })
      .where(eq(organizations.userId, session.user.id))
      .run();

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Generation failed" },
      { status: 500 },
    );
  }
}
