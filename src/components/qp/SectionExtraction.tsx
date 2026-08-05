import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Edit,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Field, KV, SubSection } from "./bits";

const summaryRows = [
  ["1", "Pa4-354/35", "10", "Rivet Panel Holder", "$300.00 / 250 Sq In", "$3,000.00"],
  ["2", "DSC4577524", "25", "Wheel Bearing Insert", "$55.00 / 10 Sq In", "$1,375.00"],
  [
    "3",
    "ABCsdf456456",
    "3",
    "Lamp Shade Panel With Multi-Colors",
    "$2,000.00 / 1,562 Sq In",
    "$6,000.00",
  ],
];

const coatingBom: Array<[string, string, boolean?]> = [
  ["Masking", "None", true],
  ["Media Blasting", "Not listed", true],
  ["Primer", "MIL-PRF-32348, TYPE 1"],
  ["Prep", "Prep and apply per MIL-DTL-53072"],
  ["Topcoat", "MIL-PRF-32348, TYPE 3 (CARC Powder Coat)"],
  ["Color", "FED-STD-595 34094 GREEN 383 CAMO"],
  ["Coverage", "All surfaces"],
  ["Sequencing", "Apply primer and topcoat to all surfaces after rivet installation"],
  ["Part Mark", "Ink stamp part number, revision, mfg date"],
];

function PricingGroup({
  title,
  rows,
  cost,
}: {
  title: string;
  rows: Array<[string, string]>;
  cost?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="mb-1 flex items-center justify-between">
        <h5 className="text-base font-semibold">{title}</h5>
        {cost ? <span className="text-base font-semibold tabular-nums">{cost}</span> : null}
      </div>
      <div className="divide-y divide-border/60">
        {rows.map(([k, v]) => (
          <KV key={k} label={k} value={v} />
        ))}
      </div>
    </div>
  );
}

function CollapsedPart({
  partNumber,
  name,
  total,
}: {
  partNumber: string;
  name: string;
  total: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full flex-wrap items-center gap-3 rounded-lg border border-border bg-background p-4 text-left transition-colors hover:border-muted-foreground/30 hover:bg-surface"
    >
      <ChevronRight className="size-4 text-muted-foreground" />
      <span className="text-base font-semibold">{partNumber}</span>
      <span className="text-base text-muted-foreground">→ {name}</span>
      <span className="ml-auto text-base font-semibold tabular-nums">Total: {total}</span>
    </button>
  );
}

