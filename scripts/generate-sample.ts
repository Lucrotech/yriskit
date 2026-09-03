import fs from "node:fs";
import { generateDocx } from "../src/lib/rmcp/generate-docx";
import { generatePdf } from "../src/lib/rmcp/generate-pdf";

const answers = {
  COMPANY_NAME: "Y RISK IT (Pty) Ltd",
  REG_ADDRESS: "2 Hartog Street, Stellenbosch",
  POSTAL_ADDRESS: "2 Hartog Street, Stellenbosch",
  REG_NUMBER: "2024/622275/07",
  START_DATE: "2024-09-01",
  COMPANY_EMAIL: "jackie@yriskit.co.za",
  COMPANY_PHONE: "27833557983",
  COMPANY_WEBSITE: "https://yriskit.co.za",
  TAX_NUMBER: "906498329",
  BANK_NAME: "First National Bank",
  ACCOUNT_NUMBER: "63150708669",
  ACCOUNTABLE_INST_TYPES: ["Company or trust formation service provider"],
  BUSINESS_DESC: "Risk Management and Compliance Programs, Consulting Services",
  SERVICES: "RMCP drafting and consulting",
  LOCATION: "Stellenbosch and Pretoria",
  GEO_AREAS: "Nationwide",
  GOAML_FIC_REG: "77913",
  FIC_REG_DATE: "2026-03-01",
  BUSINESS_UNIT: "Board of Directors",
  FIC_OFFICER_NAME: "Jacqueline Christine Grandcourt",
  FIC_OFFICER_DATE: "2026-03-27",
  MLRO_NAME: "Werner Koegelenberg",
  MLRO_DATE: "2026-03-01",
  POPI_OFFICER: "Jacqueline Christine Grandcourt",
  POPI_OFFICER_DATE: "2025-08-01",
  POLICIES_SELECTED: ["FICA Policy", "Risk Management Policy"],
  SOFTWARE_SELECTED: ["Microsoft 365"],
  DIR_TITLE: "Managing Director",
  DIR_NAME: "Jacqueline Grandcourt",
  DIR_ID: "7904190075081",
  DIR_EMAIL: "jackie@yriskit.co.za",
  DIRECTOR_COUNT: "1",
  STAFF_COUNT: "0",
  VETTING_SELECTED: ["Background Check - Prior to Employment (once)"],
  DECLARATION: "Yes",
};

async function main() {
  const docx = generateDocx(answers);
  fs.mkdirSync("storage/rmcps", { recursive: true });
  fs.writeFileSync("storage/rmcps/sample.docx", docx);
  console.log("docx", docx.length);
  const pdf = await generatePdf(answers);
  fs.writeFileSync("storage/rmcps/sample.pdf", pdf);
  console.log("pdf", pdf.length);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
