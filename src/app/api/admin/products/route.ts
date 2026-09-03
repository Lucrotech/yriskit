import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { requireAdmin } from "@/lib/session";
import { id } from "@/lib/utils";

export async function POST(request: Request) {
  await requireAdmin();
  const body = (await request.json()) as {
    name?: string;
    slug?: string;
    vertical?: string;
    description?: string;
    oneOffPriceCents?: number;
    annualPriceCents?: number;
  };
  if (!body.name || !body.slug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  db.insert(products)
    .values({
      id: id("prod"),
      slug: body.slug,
      name: body.name,
      vertical: body.vertical || body.slug,
      description: body.description || "",
      oneOffPriceCents: body.oneOffPriceCents || 0,
      annualPriceCents: body.annualPriceCents || 0,
      renewalMonths: 12,
      isActive: true,
      sortOrder: 50,
      createdAt: new Date(),
    })
    .run();
  return NextResponse.json({ ok: true });
}
