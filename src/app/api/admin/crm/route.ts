import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { crmNotes, crmTags, organizations } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { id } from "@/lib/utils";

export async function POST(request: Request) {
  const session = await requireAdmin();
  const body = (await request.json()) as {
    userId?: string;
    status?: string;
    tags?: string;
    note?: string;
  };
  if (!body.userId) return NextResponse.json({ error: "Missing user" }, { status: 400 });
  const now = new Date();
  const org = db.select().from(organizations).where(eq(organizations.userId, body.userId)).get();
  if (org && body.status) {
    db.update(organizations)
      .set({ crmStatus: body.status, lastContactedAt: now, updatedAt: now })
      .where(eq(organizations.id, org.id))
      .run();
  }
  if (body.tags !== undefined) {
    db.delete(crmTags).where(eq(crmTags.userId, body.userId)).run();
    for (const tag of body.tags.split(",").map((t) => t.trim()).filter(Boolean)) {
      db.insert(crmTags)
        .values({ id: id("tag"), userId: body.userId, tag })
        .run();
    }
  }
  if (body.note?.trim()) {
    db.insert(crmNotes)
      .values({
        id: id("note"),
        userId: body.userId,
        authorId: session.user.id,
        body: body.note.trim(),
        createdAt: now,
      })
      .run();
  }
  return NextResponse.json({ ok: true });
}
