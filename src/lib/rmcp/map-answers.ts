import { TEMPLATE_FIELDS, type TemplateFieldKey } from "./fields";

export type Answers = Record<string, unknown>;

function asString(value: unknown): string {
  if (value == null) return "";
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  if (typeof value === "string") return value.trim();
  return String(value);
}

function formatDate(value: unknown): string {
  const raw = asString(value);
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const DATE_KEYS = new Set([
  "START_DATE",
  "FIC_REG_DATE",
  "FIC_OFFICER_DATE",
  "POPI_OFFICER_DATE",
  "MLRO_DATE",
  "SUBMIT_DATE",
  "DIR_START_DATE",
  "DIR2_START_DATE",
  "STAFF1_START_DATE",
  "STAFF2_START_DATE",
]);

/** Flatten wizard answers into the Word/PDF merge dictionary. */
export function answersToMergeFields(
  answers: Answers,
  extras?: { submitDate?: Date; nextReview?: Date },
): Record<TemplateFieldKey, string> {
  const types = Array.isArray(answers.ACCOUNTABLE_INST_TYPES)
    ? (answers.ACCOUNTABLE_INST_TYPES as string[])
    : asString(answers.ACCOUNTABLE_INST_TYPES)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  const policies = Array.isArray(answers.POLICIES_SELECTED)
    ? (answers.POLICIES_SELECTED as string[])
    : [];
  const software = Array.isArray(answers.SOFTWARE_SELECTED)
    ? (answers.SOFTWARE_SELECTED as string[])
    : [];
  const vetting = Array.isArray(answers.VETTING_SELECTED)
    ? (answers.VETTING_SELECTED as string[])
    : [];

  const merged: Record<string, string> = {};
  for (const key of TEMPLATE_FIELDS) {
    let value = answers[key];
    if (key === "ACCOUNTABLE_INST_TYPE") {
      value = types.join("; ");
    } else if (key === "POLICIES") {
      value = policies.join(", ");
    } else if (key === "SOFTWARE") {
      value = software.filter((s) => s !== "Other").join(", ");
    } else if (key === "VETTING_MECHANISMS") {
      value = vetting.join(", ");
    } else if (key === "SUBMIT_DATE") {
      value = extras?.submitDate ?? new Date();
    } else if (key === "DIR_TITLE" && !value) {
      value = answers.DIR_TITLE;
    }
    merged[key] = DATE_KEYS.has(key) ? formatDate(value) : asString(value);
  }

  if (!merged.BUSINESS_DESC && types.length) {
    merged.BUSINESS_DESC = types.join("; ");
  }

  return merged as Record<TemplateFieldKey, string>;
}

export function extraAnnexurePeople(answers: Answers): string[] {
  const lines: string[] = [];
  const dirCount = Number(answers.DIRECTOR_COUNT || 1);
  for (let n = 3; n <= Math.min(dirCount, 4); n++) {
    const name = asString(answers[`DIR${n}_NAME`]);
    if (!name) continue;
    lines.push(
      `Director ${n}: ${asString(answers[`DIR${n}_TITLE`])} — ${name}, ID ${asString(answers[`DIR${n}_ID`])}, ${asString(answers[`DIR${n}_EMAIL`])}.`,
    );
  }
  const staffCount = Number(answers.STAFF_COUNT || 0);
  for (let n = 3; n <= Math.min(staffCount, 4); n++) {
    const name = asString(answers[`STAFF${n}_NAME`]);
    if (!name) continue;
    lines.push(
      `Key staff ${n}: ${asString(answers[`STAFF${n}_TITLE`])} — ${name}, ID ${asString(answers[`STAFF${n}_ID`])}, ${asString(answers[`STAFF${n}_EMAIL`])}.`,
    );
  }
  return lines;
}