export function SectionExtraction({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [customerOpen, setCustomerOpen] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Extraction Results</h1>
        <p className="mt-1 text-base text-muted-foreground">
          Review each part&apos;s coating specs and pricing before Odoo cross-check.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Extracted with Gemini 2.5 Pro · 47 fields · 3 flagged for review
        </p>
      </div>

      <Alert className="border-success/30 bg-surface-success">
        <CheckCircle className="size-4 text-success" />
        <AlertDescription className="flex w-full flex-wrap items-center justify-between gap-2 text-foreground">
          <span>AI extraction complete. Review each part below.</span>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View Extraction Log <ExternalLink className="size-3.5" />
          </a>
        </AlertDescription>
      </Alert>

      {/* Customer information */}
      <Card className="transition-colors hover:border-muted-foreground/30">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl font-semibold">Customer Information</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setCustomerOpen((o) => !o)}>
            <ChevronDown
              className={`size-4 transition-transform ${customerOpen ? "" : "-rotate-90"}`}
            />
            {customerOpen ? "Collapse" : "Expand"}
          </Button>
        </CardHeader>
        {customerOpen ? (
          <CardContent className="divide-y divide-border/60">
            <Field label="Odoo Q#" helper="If applicable" />
            <Field label="Company" value="ABC Metal Works" />
            <Field label="Contact" value="John Smith" />
            <Field label="Email" value="John@abcmetalworks.com" />
            <Field label="Phone" value="714-555-1212" />
            <Field label="Address" value="123 Main St, Los Angeles, CA 90024" />
            <Field label="Email / Req Date" value="July 5, 2026" />
            <Field label="Request DD (Due Date)" value="Unknown" warn />
            <Field
              label="Request Summary"
              value="Request for quote to apply CARC powder coating to two riveted assemblies per drawings 117-0018-001 and 117-0019-001."
            />
          </CardContent>
        ) : null}
      </Card>

      {/* Part summary */}
      <Card className="transition-colors hover:border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Part Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>Part #</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Name / Description</TableHead>
                  <TableHead>Price / unit</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryRows.map((r) => (
                  <TableRow key={r[1]}>
                    <TableCell className="text-muted-foreground">{r[0]}</TableCell>
                    <TableCell className="font-medium">{r[1]}</TableCell>
                    <TableCell className="tabular-nums">{r[2]}</TableCell>
                    <TableCell>{r[3]}</TableCell>
                    <TableCell className="tabular-nums">{r[4]}</TableCell>
                    <TableCell className="text-right tabular-nums">{r[5]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Separator />
          <div className="text-right text-xl font-bold tabular-nums">Total Quote: $10,375.00</div>
        </CardContent>
      </Card>

      {/* Part details */}
      <Card className="transition-colors hover:border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Part Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Part 1 */}
          <div className="rounded-lg border border-border p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
              <div className="text-lg font-bold">Pa4-354/35 → Rivet Panel Holder</div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm">
                  <Edit className="size-4" /> Edit
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="size-4" /> Delete
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <SubSection title="Specifications" tone="muted">
                <div className="divide-y divide-border/60">
                  <Field label="Price per unit" value="$300.00" helper="Computed price: $300.00" />
                  <Field label="Quantity" value="10" />
                  <Field label="Total Line Item" value="$3,000.00" />
                  <Field
                    label="Drawing file"
                    editable={false}
                    value={
                      <span className="flex items-center gap-2">
                        Filename1.pdf
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          View
                        </Button>
                      </span>
                    }
                  />
                  <Field label="Revision" value="C00" />
                  <Field label="Is Assembly" value="Yes" />
                  <Field label="(E) Coating?" value="Unknown" warn />
                  <Field label="Material" value="Steel" />
                  <Field label="Part Mark" value="Yes" />
                  <Field label="Prep type" value="Media blasting" />
                  <Field label="Scale?" value="No" warn />
                  <Field
                    label="Total surface (Sq In)"
                    value="595 Sq In"
                    helper="All sides, 2 sided, edges"
                  />
                  <Field
                    label="Coating Area (Sq In)"
                    editable={false}
                    value={
                      <span className="flex items-center gap-2">
                        250 Sq In <Badge variant="danger">LOW confidence</Badge>
                      </span>
                    }
                  />
                  <Field
                    label="Masking Area (Sq In)"
                    editable={false}
                    value={
                      <span className="flex items-center gap-2">
                        345 Sq In <Badge variant="warning">MEDIUM confidence</Badge>
                      </span>
                    }
                  />
                </div>
              </SubSection>

              <SubSection title="Coating Details (Coating BOM)">
                <p className="mb-3 text-sm text-muted-foreground">
                  Items marked None/Not listed will NOT be exported to Odoo.
                </p>
                <dl className="grid gap-x-8 sm:grid-cols-2">
                  {coatingBom.map(([k, v, warn]) => (
                    <div key={k} className="border-b border-border/60 py-2">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd
                        className={`text-base ${warn ? "font-medium text-warning" : "text-foreground"}`}
                      >
                        {v}
                        {warn ? (
                          <AlertTriangle className="ml-1 inline size-4 align-[-2px]" />
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </SubSection>

              <SubSection title="Extraction Notes & Warnings" tone="warning">
                <ul className="space-y-2 text-base">
                  <li className="flex gap-2">
                    <AlertTriangle className="mt-1 size-4 shrink-0 text-warning" />
                    <span>
                      No dimensions on the drawing → low-confidence surface area estimation
                    </span>
                  </li>
                  <li>
                    <span className="text-sm text-muted-foreground">Method: </span>
                    Visual Estimation from 3D Model Views
                  </li>
                  <li>
                    <span className="text-sm text-muted-foreground">Dimensions found: </span>
                    No dimensional values present. Tolerances specified (e.g., X.X ± 0.5 mm), but no
                    nominal dimensions.
                  </li>
                  <li>
                    <span className="text-sm text-muted-foreground">Reasoning: </span>
                    Visual approximation from isometric views.
                  </li>
                  <li>
                    <span className="text-sm text-muted-foreground">Notes for estimator: </span>
                    Request the 3D model referenced in Note 2 for accurate surface area.
                  </li>
                </ul>
              </SubSection>

              {/* Pricing breakdown */}
              <SubSection title="Pricing Breakdown" tone="strong">
                <div className="space-y-4">
                  <div className="text-base font-bold tabular-nums">
                    Pricing: $300.24/unit × 10 = $3,004.36 total
                  </div>

                  <div className="flex flex-wrap items-end gap-3">
                    <div className="space-y-1.5">
                      <Label>Complexity (1-5)</Label>
                      <Select defaultValue="3">
                        <SelectTrigger className="w-56 bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 (Simple)</SelectItem>
                          <SelectItem value="2">2 (Light)</SelectItem>
                          <SelectItem value="3">3 (Moderate)</SelectItem>
                          <SelectItem value="4">4 (Complex)</SelectItem>
                          <SelectItem value="5">5 (Severe)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="pb-2 text-sm text-muted-foreground">
                      Adjusts labor (+/- X%)
                    </span>
                  </div>

                  <PricingGroup
                    title="Masking"
                    cost="$35.24"
                    rows={[
                      ["Area", "345 Sq In"],
                      ["Holes", "24 Openings"],
                      ["Time", "30 min @ $35.56/hr"],
                      ["Cost", "$35.24"],
                    ]}
                  />
                  <PricingGroup
                    title="Media Blasting"
                    cost="$10.38"
                    rows={[
                      ["Area", "250 Sq In"],
                      ["Time", "8 min @ $35.56/hr"],
                      ["Cost", "$10.38"],
                    ]}
                  />
                  <PricingGroup
                    title="Coating"
                    cost="$85.27"
                    rows={[
                      ["Area", "250 Sq In"],
                      ["Time", "20 min @ $45.56/hr"],
                      ["Material", "1.3 Oz @ $11.22/oz"],
                      ["Color Complexity", "Normal (FED-STD-595 34094 GREEN 383 CAMO)"],
                      ["Oven Time", "35 min @ $20.38/hr"],
                      ["Cost", "$85.27"],
                    ]}
                  />
                  <PricingGroup
                    title="Part Mark & Extras"
                    rows={[
                      ["Part Mark", "+ $1.00 (Typical: $1/mark)"],
                      ["Extra work", "+ $0.00"],
                      ["Extra resource", "+ $0.00"],
                    ]}
                  />

                  <Separator />
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between text-base font-bold">
                      <span>Total Part Cost</span>
                      <span className="tabular-nums">$243.24 per unit</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Labor: $198.15 | Total Material: $68.15 | Total Time: 01:32 min
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-background p-4">
                    <h5 className="mb-1 text-base font-semibold">Adjustments</h5>
                    <div className="divide-y divide-border/60">
                      <KV label="Rush order" value="+ $2.24 (or + 1.5% of cost)" />
                      <KV label="Setup / Extra work" value="+ $3.20 (or + 2.3% of cost)" />
                      <KV label="Shipping" value="+ $0.00 (or + 0%)" />
                      <KV label="Discount" value="- $0.00 (or - 0%)" />
                      <div className="flex flex-wrap items-baseline justify-between gap-2 py-1.5">
                        <span className="text-sm text-muted-foreground">Overhead &amp; Profit</span>
                        <span className="flex items-center gap-3">
                          <span className="tabular-nums">+ $57.00 (or + 18% of cost)</span>
                          <a
                            href="#"
                            className="text-sm text-primary underline-offset-4 hover:underline"
                          >
                            Adjust for neg. rate
                          </a>
                          <a
                            href="#"
                            className="text-sm text-primary underline-offset-4 hover:underline"
                          >
                            Details
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-primary p-5 text-primary-foreground">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-base font-semibold">Price per Unit</span>
                      <span className="text-2xl font-bold tabular-nums">$300.24</span>
                    </div>
                    <p className="mt-1 text-sm opacity-80">
                      $0.28 / PSI (ABC Metal Works Inc. Neg Rate: $0.28)
                    </p>
                    <Separator className="my-3 bg-primary-foreground/20" />
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-base font-semibold">Total Line Item</span>
                      <span className="text-xl font-bold tabular-nums">$3,004.36 (10 Qty)</span>
                    </div>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Estimator Notes">
                <Textarea
                  className="min-h-[100px]"
                  defaultValue="This part has issues with packing. The shipping material is expensive. So add more work $."
                />
              </SubSection>
            </div>
          </div>

          <CollapsedPart
            partNumber="DSC4577524"
            name="Wheel Bearing Insert"
            total="$1,375.00"
          />
          <CollapsedPart
            partNumber="ABCsdf456456"
            name="Lamp Shade Panel With Multi-Colors"
            total="$6,000.00"
          />
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" /> Back to Input
        </Button>
        <Button onClick={onContinue}>
          Continue to Odoo Cross-Check <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
