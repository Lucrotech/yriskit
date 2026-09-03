import fs from "node:fs";
import path from "node:path";
import { answersToMergeFields, extraAnnexurePeople, type Answers } from "./map-answers";

export type { Answers };

export function fillPlaceholders(text: string, fields: Record<string, string>) {
  return text.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key: string) => fields[key] ?? "");
}

export function isRmcpHeading(text: string) {
  return (
    /^(Part [IVX]+|RMCP Element|DETAILS OF|POLICY ADOPTION|TABLE OF CONTENTS|Director \d|Staff Member)/i.test(
      text,
    ) ||
    (text === text.toUpperCase() && text.length < 80)
  );
}

export function loadRmcpParagraphs() {
  const paragraphsPath = path.join(process.cwd(), "data", "rmcp-paragraphs.json");
  return JSON.parse(fs.readFileSync(paragraphsPath, "utf8")) as string[];
}

export const IMPORTANT_NOTICE =
  "This RMCP is generated from information supplied by the accountable institution and uses Y Risk It's locked FIC Act wording. The board of directors, senior management, or person with the highest authority remains responsible for approving, implementing, monitoring and updating the programme. Generating this document does not constitute legal advice, FIC registration, or a finding that the institution is compliant.";

const DOCUMENT_CONTROL_FIELDS = [
  { label: "Accountable institution", field: "COMPANY_NAME" },
  { label: "Registered address", field: "REG_ADDRESS" },
  { label: "CIPC registration", field: "REG_NUMBER" },
  { label: "goAML / FIC Org ID", field: "GOAML_FIC_REG" },
  { label: "FIC registration date", field: "FIC_REG_DATE" },
  { label: "Type(s) of accountable institution", field: "ACCOUNTABLE_INST_TYPE" },
  { label: "FIC compliance officer", field: "FIC_OFFICER_NAME" },
  { label: "POPIA information officer", field: "POPI_OFFICER" },
  { label: "Responsible business unit", field: "BUSINESS_UNIT" },
  { label: "Publishing date", field: "SUBMIT_DATE" },
  { label: "Review frequency", field: "__REVIEW_FREQUENCY__" },
] as const;

export type RmcpBlock = { type: "heading" | "paragraph"; text: string; size?: number };

export type RmcpDocumentContent = {
  fields: Record<string, string>;
  companyName: string;
  documentControl: Array<{ label: string; value: string }>;
  verticalBlocks: string[];
  annexure: string[];
  bodyBlocks: RmcpBlock[];
};

export function buildRmcpDocumentContent(answers: Answers, submitDate = new Date()): RmcpDocumentContent {
  const fields = answersToMergeFields(answers, { submitDate });
  const paragraphs = loadRmcpParagraphs();
  const bodyBlocks: RmcpBlock[] = [];

  for (const para of paragraphs) {
    const filled = fillPlaceholders(para, fields).trim();
    if (!filled) continue;
    if (isRmcpHeading(filled) && filled.length < 140) {
      bodyBlocks.push({ type: "heading", text: filled, size: 11 });
    } else {
      bodyBlocks.push({ type: "paragraph", text: filled, size: 10 });
    }
  }

  const vertical = String(answers.VERTICAL_CLAUSES || "").trim();

  return {
    fields,
    companyName: fields.COMPANY_NAME || "Accountable institution",
    documentControl: DOCUMENT_CONTROL_FIELDS.map(({ label, field }) => ({
      label,
      value:
        field === "__REVIEW_FREQUENCY__"
          ? "12 months"
          : fields[field as keyof typeof fields] || "—",
    })),
    verticalBlocks: vertical ? vertical.split("\n\n").filter(Boolean) : [],
    annexure: extraAnnexurePeople(answers),
    bodyBlocks,
  };
}
