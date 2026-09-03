import fs from "node:fs";
import path from "node:path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { answersToMergeFields, extraAnnexurePeople, type Answers } from "./map-answers";

export function generateDocx(answers: Answers, submitDate = new Date()) {
  const templatePath = path.join(process.cwd(), "templates", "rmcp-core.docx");
  const content = fs.readFileSync(templatePath);
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    nullGetter: () => "",
  });

  const fields = answersToMergeFields(answers, { submitDate });
  const annexure = extraAnnexurePeople(answers);
  try {
    doc.render({
      ...fields,
      DIRECTORS_ANNEXURE: annexure.join("\n"),
      MLRO_NAME: String(answers.MLRO_NAME || ""),
      MLRO_DATE: String(answers.MLRO_DATE || ""),
    });
  } catch (error) {
    const message =
      error && typeof error === "object" && "properties" in error
        ? JSON.stringify((error as { properties?: unknown }).properties)
        : error instanceof Error
          ? error.message
          : "DOCX render failed";
    throw new Error(message);
  }

  return doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  }) as Buffer;
}
