import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { organizations, user } from "@/db/schema";
import { getSession } from "@/lib/session";
import { id } from "@/lib/utils";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const body = (await request.json()) as {
    name?: string;
    phone?: string;
    company?: string;
  };
  const now = new Date();
  db.update(user)
    .set({ name: body.name || session.user.name, phone: body.phone || null, updatedAt: now })
    .where(eq(user.id, session.user.id))
    .run();

  const org = db.select().from(organizations).where(eq(organizations.userId, session.user.id)).get();
  if (org) {
    db.update(organizations)
      .set({ name: body.company || org.name, phone: body.phone || org.phone, updatedAt: now })
      .where(eq(organizations.id, org.id))
      .run();
  } else if (body.company) {
    db.insert(organizations)
      .values({
        id: id("org"),
        userId: session.user.id,
        name: body.company,
        phone: body.phone || null,
        crmStatus: "lead",
        createdAt: now,
        updatedAt: now,
      })
      .run();
  }
  return NextResponse.json({ ok: true });
}
