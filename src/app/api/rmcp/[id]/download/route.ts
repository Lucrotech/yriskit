import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { getSession } from "@/lib/session";
import { getFile } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await context.params;
  const format = request.nextUrl.searchParams.get("format") === "pdf" ? "pdf" : "docx";
  const sub = db
    .select()
    .from(submissions)
    .where(and(eq(submissions.id, id), eq(submissions.userId, session.user.id)))
    .get();
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const key = format === "pdf" ? sub.pdfKey : sub.docxKey;
  if (!key) return NextResponse.json({ error: "File not generated" }, { status: 404 });
  const data = await getFile(key);
  const filename = `RMCP-${id}.${format}`;
  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type":
        format === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
