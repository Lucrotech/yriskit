import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3", "docx", "docxtemplater", "pizzip"],
  async redirects() {
    return [
      { source: "/privacy-statement", destination: "/legal/privacy", permanent: true },
      { source: "/privacy", destination: "/legal/privacy", permanent: true },
      { source: "/terms", destination: "/legal/terms", permanent: true },
      { source: "/paia-manual", destination: "/legal/paia", permanent: true },
      { source: "/paia", destination: "/legal/paia", permanent: true },
      { source: "/popi-manual", destination: "/legal/popi", permanent: true },
      { source: "/popi", destination: "/legal/popi", permanent: true },
      { source: "/popia", destination: "/legal/popi", permanent: true },
      { source: "/refund-policy", destination: "/legal/refund", permanent: true },
      { source: "/refund", destination: "/legal/refund", permanent: true },
    ];
  },
};

export default nextConfig;
