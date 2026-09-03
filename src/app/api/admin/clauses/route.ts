import { NextResponse } from "next/server";
import { db } from "@/db";
import { clauseBlocks } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { id } from "@/lib/utils";

export async function POST(request: Request) {
  await requireAdmin();
  const body = (await request.json()) as {
    productId?: string;
    title?: string;
    body?: string;
  };
  if (!body.productId || !body.title || !body.body) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  db.insert(clauseBlocks)
    .values({
      id: id("clause"),
      productId: body.productId,
      title: body.title,
      body: body.body,
      sortOrder: 0,
      isActive: true,
      createdAt: new Date(),
    })
    .run();
  return NextResponse.json({ ok: true });
}
