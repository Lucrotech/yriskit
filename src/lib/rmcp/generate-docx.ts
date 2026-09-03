import {
  Document,
  Footer,
  Header,
  PageBreak,
  PageNumber,
  Packer,
  Paragraph,
  NumberFormat,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { IMPORTANT_NOTICE, buildRmcpDocumentContent, type Answers } from "./document-content";

const NAVY = "0E1B33";
const GOLD = "B8953A";
const INK = "1C1917";
const MUTED = "57534E";
const FONT = "Times New Roman";

function run(text: string, opts?: { bold?: boolean; color?: string; size?: number }) {
  return new TextRun({
    text,
    font: FONT,
    bold: opts?.bold,
    color: opts?.color ?? INK,
    size: (opts?.size ?? 10) * 2,
  });
}

function heading(text: string, size = 13) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [run(text, { bold: true, color: NAVY, size })],
  });
}

function body(text: string, opts?: { bold?: boolean; size?: number; indent?: boolean }) {
  return new Paragraph({
    spacing: { after: 120 },
    indent: opts?.indent ? { left: 720 } : undefined,
    children: [run(text, { bold: opts?.bold, size: opts?.size ?? 10 })],
  });
}

function kvRow(label: string, value: string) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 35, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: "none", size: 0, color: "FFFFFF" },
          bottom: { style: "none", size: 0, color: "FFFFFF" },
          left: { style: "none", size: 0, color: "FFFFFF" },
          right: { style: "none", size: 0, color: "FFFFFF" },
        },
        children: [new Paragraph({ children: [run(label, { bold: true, color: MUTED, size: 9 })] })],
      }),
      new TableCell({
        width: { size: 65, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: "none", size: 0, color: "FFFFFF" },
          bottom: { style: "none", size: 0, color: "FFFFFF" },
          left: { style: "none", size: 0, color: "FFFFFF" },
          right: { style: "none", size: 0, color: "FFFFFF" },
        },
        children: [new Paragraph({ children: [run(value || "—", { size: 10 })] })],
      }),
    ],
  });
}

function contentHeader() {
  return new Header({
    children: [
      new Paragraph({
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        spacing: { after: 120 },
        children: [
          run("Y RISK IT  |  RISK MANAGEMENT AND COMPLIANCE PROGRAMME", {
            bold: true,
            color: GOLD,
            size: 8,
          }),
        ],
      }),
    ],
  });
}

function contentFooter(company: string) {
  const footerText = `${company}  |  Confidential  |  FIC Act s42  |  Page `;
  return new Footer({
    children: [
      new Paragraph({
        border: {
          top: { color: "D6D3D1", size: 4, style: "single" },
        },
        spacing: { before: 120 },
        children: [
          run(footerText.slice(0, 110), { color: MUTED, size: 8 }),
          new TextRun({
            children: [PageNumber.CURRENT],
            font: FONT,
            color: MUTED,
            size: 16,
          }),
        ],
      }),
    ],
  });
}

function coverSection(content: ReturnType<typeof buildRmcpDocumentContent>) {
  const { fields, companyName } = content;
  return {
    properties: {
      page: {
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 2, type: WidthType.PERCENTAGE },
                shading: { fill: GOLD, type: ShadingType.CLEAR },
                borders: {
                  top: { style: "none", size: 0, color: "FFFFFF" },
                  bottom: { style: "none", size: 0, color: "FFFFFF" },
                  left: { style: "none", size: 0, color: "FFFFFF" },
                  right: { style: "none", size: 0, color: "FFFFFF" },
                },
                children: [new Paragraph({ children: [run(" ", { size: 1 })] })],
              }),
              new TableCell({
                width: { size: 98, type: WidthType.PERCENTAGE },
                shading: { fill: NAVY, type: ShadingType.CLEAR },
                borders: {
                  top: { style: "none", size: 0, color: "FFFFFF" },
                  bottom: { style: "none", size: 0, color: "FFFFFF" },
                  left: { style: "none", size: 0, color: "FFFFFF" },
                  right: { style: "none", size: 0, color: "FFFFFF" },
                },
                children: [
                  new Paragraph({
                    spacing: { before: 1800, after: 120 },
                    indent: { left: 720 },
                    children: [run("Y RISK IT", { bold: true, color: GOLD, size: 14 })],
                  }),
                  new Paragraph({
                    spacing: { after: 2400 },
                    indent: { left: 720 },
                    children: [
                      run("FIC Act 38 of 2001  |  Guidance Note 7A", { color: "D1D5DB", size: 10 }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { after: 80 },
                    indent: { left: 720 },
                    children: [run("RISK MANAGEMENT AND", { bold: true, color: "FFFFFF", size: 22 })],
                  }),
                  new Paragraph({
                    spacing: { after: 240 },
                    indent: { left: 720 },
                    children: [run("COMPLIANCE PROGRAMME", { bold: true, color: GOLD, size: 22 })],
                  }),
                  new Paragraph({
                    spacing: { after: 120 },
                    indent: { left: 720 },
                    children: [run(companyName, { color: "FFFFFF", size: 16 })],
                  }),
                  new Paragraph({
                    spacing: { after: 2400 },
                    indent: { left: 720 },
                    children: [
                      run(`Version 1.1  |  Published ${fields.SUBMIT_DATE}`, {
                        color: "D1D5DB",
                        size: 11,
                      }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { before: 1200, after: 80 },
                    indent: { left: 720 },
                    children: [
                      run("Prepared for board / senior management approval", {
                        color: "D1D5DB",
                        size: 10,
                      }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { after: 720 },
                    indent: { left: 720 },
                    children: [
                      run("This document must be implemented, not merely adopted.", {
                        color: GOLD,
                        size: 10,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),
    ],
  };
}

function mainSection(content: ReturnType<typeof buildRmcpDocumentContent>) {
  const children: (Paragraph | Table)[] = [];

  children.push(heading("Document control", 13));
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: content.documentControl.map(({ label, value }) => kvRow(label, value)),
    }),
  );

  children.push(heading("Important notice", 13));
  children.push(body(IMPORTANT_NOTICE));

  if (content.verticalBlocks.length) {
    children.push(heading("Industry-specific controls", 13));
    for (const block of content.verticalBlocks) {
      children.push(body(block));
    }
  }

  if (content.annexure.length) {
    children.push(heading("Annexure — additional responsible persons", 13));
    for (const line of content.annexure) {
      children.push(body(line));
    }
  }

  children.push(heading("Risk Management and Compliance Programme", 13));
  for (const block of content.bodyBlocks) {
    if (block.type === "heading") {
      children.push(heading(block.text, block.size ?? 11));
    } else {
      children.push(body(block.text, { size: block.size ?? 10 }));
    }
  }

  return {
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        pageNumbers: {
          start: 1,
          formatType: NumberFormat.DECIMAL,
        },
      },
    },
    headers: {
      default: contentHeader(),
    },
    footers: {
      default: contentFooter(content.companyName),
    },
    children,
  };
}

export async function generateDocx(answers: Answers, submitDate = new Date()) {
  const content = buildRmcpDocumentContent(answers, submitDate);

  const doc = new Document({
    title: `RMCP — ${content.companyName}`,
    creator: "Y Risk It",
    description: "Risk Management and Compliance Programme in terms of the FIC Act",
    sections: [coverSection(content), mainSection(content)],
  });

  return Buffer.from(await Packer.toBuffer(doc));
}
