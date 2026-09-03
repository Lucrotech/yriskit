import {
  ACCOUNTABLE_INSTITUTION_TYPES,
  POLICY_OPTIONS,
  REGULATOR_OPTIONS,
  SOFTWARE_OPTIONS,
  VETTING_OPTIONS,
  YES_NO,
  type FieldType,
} from "./fields";

export type FormField = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: { value: string; label: string }[];
  showWhen?: { key: string; equals?: string; includes?: string };
};

export type FormStep = {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
};

const opt = (values: readonly string[] | string[]) =>
  values.map((value) => ({ value, label: value }));

export const FORM_STEPS: FormStep[] = [
  {
    id: "organisation",
    title: "Organisation details",
    description:
      "These particulars appear on the cover and document-control pages of your RMCP.",
    fields: [
      {
        key: "COMPANY_NAME",
        label: "Name of accountable institution",
        type: "text",
        required: true,
        placeholder: "Registered CIPC name",
      },
      {
        key: "REG_NUMBER",
        label: "CIPC company registration number",
        type: "text",
        required: true,
        placeholder: "2024/123456/07",
      },
      {
        key: "START_DATE",
        label: "Company start date",
        type: "date",
        required: true,
      },
      {
        key: "REG_ADDRESS",
        label: "Registered address",
        type: "textarea",
        required: true,
      },
      {
        key: "POSTAL_ADDRESS",
        label: "Postal address",
        type: "textarea",
        required: true,
      },
      {
        key: "COUNTRY",
        label: "Country",
        type: "text",
        required: true,
        placeholder: "South Africa",
      },
      {
        key: "COMPANY_EMAIL",
        label: "Business email",
        type: "email",
        required: true,
      },
      {
        key: "COMPANY_PHONE",
        label: "Business telephone",
        type: "tel",
        required: true,
        placeholder: "27XXXXXXXXX",
      },
      {
        key: "COMPANY_WEBSITE",
        label: "Business website",
        type: "url",
        placeholder: "https://",
      },
      { key: "TAX_NUMBER", label: "Income tax number", type: "text", required: true },
      { key: "VAT_NUMBER", label: "VAT number", type: "text" },
      {
        key: "BANK_NAME",
        label: "Banking institution",
        type: "text",
        required: true,
      },
      {
        key: "ACCOUNT_NUMBER",
        label: "Primary account number",
        type: "text",
        required: true,
      },
      {
        key: "BUSINESS_UNIT",
        label: "Responsible business unit",
        type: "text",
        required: true,
        placeholder: "Board of Directors / Compliance",
        help: "The unit that owns this RMCP and signs it off.",
      },
    ],
  },
  {
    id: "activities",
    title: "Accountable institution type",
    description:
      "Select every Schedule 1 activity that applies. This determines how your RMCP describes the business.",
    fields: [
      {
        key: "ACCOUNTABLE_INST_TYPES",
        label: "Type(s) of accountable institution",
        type: "multiselect",
        required: true,
        options: ACCOUNTABLE_INSTITUTION_TYPES.map((t) => ({
          value: t.value,
          label: t.label,
        })),
      },
      {
        key: "BUSINESS_DESC",
        label: "Description of business activities",
        type: "textarea",
        required: true,
        help: "Plain-language description of what the institution actually does.",
      },
      {
        key: "SERVICES",
        label: "Services rendered to clients",
        type: "textarea",
        required: true,
      },
      {
        key: "LOCATION",
        label: "Location where the business operates",
        type: "text",
        required: true,
      },
      {
        key: "GEO_AREAS",
        label: "Geographical areas served",
        type: "text",
        required: true,
        placeholder: "Nationwide / Western Cape / SADC",
      },
    ],
  },
  {
    id: "fic",
    title: "FIC registration and officers",
    description:
      "FIC Act s42A requires a person of sufficient seniority to assist with compliance. Record your goAML registration and appointed officers.",
    fields: [
      {
        key: "GOAML_FIC_REG",
        label: "goAML / FIC organisation (Org ID) number",
        type: "text",
        required: true,
      },
      {
        key: "FIC_REG_DATE",
        label: "FIC date of registration",
        type: "date",
        required: true,
      },
      {
        key: "FIC_OFFICER_NAME",
        label: "Name of FIC compliance officer",
        type: "text",
        required: true,
      },
      {
        key: "FIC_OFFICER_DATE",
        label: "FIC compliance officer appointment date",
        type: "date",
        required: true,
      },
      {
        key: "MLRO_NAME",
        label: 'Money laundering reporting officer ("MLRO")',
        type: "text",
        required: true,
      },
      {
        key: "MLRO_DATE",
        label: "MLRO appointment date",
        type: "date",
        required: true,
      },
      {
        key: "POPI_OFFICER",
        label: "POPIA information officer",
        type: "text",
        required: true,
      },
      {
        key: "POPI_OFFICER_DATE",
        label: "POPIA information officer appointment date",
        type: "date",
        required: true,
      },
    ],
  },
  {
    id: "regulators",
    title: "Regulators, advisers and cover",
    description:
      "Record the professional bodies, advisers and professional indemnity arrangements that support this RMCP.",
    fields: [
      {
        key: "REGULATORS",
        label: "Regulators and professional bodies",
        type: "multiselect",
        options: opt(REGULATOR_OPTIONS),
      },
      { key: "SAIPA_NUMBER", label: "SAIPA practice number", type: "text" },
      { key: "ACFE_NUMBER", label: "ACFE membership number", type: "text" },
      { key: "SARS_PR_CODE", label: "SARS PR code", type: "text" },
      {
        key: "LSSA_NUMBER",
        label: "Legal Practice Council / LSSA practice number",
        type: "text",
      },
      {
        key: "PPRA_NUMBER",
        label: "PPRA practice number",
        type: "text",
      },
      {
        key: "ACCOUNTING_BOARD",
        label: "Accounting board / firm name",
        type: "text",
      },
      {
        key: "ACCOUNTING_EMAIL",
        label: "Accounting firm email",
        type: "email",
      },
      { key: "LEGAL_COUNSEL", label: "Legal counsel name", type: "text" },
      { key: "VAS_CONTRACT", label: "VAS contract number", type: "text" },
      { key: "PI_PROVIDER", label: "PI / policy provider", type: "text" },
      { key: "PI_POLICY_NUMBER", label: "Policy number", type: "text" },
      { key: "PI_CONTACT_NAME", label: "PI cover contact name", type: "text" },
      {
        key: "PI_CONTACT_DETAILS",
        label: "PI cover contact details",
        type: "text",
      },
    ],
  },
  {
    id: "controls",
    title: "Policies and systems",
    description:
      "FIC Guidance Note 7A expects the RMCP to describe the policies and systems used to manage ML/TF/PF risk.",
    fields: [
      {
        key: "POLICIES_SELECTED",
        label: "Policies in place",
        type: "multiselect",
        required: true,
        options: opt(POLICY_OPTIONS),
      },
      {
        key: "OTHER_POLICIES",
        label: "Other policies (list)",
        type: "textarea",
      },
      {
        key: "SOFTWARE_SELECTED",
        label: "Software packages used in the business",
        type: "multiselect",
        required: true,
        options: opt(SOFTWARE_OPTIONS),
      },
      {
        key: "SOFTWARE_LIST",
        label: "Additional software (if Other)",
        type: "textarea",
      },
    ],
  },
  {
    id: "directors",
    title: "Directors / members",
    description:
      "The board or persons with the highest authority remain accountable for the RMCP. Capture at least the primary responsible person.",
    fields: [
      {
        key: "DIRECTOR_COUNT",
        label: "Number of company directors / members",
        type: "select",
        required: true,
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
        ],
      },
      ...directorFields(1, true),
      ...directorFields(2, false),
      ...directorFields(3, false),
      ...directorFields(4, false),
    ],
  },
  {
    id: "staff",
    title: "Key staff",
    description:
      "Non-director key staff. If you have more than two, keep a staff annexure with the RMCP as required by the template.",
    fields: [
      {
        key: "STAFF_COUNT",
        label: "Number of key staff (non-directors)",
        type: "select",
        required: true,
        options: [
          { value: "0", label: "No staff" },
          { value: "1", label: "1 key staff member" },
          { value: "2", label: "2 key staff members" },
          { value: "3", label: "3 key staff members" },
          { value: "4", label: "4 key staff members" },
        ],
      },
      ...staffFields(1),
      ...staffFields(2),
      ...staffFields(3),
      ...staffFields(4),
      {
        key: "VETTING_SELECTED",
        label: "Mechanisms used to screen staff",
        type: "multiselect",
        required: true,
        options: opt(VETTING_OPTIONS),
      },
    ],
  },
  {
    id: "review",
    title: "Declaration",
    description:
      "Confirm that the information is complete and that the accountable institution remains responsible for approving and implementing the RMCP.",
    fields: [
      {
        key: "DECLARATION",
        label:
          "I confirm the information is accurate, I am authorised to complete this RMCP, and I understand that the board / senior management must approve and implement it.",
        type: "yesno",
        required: true,
        options: YES_NO,
      },
    ],
  },
];

