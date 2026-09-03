export type CatalogueItem = {
  slug: string;
  name: string;
  vertical: string;
  description: string;
  oneOffPriceCents: number;
  annualPriceCents: number;
  sortOrder: number;
};

export const PRODUCT_CATALOGUE: CatalogueItem[] = [
  {
    slug: "generic",
    name: "RMCP — Generic accountable institution",
    vertical: "generic",
    description:
      "The core FIC Act RMCP for accountable institutions, using Y Risk It's locked legal wording.",
    oneOffPriceCents: 495000,
    annualPriceCents: 195000,
    sortOrder: 1,
  },
  {
    slug: "lawyers",
    name: "RMCP — Legal practitioners",
    vertical: "lawyers",
    description:
      "Core RMCP plus attorney, notary and conveyancing controls for trust money and property transfers.",
    oneOffPriceCents: 595000,
    annualPriceCents: 245000,
    sortOrder: 2,
  },
  {
    slug: "dealers",
    name: "RMCP — Motor dealers and high-value goods",
    vertical: "dealers",
    description:
      "Core RMCP plus cash-threshold, vehicle and high-value goods dealer controls.",
    oneOffPriceCents: 595000,
    annualPriceCents: 245000,
    sortOrder: 3,
  },
  {
    slug: "accountants",
    name: "RMCP — Accountants and company service providers",
    vertical: "accountants",
    description:
      "Core RMCP plus company-formation, tax and client-funds controls for accountants and TCSPs.",
    oneOffPriceCents: 595000,
    annualPriceCents: 245000,
    sortOrder: 4,
  },
];
