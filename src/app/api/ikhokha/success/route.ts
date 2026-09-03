import { NextRequest, NextResponse } from "next/server";
import { fulfillOrder } from "@/lib/fulfill";
import { getPaymentStatus } from "@/lib/ikhokha";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get("order");
  if (!orderId) return NextResponse.redirect(new URL("/app", request.url));
  const order = db.select().from(orders).where(eq(orders.id, orderId)).get();
  if (order?.paylinkId && order.status !== "paid") {
    try {
      const status = await getPaymentStatus(order.paylinkId);
      const paid = String(status.status || "").toUpperCase();
      if (paid === "PAID" || paid === "SUCCESS") fulfillOrder(orderId);
    } catch {
      fulfillOrder(orderId);
    }
  } else if (order) {
    fulfillOrder(orderId);
  }
  const result = fulfillOrder(orderId);
  const dest = result?.submissionId
    ? `/app/rmcp/${result.submissionId}/wizard`
    : "/app";
  return NextResponse.redirect(new URL(dest, request.url));
}
