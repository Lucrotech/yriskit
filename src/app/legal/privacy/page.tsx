import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy statement",
  description:
    "Privacy statement for Y Risk It (Pty) Ltd, including how personal information is collected and processed on the RMCP platform under POPIA.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy statement">
      <p>
        This privacy statement is the official statement of Y Risk It (Pty) Ltd
        for this website, including the RMCP platform.
      </p>

      <h2>1. Definitions</h2>
      <p>In this privacy statement, the words below have the following meanings assigned to them:</p>
      <ul>
        <li>
          <strong>aggregate information</strong> is the collective, consolidated
          information of users of the website that is pooled together and where
          users are only identified as part of the pool in general terms and are
          not identified individually.
        </li>
        <li>
          <strong>data subject</strong> is a person to whom Personal Information
          relates.
        </li>
        <li>
          <strong>personal information</strong> as defined in the POPI Act, and
          in relation to the Data Subject.
        </li>
        <li>
          <strong>process information</strong> means the automated or manual
          activity of collecting, recording, organising, storing, updating,
          distributing and removing or deleting personal information.
        </li>
        <li>
          <strong>we</strong>, <strong>us</strong>, <strong>our</strong> and{" "}
          <strong>Y Risk It</strong> means Y Risk It (Pty) Ltd.
        </li>
        <li>
          <strong>website</strong> means the internet site with “Y Risk It” in
          the address.
        </li>
        <li>
          <strong>you</strong> and <strong>your</strong> means the user of the
          website.
        </li>
      </ul>

      <h2>2. We care about your Personal Information</h2>
      <p>
        We respect your privacy and are committed to safeguarding your Personal
        Information and keeping it confidential. The objective of this Privacy
        Statement is to set out how we collect, use, share, otherwise process,
        and protect your Personal Information, in line with the Protection of
        Personal Information Act 4 of 2013 (“POPI Act”).
      </p>
      <p>
        We acknowledge our responsibilities in relation to the integrity,
        confidentiality and protection of your Personal Information and have
        taken reasonable technical and organisational measures to prevent
        unlawful access to, loss, damage, or unauthorised destruction thereof.
      </p>
      <p>
        We will process your information for different purposes, such as to
        personalise your experience and to communicate with you about our
        services and offerings.
      </p>

      <h2>3. Our responsibilities</h2>
      <p>
        We will only use your Personal Information for the purpose required to
        assist you, or provide solutions to you. We will not share or further
        process your Personal Information with anyone if it is not required to
        assist you with your solutions, or unless it is required by law.
      </p>
      <p>
        We will ensure that your Personal Information is accurate, complete,
        updated and not misleading by obtaining your Personal Information
        directly from you.
      </p>
      <p>
        It is important to note that if you include the Personal Information of
        other Data Subjects when engaging with us, we will also process their
        Personal Information for the purposes set out in this Privacy Statement.
        When you give us Personal Information about other Data Subjects, you
        confirm that you have received their permission to share their Personal
        Information with us for the purposes set out in this Privacy Statement
        or any other related purposes.
      </p>
      <p>
        We will ensure that any contracted third party with whom we share your
        Personal Information, agrees to keep your information confidential and
        appropriately secured.
      </p>
      <p>
        We will not sell or rent your Personal Information to third parties. The
        only information about users we will ever disclose to third parties is
        aggregate information as defined above.
      </p>

      <h2>4. Your consent</h2>
      <p>
        Should you wish to engage with us, or make use of our services or
        offerings, we do require your acceptance of the terms and conditions of
        this Privacy Statement.
      </p>
      <p>
        By visiting the website and receiving electronic information or
        communication by electronic means, you consent to the website’s
        agreements, notices and disclosures.
      </p>
      <p>
        When you engage with us through our website, you consent to the
        processing of your information for the purposes set out below:
      </p>
      <ul>
        <li>To administer and manage systems, websites and mobile applications.</li>
        <li>To contract with you and manage our ongoing relationship with you.</li>
        <li>To make sure that our records are accurate and up to date.</li>
        <li>
          To enable Y Risk It and contracted third-party providers to provide
          you with our services or to communicate with you about these.
        </li>
        <li>
          To enable Y Risk It or a representative approved by Y Risk It to
          advise you of, or offer to you, any enhanced services, or new services
          that become available from time to time and which you may become
          entitled to or qualify for.
        </li>
        <li>To respond to your queries.</li>
        <li>To analyse, assess and improve our business and services.</li>
        <li>
          To create your login, take payment, generate an RMCP from the answers
          you supply, store generated documents, and send renewal reminders.
        </li>
      </ul>
      <p>
        This Privacy Statement may be updated from time to time, and the latest
        version applies each time that you visit our website. We are not
        responsible for the content or privacy practices of non-Y Risk It
        websites to which our website may refer.
      </p>
      <p>
        You agree that we may keep your Personal Information until such time as
        we are compelled or requested by you to delete it. Where we cannot
        delete your personal information, we will take all steps to de-identify
        (anonymise) the data. In some cases, we may use cookies and other
        tracking technologies to collect Personal Information, or to collect
        information that becomes Personal Information if we combine it with
        other information. This enables us to improve your future visits to our
        site.
      </p>

      <h2>5. This RMCP website</h2>
      <p>
        In addition to ordinary website use, this platform processes account
        details, organisation particulars, RMCP questionnaire answers, generated
        documents, payment records, and contact-form submissions.
      </p>
      <p>
        Hosting and file storage are provided on Cloudflare (Pages, D1 and R2).
        Cloudflare does not operate a South African region. By using the service
        you acknowledge that information may be processed in other jurisdictions
        under Cloudflare’s data processing terms. Payments are processed by
        iKhokha. Email is sent through our mail provider when a message is
        submitted or a renewal reminder is due.
      </p>
      <p>
        Some information (for example tax, FIC and dispute records) may have to
        be retained even if you ask us to delete an account.
      </p>

      <h2>6. Your rights</h2>
      <p>
        We respect your right to object to, or withdraw your consent for the
        processing of your Personal Information. If you wish to withdraw your
        consent to process your Personal Information, or if any of your Personal
        Information is incorrect, inaccurate or incomplete, please notify us.
      </p>
      <p>
        You can ask us about the Personal Information that we have about you. If
        you wish to request this information, a specific application must be
        completed.         Access to records of Y Risk It is also dealt with in our{" "}
        <Link href="/legal/paia">PAIA manual</Link>. How we process personal
        information under the POPI Act is set out in the{" "}
        <Link href="/legal/popi">POPI manual</Link>.
      </p>
      <p>
        For any of the above queries, you can contact us on{" "}
        <a href="mailto:hello@yriskit.co.za">hello@yriskit.co.za</a> or{" "}
        <a href="mailto:PAIA@yriskit.co.za">PAIA@yriskit.co.za</a>. If we are
        unable to resolve any questions or concerns you may have, you can
        approach the{" "}
        <a href="https://inforegulator.org.za/" rel="noreferrer">
          Information Regulator
        </a>
        .
      </p>
    </LegalShell>
  );
}
