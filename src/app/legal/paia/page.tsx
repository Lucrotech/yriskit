import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, PdfLink } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "PAIA manual",
};

export default function PaiaPage() {
  return (
    <LegalShell title="PAIA manual">
      <p>
        This is the Promotion of Access to Information Manual of Y Risk It
        (Pty) Ltd, compiled in terms of section 51 of the Promotion of Access
        to Information Act 2 of 2000. It was adopted by Jacqueline Grandcourt,
        Director, on 1 February 2026.
      </p>
      <PdfLink href="/legal/paia-manual.pdf">
        Download the full PAIA manual (PDF)
      </PdfLink>
      <p>
        The PDF is the complete manual, including request forms, prescribed
        fees, and the processing-of-personal-information annexure. Use that
        document when making a formal request.
      </p>

      <h2>Information officer</h2>
      <p>
        Head of organisation: Jacqueline Grandcourt
        <br />
        Requests:{" "}
        <a href="mailto:PAIA@yriskit.co.za">PAIA@yriskit.co.za</a>
      </p>
      <p>
        A copy of the manual is available on this website, at our head office
        for public inspection during normal business hours, to any person upon
        request and payment of a reasonable prescribed fee, and to the
        Information Regulator upon request.
      </p>

      <h2>How to request a record</h2>
      <p>
        Complete the request form in the manual (Annexure E) and send it to{" "}
        <a href="mailto:PAIA@yriskit.co.za">PAIA@yriskit.co.za</a>, with proof
        of identity. Requests on behalf of another person must include proof of
        authorisation. Prescribed fees are set out in Annexure F of the manual.
        Personal requesters are not charged a request fee.
      </p>
      <p>
        The Information Regulator’s guide on how to use PAIA is available at{" "}
        <a href="https://eservices.inforegulator.org.za/" rel="noreferrer">
          eservices.inforegulator.org.za
        </a>
        .
      </p>
      <p>
        Our treatment of personal information more generally is described in the{" "}
        <Link href="/legal/privacy">Privacy statement</Link> and{" "}
        <Link href="/legal/popi">POPI manual</Link>.
      </p>
    </LegalShell>
  );
}
