import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "POPI manual",
};

export default function PopiPage() {
  return (
    <LegalShell title="POPI manual">
      <p>
        This is the Protection of Personal Information (POPI) manual of Y Risk
        It (Pty) Ltd, in terms of the Protection of Personal Information Act 4
        of 2013. It should be read with our{" "}
        <Link href="/legal/privacy">Privacy statement</Link> and{" "}
        <Link href="/legal/paia">PAIA manual</Link>.
      </p>

      <h2>Responsible party</h2>
      <p>
        Y Risk It (Pty) Ltd is the responsible party for personal information
        processed through this website and the RMCP platform.
      </p>
      <p>
        Information officer: Jacqueline Grandcourt, Director
        <br />
        Email: <a href="mailto:PAIA@yriskit.co.za">PAIA@yriskit.co.za</a> or{" "}
        <a href="mailto:hello@yriskit.co.za">hello@yriskit.co.za</a>
      </p>

      <h2>Purpose of processing</h2>
      <p>We process personal information to:</p>
      <ul>
        <li>administer and manage this website and the RMCP platform;</li>
        <li>create and maintain user accounts;</li>
        <li>contract with you and manage our ongoing relationship;</li>
        <li>take payment and issue invoices;</li>
        <li>
          generate an RMCP from the particulars and answers you supply, and
          store the resulting documents;
        </li>
        <li>send renewal reminders and respond to queries;</li>
        <li>keep our records accurate; and</li>
        <li>analyse, assess and improve our business and services.</li>
      </ul>
      <p>
        We will only use personal information for the purpose required to assist
        you, or provide solutions to you, unless the law requires otherwise. We
        do not sell or rent personal information.
      </p>

      <h2>Categories of data subjects and information</h2>
      <ul>
        <li>
          <strong>Customers / clients:</strong> name, address, registration or
          identity numbers, employment status, contact details, organisation
          particulars, RMCP questionnaire answers, generated documents, and
          bank or payment details processed by our payment provider.
        </li>
        <li>
          <strong>Service providers:</strong> names, registration numbers, VAT
          numbers, address, and bank details.
        </li>
        <li>
          <strong>Employees:</strong> address, qualifications, gender and race,
          as required for employment administration.
        </li>
      </ul>
      <p>
        If you include personal information of other data subjects when you use
        the platform (for example directors, officers or staff named in an
        RMCP), you confirm that you have their permission for us to process it
        for these purposes.
      </p>

      <h2>Operators and recipients</h2>
      <p>
        We use contracted operators only as needed to provide the service. They
        must keep the information confidential and appropriately secured:
      </p>
      <ul>
        <li>Cloudflare — website hosting, database and document storage;</li>
        <li>iKhokha — payment processing;</li>
        <li>our email provider — contact messages and renewal reminders.</li>
      </ul>
      <p>
        Personal information may also be supplied where the law requires it, for
        example identity particulars for criminal checks to the South African
        Police Service, qualifications to SAQA, or credit information to credit
        bureaux, as described in Annexure G of the PAIA manual.
      </p>

      <h2>Transborder flows</h2>
      <p>
        Hosting and file storage are provided on Cloudflare. Cloudflare does
        not operate a South African region. Personal information may therefore
        be processed outside the Republic under Cloudflare’s data processing
        terms. Payments are processed by iKhokha in South Africa.
      </p>

      <h2>Security measures</h2>
      <p>
        We take reasonable technical and organisational measures to prevent
        unlawful access to, loss, damage or unauthorised destruction of
        personal information. These include access-controlled accounts,
        encrypted transport (HTTPS), and operator security safeguards such as
        encryption, anti-virus and anti-malware controls on their
        infrastructure.
      </p>

      <h2>Retention</h2>
      <p>
        We keep personal information until we are compelled or requested by you
        to delete it. Where we cannot delete it, we will take steps to
        de-identify it. Tax, FIC and dispute records may have to be retained
        even if you ask us to close an account.
      </p>

      <h2>Your rights</h2>
      <p>You may:</p>
      <ul>
        <li>ask whether we hold personal information about you;</li>
        <li>request access to that information (see the PAIA manual);</li>
        <li>ask us to correct information that is inaccurate or incomplete;</li>
        <li>object to, or withdraw consent for, processing;</li>
        <li>
          request deletion of personal information, subject to lawful
          retention;
        </li>
        <li>
          lodge a complaint with the{" "}
          <a href="https://inforegulator.org.za/" rel="noreferrer">
            Information Regulator
          </a>
          .
        </li>
      </ul>
      <p>
        Send these requests to{" "}
        <a href="mailto:PAIA@yriskit.co.za">PAIA@yriskit.co.za</a> or{" "}
        <a href="mailto:hello@yriskit.co.za">hello@yriskit.co.za</a>, or use the{" "}
        <Link href="/contact">contact form</Link>.
      </p>
    </LegalShell>
  );
}
