import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "FIC and RMCP disclaimer",
};

export default function DisclaimerPage() {
  return (
    <LegalShell title="FIC and RMCP disclaimer">
      <p>
        Y Risk It provides a documented Risk Management and Compliance
        Programme based on information you supply and on locked wording
        prepared for accountable institutions under the Financial Intelligence
        Centre Act, 38 of 2001.
      </p>
      <p>
        The accountable institution — through its board, senior management, or
        person with the highest authority — remains responsible for:
      </p>
      <ul>
        <li>approving the RMCP;</li>
        <li>implementing the controls described in it;</li>
        <li>training employees;</li>
        <li>registering on goAML and submitting reports to the FIC;</li>
        <li>keeping the programme current as the business and risks change.</li>
      </ul>
      <p>
        This service is not legal advice, not a FIC approval, and not a
        representation that the institution is compliant merely because a
        document was generated.
      </p>
    </LegalShell>
  );
}
