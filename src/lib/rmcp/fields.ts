export type FieldType =
  | "text"
  | "textarea"
  | "email"
  | "tel"
  | "url"
  | "date"
  | "select"
  | "multiselect"
  | "yesno"
  | "number";

export type TemplateField = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
};

/** Merge keys present in the official RMCP Word template. */
export const TEMPLATE_FIELDS = [
  "COMPANY_NAME",
  "REG_ADDRESS",
  "POSTAL_ADDRESS",
  "GOAML_FIC_REG",
  "FIC_REG_DATE",
  "ACCOUNTABLE_INST_TYPE",
  "SUBMIT_DATE",
  "BUSINESS_UNIT",
  "REG_NUMBER",
  "START_DATE",
  "TAX_NUMBER",
  "VAT_NUMBER",
  "COMPANY_PHONE",
  "COMPANY_EMAIL",
  "COMPANY_WEBSITE",
  "BANK_NAME",
  "ACCOUNT_NUMBER",
  "BUSINESS_DESC",
  "SERVICES",
  "LOCATION",
  "GEO_AREAS",
  "DIR_TITLE",
  "DIR_NAME",
  "DIR_ID",
  "DIR_TAX",
  "DIR_START_DATE",
  "DIR_MARRIED",
  "DIR_DEPENDENTS",
  "DIR_ADDRESS",
  "DIR_CELL",
  "DIR_EMAIL",
  "DIR2_TITLE",
  "DIR2_NAME",
  "DIR2_ID",
  "DIR2_TAX",
  "DIR2_START_DATE",
  "DIR2_MARRIED",
  "DIR2_DEPENDENTS",
  "DIR2_ADDRESS",
  "DIR2_CELL",
  "DIR2_EMAIL",
  "FIC_OFFICER_NAME",
  "FIC_OFFICER_DATE",
  "POPI_OFFICER",
  "POPI_OFFICER_DATE",
  "POLICIES",
  "OTHER_POLICIES",
  "SOFTWARE",
  "SOFTWARE_LIST",
  "STAFF1_TITLE",
  "STAFF1_NAME",
  "STAFF1_ID",
  "STAFF1_START_DATE",
  "STAFF1_MARRIED",
  "STAFF1_DEPENDENTS",
  "STAFF1_ADDRESS",
  "STAFF1_CELL",
  "STAFF1_EMAIL",
  "STAFF2_TITLE",
  "STAFF2_NAME",
  "STAFF2_ID",
  "STAFF2_START_DATE",
  "STAFF2_MARRIED",
  "STAFF2_DEPENDENTS",
  "STAFF2_ADDRESS",
  "STAFF2_CELL",
  "STAFF2_EMAIL",
  "VETTING_MECHANISMS",
  "SARS_PR_CODE",
] as const;

export type TemplateFieldKey = (typeof TEMPLATE_FIELDS)[number];

export const ACCOUNTABLE_INSTITUTION_TYPES = [
  {
    value: "Bank, mutual bank, or cooperative bank",
    label: "Bank, mutual bank, or cooperative bank",
    vertical: "financial",
  },
  {
    value: "Credit provider (loans, hire-purchase, micro-lending)",
    label: "Credit provider (loans, hire-purchase, micro-lending)",
    vertical: "financial",
  },
  {
    value:
      "Financial advisor or intermediary for investments, insurance, or retirement products",
    label:
      "Financial advisor or intermediary for investments, insurance, or retirement products",
    vertical: "financial",
  },
  {
    value:
      "Money remittance or value transfer service (e.g., MoneyGram, Western Union)",
    label: "Money remittance or value transfer service",
    vertical: "remittance",
  },
  {
    value:
      "Attorney, notary, or conveyancer involved in client financial transactions",
    label: "Attorney, notary, or conveyancer",
    vertical: "lawyers",
  },
  {
    value: "Company or trust formation service provider",
    label: "Company or trust formation service provider",
    vertical: "accountants",
  },
  {
    value: "Property practitioner or estate agent",
    label: "Property practitioner or estate agent",
    vertical: "estate",
  },
  {
    value: "Receives or manages client funds (e.g., deposits, rentals)",
    label: "Receives or manages client funds",
    vertical: "estate",
  },
  {
    value: "Provider of long-term or short-term insurance products",
    label: "Long-term or short-term insurance",
    vertical: "financial",
  },
  {
    value: "Manager of collective investment schemes or financial portfolios",
    label: "Collective investment / portfolio manager",
    vertical: "financial",
  },
  {
    value: "Casino, online betting platform, or totalisator operator",
    label: "Casino, online betting, or totalisator",
    vertical: "gambling",
  },
  {
    value: "Gambling operator licensed under national or provincial law",
    label: "Licensed gambling operator",
    vertical: "gambling",
  },
  {
    value: "Crypto exchange, wallet provider, or crypto transaction facilitator",
    label: "Crypto exchange, wallet, or facilitator",
    vertical: "crypto",
  },
  {
    value:
      "Trader in high-value goods (e.g., cars, jewelry, art) with cash payments of R100,000+",
    label: "High-value goods dealer (including motor vehicles)",
    vertical: "dealers",
  },
  {
    value:
      "Non-profit organisation involved in cross-border fund transfers or operating in high-risk jurisdictions",
    label: "NPO with cross-border or high-risk operations",
    vertical: "npo",
  },
] as const;

export const POLICY_OPTIONS = [
  "Client Confidentiality Agreement",
  "FICA Policy",
  "Ethical Conduct Policy",
  "Fraud Prevention & Corruption Combatting Policy",
  "Risk Management Policy",
  "Electronic Data - Cyber Security Policy",
  "Electronic Data Retention Policy",
  "Whistleblowing Policy",
  "Conflict of Interest Policy",
];

export const SOFTWARE_OPTIONS = [
  "Microsoft 365",
  "Google Workspace",
  "Sage Online Accounting",
  "Xero Accounting",
  "Pastel",
  "Nord VPN",
  "Dropbox",
  "Other",
];

export const REGULATOR_OPTIONS = [
  "South African Institute of Professional Accountants (SA) - SAIPA",
  "Associate of Certified Fraud Examiners - ACFE",
  "South African Revenue Services - SARS",
  "Financial Intelligence Centre (FIC)",
  "Law Society of South Africa / Legal Practice Council",
  "Property Practitioners Regulatory Authority (PPRA)",
  "Financial Sector Conduct Authority (FSCA)",
];

export const VETTING_OPTIONS = [
  "Background Check - Prior to Employment (once)",
  "Qualification Verification - Prior to Employment (once)",
  "Names cross referenced against the FIC Sanctioned list - Annually",
  "Call references on CV to confirm employment history",
  "Credit check - Prior to Employment (once)",
  "Criminal record check - Prior to Employment (once)",
];

export const YES_NO = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];