function directorFields(n: number, required: boolean): FormField[] {
  const prefix = n === 1 ? "DIR" : n === 2 ? "DIR2" : `DIR${n}`;
  const show = n === 1 ? undefined : { key: "DIRECTOR_COUNT", includes: String(n) };
  const personShow =
    n <= 2
      ? show
      : { key: "DIRECTOR_COUNT", includes: String(n) };
  return [
    {
      key: `${prefix}_TITLE`,
      label: `Director ${n} — capacity / job title`,
      type: "text",
      required,
      showWhen: personShow,
    },
    {
      key: `${prefix}_NAME`,
      label: `Director ${n} — name and surname`,
      type: "text",
      required,
      showWhen: personShow,
    },
    {
      key: `${prefix}_ID`,
      label: `Director ${n} — South African ID number`,
      type: "text",
      required,
      showWhen: personShow,
    },
    {
      key: `${prefix}_TAX`,
      label: `Director ${n} — income tax number`,
      type: "text",
      showWhen: personShow,
    },
    {
      key: `${prefix}_START_DATE`,
      label: `Director ${n} — start date with company`,
      type: "date",
      showWhen: personShow,
    },
    {
      key: `${prefix}_MARRIED`,
      label: `Director ${n} — married`,
      type: "yesno",
      options: YES_NO,
      showWhen: personShow,
    },
    {
      key: `${prefix}_DEPENDENTS`,
      label: `Director ${n} — dependants`,
      type: "yesno",
      options: YES_NO,
      showWhen: personShow,
    },
    {
      key: `${prefix}_ADDRESS`,
      label: `Director ${n} — physical address`,
      type: "textarea",
      showWhen: personShow,
    },
    {
      key: `${prefix}_CELL`,
      label: `Director ${n} — cellphone`,
      type: "tel",
      showWhen: personShow,
    },
    {
      key: `${prefix}_EMAIL`,
      label: `Director ${n} — email`,
      type: "email",
      showWhen: personShow,
    },
  ];
}

