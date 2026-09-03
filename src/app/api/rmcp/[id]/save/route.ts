import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { getSession } from "@/lib/session";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await context.params;
  const body = (await request.json()) as { answers?: Record<string, unknown> };
  const sub = db
    .select()
    .from(submissions)
    .where(and(eq(submissions.id, id), eq(submissions.userId, session.user.id)))
    .get();
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.update(submissions)
    .set({
      answersJson: JSON.stringify(body.answers || {}),
      status: sub.status === "generated" ? sub.status : "in_progress",
      updatedAt: new Date(),
    })
    .where(eq(submissions.id, id))
    .run();
  return NextResponse.json({ ok: true });
}
