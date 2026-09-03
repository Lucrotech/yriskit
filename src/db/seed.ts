import { eq } from "drizzle-orm";
import { db } from "@/db";
import { hasDatabase } from "@/db/runtime";
import { clauseBlocks, products } from "@/db/schema";
import { PRODUCT_CATALOGUE } from "@/lib/catalogue";
import { id } from "@/lib/utils";

const now = () => Date.now();

const clauseCatalogue: Record<string, { title: string; body: string }[]> = {
  lawyers: [
    {
      title: "Legal practitioners — trust accounts and conveyancing",
      body: "As a legal practice handling client funds, property transfers and/or the formation of legal persons, we treat every mandate involving trust money, conveyancing, or the establishment of companies or trusts as presenting an elevated ML/TF/PF risk. No trust account debit, transfer instruction, or registration of a juristic person is processed until customer due diligence appropriate to the risk rating has been completed, the source of funds is understood, and the matter has been screened against the FIC targeted financial sanctions lists. The FIC compliance officer must be notified before any high-risk conveyancing or trust-account transaction is concluded.",
    },
  ],
  dealers: [
    {
      title: "High-value goods and motor vehicle dealers",
      body: "As a dealer in motor vehicles and/or other high-value goods, we recognise that cash purchases, third-party payments and rapid on-selling are attractive to money launderers. Cash or cash-equivalent payments at or above the applicable FIC threshold are treated as high risk. We will not complete a sale where the purchaser, beneficial owner, or source of funds cannot be identified and verified, or where the transaction matches a targeted financial sanctions listing. All cash-intensive or third-party funded deals are escalated to the FIC compliance officer before delivery of the asset.",
    },
  ],
  accountants: [
    {
      title: "Accountants, auditors and trust & company service providers",
      body: "Where we form companies or trusts, provide registered-office or nominee services, manage client funds, or act in a tax or assurance capacity that brings us within Schedule 1 of the FIC Act, we will not establish the structure or receive funds until CDD, beneficial-ownership identification and sanctions screening are complete. Complex ownership chains, nominee arrangements and clients from high-risk jurisdictions are rated at least high risk and require enhanced due diligence and senior sign-off.",
    },
  ],
};

export async function seedIfEmpty() {
  if (!hasDatabase()) return;
  const existing = db.select().from(products).all();
  if (existing.length) return;
  const createdAt = now();
  for (const item of PRODUCT_CATALOGUE) {
    const productId = id("prod");
    db.insert(products)
      .values({
        id: productId,
        slug: item.slug,
        name: item.name,
        vertical: item.vertical,
        description: item.description,
        oneOffPriceCents: item.oneOffPriceCents,
        annualPriceCents: item.annualPriceCents,
        renewalMonths: 12,
        isActive: true,
        sortOrder: item.sortOrder,
        createdAt: new Date(createdAt),
      })
      .run();
    (clauseCatalogue[item.slug] ?? []).forEach((clause, index) => {
      db.insert(clauseBlocks)
        .values({
          id: id("clause"),
          productId,
          title: clause.title,
          body: clause.body,
          sortOrder: index,
          isActive: true,
          createdAt: new Date(createdAt),
        })
        .run();
    });
  }
}

export async function ensureSeed() {
  try {
    await seedIfEmpty();
  } catch (error) {
    console.error("seed failed", error);
  }
}

export function getProductBySlug(slug: string) {
  return db.select().from(products).where(eq(products.slug, slug)).get();
}
