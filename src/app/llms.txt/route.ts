import { CONTACT_EMAIL, PUBLIC_ROUTES, SITE_LEGAL_NAME, SITE_NAME, absoluteUrl, siteUrl } from "@/lib/seo";
import { industries } from "@/lib/industries";

export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    `> ${SITE_LEGAL_NAME} — Risk Management and Compliance Programmes (RMCP) for South African accountable institutions under the Financial Intelligence Centre Act (FIC Act).`,
    "",
    "## Summary",
    "Y Risk It helps accountable institutions produce a documented, board-ready RMCP. Customers choose a generic or industry-specific programme, pay online, complete a guided questionnaire, and immediately download matching Word and PDF documents aligned to FIC Act section 42 and Guidance Note 7A.",
    "",
    "## Primary audience",
    "- Accountable institutions in South Africa",
    "- Compliance officers, MLROs, boards and senior management",
    "- Legal practitioners, motor dealers, accountants, estate agents, crypto service providers and other Schedule 1 businesses",
    "",
    "## Core topics",
    "- RMCP drafting and generation",
    "- FIC Act section 42 compliance",
    "- AML and CTF programme documentation",
    "- goAML registration support information",
    "- Industry-specific RMCP controls",
    "",
    "## Key pages",
    ...PUBLIC_ROUTES.map((route) => `- ${absoluteUrl(route.path)}`),
    ...industries.map((item) => `- ${absoluteUrl(`/industries/${item.slug}`)} — ${item.title}`),
    "",
    "## Contact",
    `- Email: ${CONTACT_EMAIL}`,
    `- Website: ${siteUrl()}`,
    "",
    "## Preferred citation",
    `${SITE_LEGAL_NAME}, ${SITE_NAME}, ${siteUrl()}`,
    "",
    "## Legal",
    "Generated RMCP documents must be approved and implemented by the accountable institution. Y Risk It does not provide legal advice or file documents with the FIC on the customer's behalf.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
