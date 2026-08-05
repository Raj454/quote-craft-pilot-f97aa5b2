import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Upload, Wrench, X, ArrowRight } from "lucide-react";

const emailBody = `Hi,
Could we please get pricing for the attached items? The qty will be 6 each.
Thanks,
John
ABC Company
714-555-1212`;

const files = [
  { name: "Filename1.pdf", size: "5,426 KB", badge: "PDF", cad: false },
  { name: "Filename2.stp", size: "6,426 KB", badge: "CAD — accurate surface area", cad: true },
  { name: "Filename3.step", size: "7,426 KB", badge: "CAD — accurate surface area", cad: true },
];

export function SectionInput({ onRun }: { onRun: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Input Form</h1>
        <p className="mt-1 text-base text-muted-foreground">
          Enter customer email content and upload drawings to begin extraction.
        </p>
      </div>

      <Card className="transition-colors hover:border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Request / Email Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="rfq-email">Paste the customer&apos;s RFQ email content</Label>
          <Textarea id="rfq-email" className="min-h-[250px]" defaultValue={emailBody} />
          <div className="flex justify-end">
            <Button variant="ghost" size="sm">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-colors hover:border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Upload Drawings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface px-6 py-10 text-center">
            <Upload className="size-7 text-muted-foreground" />
            <p className="mt-3 text-base font-medium">Drop drawing files here</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload or drop drawing files. Limit 200 MB per file. Supported: PDF, STP, STEP
            </p>
            <Button variant="outline" size="sm" className="mt-4">
              Browse files
            </Button>
          </div>
          <div className="space-y-3">
            {files.map((f) => (
              <div
                key={f.name}
                className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:border-muted-foreground/30"
              >
                {f.cad ? (
                  <Wrench className="size-5 text-muted-foreground" />
                ) : (
                  <FileText className="size-5 text-muted-foreground" />
                )}
                <span className="text-base font-medium">{f.name}</span>
                <span className="text-sm text-muted-foreground">{f.size}</span>
                <Badge variant={f.cad ? "success" : "neutral"}>{f.badge}</Badge>
                <div className="ml-auto flex items-center gap-1">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <X className="size-4" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="transition-colors hover:border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Additional Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Parts delivered in hand?</Label>
            <RadioGroup defaultValue="receiving" className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="receiving" id="in-hand-yes" />
                <Label htmlFor="in-hand-yes" className="font-normal">
                  At receiving
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="not-received" id="in-hand-no" />
                <Label htmlFor="in-hand-no" className="font-normal">
                  Not received
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Business Unit</Label>
            <Select defaultValue="maverick">
              <SelectTrigger className="w-full sm:w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maverick">Maverick Powder Coating</SelectItem>
                <SelectItem value="oc">OC Custom Coating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-colors hover:border-muted-foreground/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Process the RFQ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <Label>AI Model</Label>
              <Select defaultValue="gemini">
                <SelectTrigger className="w-full sm:w-72">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini">Gemini 2.5 Pro</SelectItem>
                  <SelectItem value="opus">Claude Opus 4.8</SelectItem>
                  <SelectItem value="grok">Grok 4.20</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" onClick={onRun}>
              RUN Extraction <ArrowRight className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
