import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { getFile } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await requireAdmin();
  const { id } = await context.params;
  const format = request.nextUrl.searchParams.get("format") === "pdf" ? "pdf" : "docx";
  const sub = db.select().from(submissions).where(eq(submissions.id, id)).get();
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const key = format === "pdf" ? sub.pdfKey : sub.docxKey;
  if (!key) return NextResponse.json({ error: "No file" }, { status: 404 });
  const data = await getFile(key);
  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="RMCP-${id}.${format}"`,
    },
  });
}