function staffFields(n: number): FormField[] {
  const prefix = n === 1 ? "STAFF1" : n === 2 ? "STAFF2" : `STAFF${n}`;
  return [
    {
      key: `${prefix}_TITLE`,
      label: `Staff ${n} — capacity / job title`,
      type: "text",
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_NAME`,
      label: `Staff ${n} — name and surname`,
      type: "text",
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_ID`,
      label: `Staff ${n} — South African ID number`,
      type: "text",
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_START_DATE`,
      label: `Staff ${n} — start date with company`,
      type: "date",
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_MARRIED`,
      label: `Staff ${n} — married`,
      type: "yesno",
      options: YES_NO,
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_DEPENDENTS`,
      label: `Staff ${n} — dependants`,
      type: "yesno",
      options: YES_NO,
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_ADDRESS`,
      label: `Staff ${n} — physical address`,
      type: "textarea",
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_CELL`,
      label: `Staff ${n} — cellphone`,
      type: "tel",
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
    {
      key: `${prefix}_EMAIL`,
      label: `Staff ${n} — email`,
      type: "email",
      showWhen: { key: "STAFF_COUNT", includes: String(n) },
    },
  ];
}

export function isFieldVisible(
  field: FormField,
  answers: Record<string, unknown>,
): boolean {
  if (!field.showWhen) return true;
  const raw = answers[field.showWhen.key];
  const value = Array.isArray(raw) ? raw.join(",") : String(raw ?? "");
  if (field.showWhen.equals !== undefined) {
    return value === field.showWhen.equals;
  }
  if (field.showWhen.includes !== undefined) {
    const needed = Number(field.showWhen.includes);
    const count = Number(value || 0);
    if (!Number.isNaN(needed) && !Number.isNaN(count) && count > 0) {
      return count >= needed;
    }
    return value.includes(field.showWhen.includes);
  }
  return true;
}

export function allFormFields(): FormField[] {
  return FORM_STEPS.flatMap((step) => step.fields);
}
