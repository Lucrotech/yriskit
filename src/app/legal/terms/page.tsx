import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Terms of use",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of use">
      <p>
        Y Risk It (Pty) Ltd and its agents or representatives shall not be
        liable for any damage, loss or liability arising from the use or
        inability to use this website or the services or content provided from
        and through this website.
      </p>
      <p>
        Information, ideas and opinions expressed on this site should not be
        regarded as binding advice or the official opinion of Y Risk It (Pty)
        Ltd and users are encouraged to consult professional advice before
        taking any course of action related to information, ideas or opinions
        expressed on this site.
      </p>

      <h2>RMCP platform</h2>
      <p>
        By creating an account or paying for an RMCP you agree that Y Risk It
        grants you a licence to use the generated document for your
        organisation’s FIC Act obligations. You may not resell the locked
        wording as a competing template product.
      </p>
      <p>
        Fees are payable in South African Rand via iKhokha. One-off fees unlock
        a generation for the selected product. Annual support, if purchased,
        runs for 12 months from the payment date and includes reminder emails
        and one regeneration.
      </p>
      <p>
        To the extent permitted by law, Y Risk It is not liable for regulatory
        findings, administrative sanctions, or losses arising from incomplete
        answers, failure to implement the RMCP, or changes in the FIC Act after
        the document is generated. The board, senior management, or person with
        the highest authority remains responsible for approving and implementing
        the programme. See the{" "}
        <Link href="/legal/disclaimer">FIC and RMCP disclaimer</Link>.
      </p>
      <p>
        Refunds and cancellations are governed by our{" "}
        <Link href="/legal/refund">Refund and cancellation policy</Link>.
        Personal information is processed under our{" "}
        <Link href="/legal/privacy">Privacy statement</Link>.
      </p>
    </LegalShell>
  );
}
