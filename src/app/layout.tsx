import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ensureSeed } from "@/db/seed";
import { getSession } from "@/lib/session";
import { isAdminEmail } from "@/lib/auth";
import "./globals.css";

const serif = Libre_Baskerville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Y Risk It | RMCP Compliance",
    template: "%s | Y Risk It",
  },
  description:
    "Risk Management and Compliance Programmes for South African accountable institutions under the FIC Act. Pay, complete the questionnaire, and download your RMCP immediately.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await ensureSeed();
  const session = await getSession();
  const admin = Boolean(
    session?.user &&
      (session.user.email.toLowerCase() === (process.env.ADMIN_EMAIL || "jackie@yriskit.co.za").toLowerCase() ||
        isAdminEmail(session.user.email)),
  );

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <SiteHeader signedIn={Boolean(session?.user)} admin={admin} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
