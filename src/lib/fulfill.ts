import { eq } from "drizzle-orm";
import { db } from "@/db";
import { orders, organizations, submissions } from "@/db/schema";
import { id } from "@/lib/utils";

export function fulfillOrder(orderId: string) {
  const order = db.select().from(orders).where(eq(orders.id, orderId)).get();
  if (!order) return null;
  if (order.status === "paid") {
    const existing = db
      .select()
      .from(submissions)
      .where(eq(submissions.orderId, order.id))
      .get();
    return { order, submissionId: existing?.id };
  }

  const now = new Date();
  db.update(orders)
    .set({ status: "paid", paidAt: now })
    .where(eq(orders.id, orderId))
    .run();

  db.update(organizations)
    .set({ crmStatus: "paid", updatedAt: now })
    .where(eq(organizations.userId, order.userId))
    .run();

  const org = db
    .select()
    .from(organizations)
    .where(eq(organizations.userId, order.userId))
    .get();

  const existing = db
    .select()
    .from(submissions)
    .where(eq(submissions.orderId, order.id))
    .get();
  if (existing) return { order, submissionId: existing.id };

  const subId = id("rmcp");
  db.insert(submissions)
    .values({
      id: subId,
      userId: order.userId,
      organizationId: org?.id,
      productId: order.productId,
      orderId: order.id,
      answersJson: JSON.stringify({ COMPANY_NAME: org?.name || "" }),
      status: "paid",
      createdAt: now,
      updatedAt: now,
    })
    .run();

  return { order, submissionId: subId };
}
