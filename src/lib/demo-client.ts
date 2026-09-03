import { eq } from "drizzle-orm";
import { db } from "@/db";
import { organizations, orders, products, submissions, user } from "@/db/schema";
import { fulfillOrder } from "@/lib/fulfill";
import { id } from "@/lib/utils";

export const DEMO_CLIENT_EMAIL = process.env.DEMO_CLIENT_EMAIL || "client@yriskit.co.za";
export const DEMO_CLIENT_NAME = "Demo Client";

export function isDemoClientEmail(email: string) {
  return email.toLowerCase() === DEMO_CLIENT_EMAIL.toLowerCase();
}

/** Prefill for the RMCP wizard so the same client can be demonstrated repeatedly. */
export const DEMO_ANSWERS: Record<string, unknown> = {
  COMPANY_NAME: "Helderberg Motor Traders (Pty) Ltd",
  REG_NUMBER: "2019/445566/07",
  START_DATE: "2019-04-01",
  REG_ADDRESS: "12 Bird Street, Stellenbosch 7600",
  POSTAL_ADDRESS: "PO Box 445, Stellenbosch 7599",
  COUNTRY: "South Africa",
  COMPANY_EMAIL: DEMO_CLIENT_EMAIL,
  COMPANY_PHONE: "27218831200",
  COMPANY_WEBSITE: "https://yriskit.co.za",
  TAX_NUMBER: "9876543210",
  VAT_NUMBER: "4123456789",
  BANK_NAME: "First National Bank",
  ACCOUNT_NUMBER: "62884900123",
  BUSINESS_UNIT: "Board of Directors",
  ACCOUNTABLE_INST_TYPES: [
    "Trader in high-value goods (e.g., cars, jewelry, art) with cash payments of R100,000+",
  ],
  BUSINESS_DESC:
    "Retail of new and used passenger and light commercial vehicles from a Stellenbosch dealership, including trade-ins and vehicle finance introductions.",
  SERVICES:
    "Vehicle sales, trade-ins, delivery, and introduction of purchasers to third-party vehicle finance.",
  LOCATION: "Stellenbosch, Western Cape",
  GEO_AREAS: "Western Cape",
  GOAML_FIC_REG: "88421",
  FIC_REG_DATE: "2024-06-01",
  FIC_OFFICER_NAME: "Thandiwe Naidoo",
  FIC_OFFICER_DATE: "2024-06-15",
  MLRO_NAME: "Pieter van Zyl",
  MLRO_DATE: "2024-06-15",
  POPI_OFFICER: "Thandiwe Naidoo",
  POPI_OFFICER_DATE: "2024-06-15",
  REGULATORS: [],
  POLICIES_SELECTED: ["FICA Policy", "Risk Management Policy"],
  SOFTWARE_SELECTED: ["Microsoft 365"],
  DIRECTOR_COUNT: "1",
  DIR_TITLE: "Managing Director",
  DIR_NAME: "Thandiwe Naidoo",
  DIR_ID: "8105120123088",
  DIR_EMAIL: DEMO_CLIENT_EMAIL,
  DIR_CELL: "27824500110",
  DIR_ADDRESS: "12 Bird Street, Stellenbosch 7600",
  STAFF_COUNT: "0",
  VETTING_SELECTED: ["Background Check - Prior to Employment (once)"],
  DECLARATION: "Yes",
};

export function seedDemoPurchase(userId: string) {
  const product = db.select().from(products).where(eq(products.slug, "generic")).get();
  if (!product) {
    throw new Error("Generic RMCP product is not seeded.");
  }

  const now = new Date();
  let org = db.select().from(organizations).where(eq(organizations.userId, userId)).get();
  if (!org) {
    org = {
      id: id("org"),
      userId,
      name: String(DEMO_ANSWERS.COMPANY_NAME),
      registrationNumber: String(DEMO_ANSWERS.REG_NUMBER),
      vertical: product.vertical,
      phone: String(DEMO_ANSWERS.COMPANY_PHONE),
      ficOrgId: String(DEMO_ANSWERS.GOAML_FIC_REG),
      crmStatus: "paid",
      lastContactedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    db.insert(organizations).values(org).run();
  } else {
    db.update(organizations)
      .set({
        name: String(DEMO_ANSWERS.COMPANY_NAME),
        registrationNumber: String(DEMO_ANSWERS.REG_NUMBER),
        phone: String(DEMO_ANSWERS.COMPANY_PHONE),
        ficOrgId: String(DEMO_ANSWERS.GOAML_FIC_REG),
        crmStatus: "paid",
        updatedAt: now,
      })
      .where(eq(organizations.id, org.id))
      .run();
  }

  let order = db.select().from(orders).where(eq(orders.userId, userId)).all()[0];
  if (!order) {
    const orderId = id("ord");
    db.insert(orders)
      .values({
        id: orderId,
        userId,
        productId: product.id,
        kind: "one_off_plus_annual",
        amountCents: product.oneOffPriceCents + product.annualPriceCents,
        status: "pending",
        includesAnnual: true,
        createdAt: now,
      })
      .run();
    fulfillOrder(orderId);
    order = db.select().from(orders).where(eq(orders.id, orderId)).get();
  } else if (order.status !== "paid") {
    fulfillOrder(order.id);
  }

  const answersJson = JSON.stringify(DEMO_ANSWERS);
  const existing = db.select().from(submissions).where(eq(submissions.userId, userId)).all()[0];
  if (existing) {
    db.update(submissions)
      .set({
        answersJson,
        status: "paid",
        completedAt: null,
        renewsAt: null,
        docxKey: null,
        pdfKey: null,
        updatedAt: now,
      })
      .where(eq(submissions.id, existing.id))
      .run();
    return existing.id;
  }

  const subId = id("rmcp");
  db.insert(submissions)
    .values({
      id: subId,
      userId,
      organizationId: org.id,
      productId: product.id,
      orderId: order?.id,
      answersJson,
      status: "paid",
      createdAt: now,
      updatedAt: now,
    })
    .run();
  return subId;
}

export function getDemoClient() {
  return db.select().from(user).where(eq(user.email, DEMO_CLIENT_EMAIL)).get();
}
