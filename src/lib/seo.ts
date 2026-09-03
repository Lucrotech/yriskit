import type { Metadata } from "next";

export const SITE_NAME = "Y Risk It";
export const SITE_LEGAL_NAME = "Y Risk It (Pty) Ltd";
export const SITE_TAGLINE = "RMCP Compliance for South African Accountable Institutions";
export const CONTACT_EMAIL = "hello@yriskit.co.za";

export const CANONICAL_SITE_URL = "https://yriskit.co.za";

export const DEFAULT_DESCRIPTION =
  "Risk Management and Compliance Programmes (RMCP) for South African accountable institutions under the FIC Act. Pay online at yriskit.co.za, complete the guided questionnaire, and download board-ready Word and PDF documents immediately.";

export const DEFAULT_KEYWORDS = [
  "RMCP",
  "Risk Management and Compliance Programme",
  "FIC Act",
  "Financial Intelligence Centre Act",
  "accountable institution",
  "South Africa",
  "AML compliance",
  "CTF compliance",
  "goAML",
  "Guidance Note 7A",
  "FIC compliance",
  "anti-money laundering",
  "counter-terrorist financing",
  "POPIA",
];

/** Canonical public origin for metadata, sitemap, robots, JSON-LD and llms.txt. */
export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL).replace(/\/$/, "");
}

export function absoluteUrl(path = "") {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      url,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export const PRIVATE_METADATA = pageMetadata({
  title: "Private",
  description: "Sign-in required.",
  path: "/app",
  noIndex: true,
});

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: SITE_LEGAL_NAME,
    alternateName: SITE_NAME,
    url: siteUrl(),
    logo: absoluteUrl("/icon.svg"),
    email: CONTACT_EMAIL,
    description: DEFAULT_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    knowsAbout: [
      "Financial Intelligence Centre Act",
      "Risk Management and Compliance Programme",
      "Anti-money laundering",
      "Counter-terrorist financing",
      "Accountable institutions",
      "goAML",
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: siteUrl(),
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-ZA",
    publisher: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: SITE_LEGAL_NAME,
      url: siteUrl(),
    },
  };
}

export function faqPageJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: SITE_LEGAL_NAME,
      url: siteUrl(),
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    url: absoluteUrl(path),
  };
}

export const PUBLIC_ROUTES = [
  { path: "/", changefreq: "weekly" as const, priority: 1 },
  { path: "/how-it-works", changefreq: "monthly" as const, priority: 0.9 },
  { path: "/industries", changefreq: "monthly" as const, priority: 0.9 },
  { path: "/pricing", changefreq: "weekly" as const, priority: 0.95 },
  { path: "/faq", changefreq: "monthly" as const, priority: 0.85 },
  { path: "/contact", changefreq: "monthly" as const, priority: 0.8 },
  { path: "/legal/privacy", changefreq: "yearly" as const, priority: 0.5 },
  { path: "/legal/terms", changefreq: "yearly" as const, priority: 0.5 },
  { path: "/legal/refund", changefreq: "yearly" as const, priority: 0.5 },
  { path: "/legal/paia", changefreq: "yearly" as const, priority: 0.5 },
  { path: "/legal/popi", changefreq: "yearly" as const, priority: 0.5 },
  { path: "/legal/disclaimer", changefreq: "yearly" as const, priority: 0.5 },
];
