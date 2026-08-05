import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopNav } from "@/components/qp/TopNav";
import { Stepper } from "@/components/qp/Stepper";
import { RfqHeader } from "@/components/qp/RfqHeader";
import { SectionInput } from "@/components/qp/SectionInput";
import { SectionExtraction } from "@/components/qp/SectionExtraction";
import { SectionOdoo } from "@/components/qp/SectionOdoo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuotePilot — RFQ to Priced Quote for Coating Estimators" },
      {
        name: "description",
        content:
          "QuotePilot turns customer RFQ emails into structured, priced powder coating quotes and cross-checks them against Odoo before export.",
      },
      { property: "og:title", content: "QuotePilot — RFQ Automation for Coating Estimators" },
      {
        property: "og:description",
        content:
          "Extract coating specs, price each part, and cross-check customers and parts against Odoo before exporting the quote.",
      },
    ],
  }),
  component: QuotePilot,
});

function QuotePilot() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <TopNav />
      <Stepper active={step} onChange={setStep} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-6">
          <RfqHeader />
          {step === 0 ? <SectionInput onRun={() => setStep(1)} /> : null}
          {step === 1 ? (
            <SectionExtraction onBack={() => setStep(0)} onContinue={() => setStep(2)} />
          ) : null}
          {step === 2 ? <SectionOdoo onBack={() => setStep(1)} /> : null}
        </div>
      </main>
    </div>
  );
}
