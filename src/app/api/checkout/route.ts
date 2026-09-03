import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, products, organizations } from "@/db/schema";
import { getSession } from "@/lib/session";
import { createPaymentLink } from "@/lib/ikhokha";
import { id } from "@/lib/utils";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const body = (await request.json()) as { productId?: string; annual?: boolean };
  const product = db.select().from(products).where(eq(products.id, body.productId || "")).get();
  if (!product || !product.isActive) {
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
  const orderId = id("ord");
  const amount = product.oneOffPriceCents + (body.annual ? product.annualPriceCents : 0);
  const now = new Date();

  let org = db.select().from(organizations).where(eq(organizations.userId, session.user.id)).get();
  if (!org) {
    org = {
      id: id("org"),
      userId: session.user.id,
      name: session.user.name || "Accountable institution",
      registrationNumber: null,
      vertical: product.vertical,
      phone: null,
      ficOrgId: null,
      crmStatus: "lead",
      lastContactedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    db.insert(organizations).values(org).run();
  }

  db.insert(orders)
    .values({
      id: orderId,
      userId: session.user.id,
      productId: product.id,
      kind: body.annual ? "one_off_plus_annual" : "one_off",
      amountCents: amount,
      status: "pending",
      includesAnnual: Boolean(body.annual),
      createdAt: now,
    })
    .run();

  const pay = await createPaymentLink({
    amountCents: amount,
    description: `${product.name}${body.annual ? " + annual support" : ""}`,
    externalTransactionId: orderId,
    successUrl: `${origin}/api/ikhokha/success?order=${orderId}`,
    failureUrl: `${origin}/app/checkout?failed=1`,
    cancelUrl: `${origin}/app/checkout?cancelled=1`,
    callbackUrl: `${origin}/api/ikhokha/webhook`,
  });

  db.update(orders)
    .set({ paylinkId: pay.paylinkId, paylinkUrl: pay.paylinkUrl })
    .where(eq(orders.id, orderId))
    .run();

  return NextResponse.json({ url: pay.paylinkUrl, orderId, mock: pay.mock });
}
