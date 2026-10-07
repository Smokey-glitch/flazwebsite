import type { Metadata } from "next";
import { LegalPageLayout, LegalSection, LegalContact, LegalLinks } from "@/components/LegalPageLayout";
import ContactFooter from "@/components/ContactFooter";
import { LEGAL_UPDATED, company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "How cancellations, refunds and defects are handled for Flaz Technical Services projects and maintenance contracts.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <main>
      <LegalPageLayout eyebrow="Legal" title="Refund & Cancellation Policy" lastUpdated={LEGAL_UPDATED}>
        <p className="font-light text-gray-600 leading-relaxed" style={{ fontSize: "15px" }}>
          This policy explains how cancellations and refunds work for services provided by{" "}
          {company.name}. Our services are quoted and agreed individually, so the signed quotation or
          contract for your job always sets the exact amounts, payment stages and deadlines. If it
          differs from this page, the signed document applies.
        </p>

        <LegalSection title="This website takes no payments">
          <p>
            You cannot buy anything on this website. Submitting an enquiry does not create a contract
            and costs nothing. A contract exists only once you accept our written quotation or sign
            our agreement.
          </p>
        </LegalSection>

        <LegalSection title="Cancelling before work starts">
          <p>
            You may cancel an accepted quotation or contract in writing before work begins. Any
            deposit or advance payment is refunded, less amounts we have already properly incurred at
            your request, such as non-returnable materials or custom items already ordered, design
            work already carried out and site-survey or mobilisation costs that were agreed in
            writing. We will give you an itemised statement of any deduction.
          </p>
        </LegalSection>

        <LegalSection title="Cancelling after work has started">
          <p>
            If you cancel or change the scope after work has started, you pay for work completed and
            materials supplied or committed up to the date of cancellation, in line with the payment
            schedule in your agreement. Any payment you made beyond that amount is refunded.
          </p>
        </LegalSection>

        <LegalSection title="Work that is not as agreed">
          <p>
            If completed work does not match the agreed scope, or is defective, tell us in writing as
            soon as you notice. We will inspect it and, where the fault is ours, put it right at our
            cost within a reasonable time. If we cannot put it right, you are entitled to a
            proportionate price reduction or refund for the affected part of the work. Defect and
            warranty periods are those stated in your agreement.
          </p>
        </LegalSection>

        <LegalSection title="Maintenance contracts and call-outs">
          <p>
            Annual Maintenance Contracts can be ended as set out in the contract, including any
            notice period. Where you have prepaid for a period of service we have not yet provided,
            the unused portion is refunded as the contract provides. One-off call-outs and repairs
            that have been carried out are charged as quoted.
          </p>
        </LegalSection>

        <LegalSection title="How refunds are paid">
          <p>
            Agreed refunds are paid to the account or card the payment came from, or by another
            method agreed with you, within the period stated in your agreement or, if none is stated,
            within a reasonable time after the refund is agreed.
          </p>
        </LegalSection>

        <LegalSection title="Your statutory rights">
          <p>
            Nothing in this policy limits any right you have under UAE law, including consumer
            protection law, that cannot be excluded by agreement.
          </p>
        </LegalSection>

        <LegalSection title="How to ask">
          <p>
            To cancel or request a refund, email{" "}
            <a href={`mailto:${company.email}`} className="underline">{company.email}</a> with your
            name, the project or contract reference and the reason. We will confirm receipt in
            writing.
          </p>
        </LegalSection>

        <LegalContact />
        <LegalLinks />
      </LegalPageLayout>

      <ContactFooter />
    </main>
  );
}
