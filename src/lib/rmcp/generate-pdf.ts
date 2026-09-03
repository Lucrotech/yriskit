import {
  PDFDocument,
  PDFFont,
  PDFPage,
  StandardFonts,
  rgb,
} from "pdf-lib";
import {
  IMPORTANT_NOTICE,
  buildRmcpDocumentContent,
  type Answers,
} from "./document-content";

const NAVY = rgb(14 / 255, 27 / 255, 51 / 255);
const GOLD = rgb(184 / 255, 149 / 255, 58 / 255);
const INK = rgb(28 / 255, 25 / 255, 23 / 255);
const MUTED = rgb(87 / 255, 83 / 255, 78 / 255);
const RULE = rgb(214 / 255, 211 / 255, 209 / 255);

function ascii(text: string) {
  return text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2022/g, "-")
    .replace(/\u00A0/g, " ")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const clean = ascii(text).replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const words = clean.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

class Composer {
  doc: PDFDocument;
  page!: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  y = 0;
  pageNo = 0;
  company: string;

  constructor(doc: PDFDocument, font: PDFFont, bold: PDFFont, company: string) {
    this.doc = doc;
    this.font = font;
    this.bold = bold;
    this.company = company;
    this.addPage();
  }

  addPage() {
    this.page = this.doc.addPage([595.28, 841.89]);
    this.pageNo += 1;
    this.y = 800;
    this.page.drawRectangle({ x: 0, y: 818, width: 595.28, height: 24, color: NAVY });
    this.page.drawText("Y RISK IT  |  RISK MANAGEMENT AND COMPLIANCE PROGRAMME", {
      x: 48,
      y: 826,
      size: 8,
      font: this.bold,
      color: GOLD,
    });
    this.page.drawLine({
      start: { x: 48, y: 52 },
      end: { x: 547, y: 52 },
      thickness: 0.5,
      color: RULE,
    });
    const footer = `${ascii(this.company) || "Accountable institution"}  |  Confidential  |  FIC Act s42  |  Page ${this.pageNo}`;
    this.page.drawText(footer.slice(0, 110), {
      x: 48,
      y: 38,
      size: 8,
      font: this.font,
      color: MUTED,
    });
  }

  ensure(height: number) {
    if (this.y - height < 64) this.addPage();
  }

  heading(text: string, size = 13) {
    this.ensure(28);
    this.y -= 8;
    this.page.drawText(ascii(text), {
      x: 48,
      y: this.y,
      size,
      font: this.bold,
      color: NAVY,
    });
    this.y -= size + 10;
  }

  paragraph(text: string, opts?: { bold?: boolean; size?: number; indent?: boolean }) {
    const size = opts?.size ?? 10;
    const font = opts?.bold ? this.bold : this.font;
    const max = opts?.indent ? 470 : 499;
    const x = opts?.indent ? 64 : 48;
    const lines = wrap(text, font, size, max);
    for (const line of lines) {
      this.ensure(size + 4);
      this.page.drawText(line, { x, y: this.y, size, font, color: INK });
      this.y -= size + 3;
    }
    this.y -= 4;
  }

  kv(label: string, value: string) {
    this.ensure(16);
    this.page.drawText(ascii(label), {
      x: 48,
      y: this.y,
      size: 9,
      font: this.bold,
      color: MUTED,
    });
    const lines = wrap(value || "—", this.font, 10, 320);
    this.page.drawText(lines[0] || "—", {
      x: 230,
      y: this.y,
      size: 10,
      font: this.font,
      color: INK,
    });
    this.y -= 14;
    for (const extra of lines.slice(1)) {
      this.ensure(14);
      this.page.drawText(extra, { x: 230, y: this.y, size: 10, font: this.font, color: INK });
      this.y -= 14;
    }
  }
}

export async function generatePdf(answers: Answers, submitDate = new Date()) {
  const content = buildRmcpDocumentContent(answers, submitDate);
  const { fields, companyName } = content;

  const doc = await PDFDocument.create();
  doc.setTitle(`RMCP — ${companyName}`);
  doc.setAuthor("Y Risk It");
  doc.setSubject("Risk Management and Compliance Programme in terms of the FIC Act");
  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold);

  const cover = doc.addPage([595.28, 841.89]);
  cover.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: NAVY });
  cover.drawRectangle({ x: 0, y: 0, width: 12, height: 841.89, color: GOLD });
  cover.drawText("Y RISK IT", {
    x: 56,
    y: 760,
    size: 14,
    font: bold,
    color: GOLD,
  });
  cover.drawText("FIC Act 38 of 2001  |  Guidance Note 7A", {
    x: 56,
    y: 742,
    size: 10,
    font,
    color: rgb(0.82, 0.84, 0.86),
  });
  cover.drawText("RISK MANAGEMENT AND", {
    x: 56,
    y: 620,
    size: 22,
    font: bold,
    color: rgb(1, 1, 1),
  });
  cover.drawText("COMPLIANCE PROGRAMME", {
    x: 56,
    y: 592,
    size: 22,
    font: bold,
    color: GOLD,
  });
  cover.drawText(ascii(companyName), {
    x: 56,
    y: 540,
    size: 16,
    font,
    color: rgb(1, 1, 1),
  });
  cover.drawText(`Version 1.1  |  Published ${fields.SUBMIT_DATE}`, {
    x: 56,
    y: 510,
    size: 11,
    font,
    color: rgb(0.82, 0.84, 0.86),
  });
  cover.drawText("Prepared for board / senior management approval", {
    x: 56,
    y: 180,
    size: 10,
    font,
    color: rgb(0.82, 0.84, 0.86),
  });
  cover.drawText("This document must be implemented, not merely adopted.", {
    x: 56,
    y: 164,
    size: 10,
    font,
    color: GOLD,
  });

  const composer = new Composer(doc, font, bold, companyName);
  composer.heading("Document control");
  for (const { label, value } of content.documentControl) {
    composer.kv(label, value);
  }

  composer.heading("Important notice");
  composer.paragraph(IMPORTANT_NOTICE);

  if (content.verticalBlocks.length) {
    composer.heading("Industry-specific controls");
    for (const block of content.verticalBlocks) {
      composer.paragraph(block);
    }
  }

  if (content.annexure.length) {
    composer.heading("Annexure — additional responsible persons");
    for (const line of content.annexure) {
      composer.paragraph(line);
    }
  }

  composer.heading("Risk Management and Compliance Programme");
  for (const block of content.bodyBlocks) {
    if (block.type === "heading") {
      composer.heading(block.text, block.size ?? 11);
    } else {
      composer.paragraph(block.text, { size: block.size ?? 10 });
    }
  }

  return Buffer.from(await doc.save());
}
