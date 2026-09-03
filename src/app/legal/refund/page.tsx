import { LegalShell, PdfLink } from "@/components/legal-shell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund and cancellation policy",
  description:
    "Refund and cancellation policy for Y Risk It RMCP platform access, renewals and digital product purchases.",
  path: "/legal/refund",
});

export default function RefundPage() {
  return (
    <LegalShell title="Refund and cancellation policy">
      <PdfLink href="/legal/refund-and-cancellation-policy.pdf">
        Download this policy as a PDF
      </PdfLink>

      <h2>The Y Risk It RMCP Platform</h2>
      <p>
        Access to the Y Risk It RMCP user platform constitutes access and
        acceptance of a non-refundable digital product containing the
        proprietary Y Risk It (Pty) Ltd intellectual property. No refunds will
        be provided once platform access has been granted.
      </p>

      <h2>Non-returnable digital product</h2>
      <p>
        The RMCP platform and all associated materials are classified as
        digital products and are non-returnable under any circumstances,
        including but not limited to:
      </p>
      <ul>
        <li>Downloading but not opening the RMCP document</li>
        <li>Downloading and opening the RMCP document</li>
        <li>Partial or complete use of the platform features</li>
      </ul>

      <h2>Product description</h2>
      <p>
        The Y Risk It RMCP software is a proprietary digital solution utilizing
        customized computer applications to generate personalized RMCP templates
        based on user-provided data inputs.
      </p>

      <h2>Transfer restrictions</h2>
      <p>
        As a digital product, the RMCP software may not be returned, refunded,
        or transferred to third parties under any circumstances.
      </p>

      <h2>Data protection rights</h2>
      <p>
        In accordance with the Protection of Personal Information Act (POPIA),
        users retain the right to request deletion of their personal data from
        the platform at any time by contacting our support team at{" "}
        <a href="mailto:hello@yriskit.co.za">hello@yriskit.co.za</a>.
      </p>

      <h2>The RMCP consultations</h2>
      <p>
        Cancellations of a scheduled consultation will only be accepted and
        moved to a future date, if the cancellation is received 24+ hours prior
        to the scheduled consultation date and time.
      </p>
      <p>
        If a consultation is cancelled by the company Y RISK IT (PTY) LTD, the
        company Y RISK IT (PTY) LTD has the right to either issue a full refund
        or schedule another consultation for a future date.
      </p>
      <p>
        If a customer cancels the scheduled consultation within the stated
        deadline of 24 hours before the scheduled consultation, the customer
        will not be eligible for a refund or allowed to move the scheduled
        consultation to a future date.
      </p>
      <p>
        Refunds of scheduled consultation will not be available for customers
        who choose not to attend a scheduled consultation.
      </p>
    </LegalShell>
  );
}
