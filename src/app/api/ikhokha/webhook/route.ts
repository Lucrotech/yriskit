import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/ikhokha";
import { fulfillOrder } from "@/lib/fulfill";

export async function POST(request: Request) {
  const raw = await request.text();
  const sign = request.headers.get("ik-sign") || request.headers.get("IK-SIGN");
  if (!verifyWebhookSignature(raw, sign)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }
  const payload = JSON.parse(raw || "{}") as {
    status?: string;
    externalTransactionID?: string;
  };
  const orderId = payload.externalTransactionID;
  const ok =
    String(payload.status || "").toUpperCase() === "SUCCESS" ||
    String(payload.status || "").toUpperCase() === "PAID";
  if (orderId && ok) fulfillOrder(orderId);
  return NextResponse.json({ ok: true });
}
