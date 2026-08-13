# QuotePilot Automation

Build a Next.js + Tailwind + shadcn/ui mockup for an internal web application called "QuotePilot" — used by estimators at OC Custom Coating (a defense-industry powder coating company) to convert customer RFQ emails into structured, priced quotes and cross-check against Odoo before export.

CRITICAL: Use a SINGLE-COLUMN layout throughout. No side-by-side panels within sections. The entire content area is one column that stretches to a comfortable max-width (max-w-5xl or similar) and centers on the page. Estimators will scroll through the content top-to-bottom.

The workflow has 3 sequential sections shown as a horizontal stepper at the top: "1. Input Form", "2. Extraction Results", "3. Odoo Cross-Check". Each section has a completion state (green checkmark when done, current-active in green, pending in gray). Make the stepper clickable so users can jump between sections.

===

DESIGN SYSTEM:

- Primary color: industrial green (#2D5F3F)
- Warning/attention: warm amber (#B45309)
- Success: emerald (#10B981)
- Error/danger: red (#DC2626)
- Neutrals: white background, light gray borders (#E5E7EB), dark text (#111827)
- Body font: Inter or system UI
- Typography scale:
  - Page title (section header): text-3xl font-bold
  - Card title: text-xl font-semibold
  - Sub-section title: text-base font-semibold
  - Body: text-base
  - Helper/small: text-sm text-gray-500
- Cards: white background, rounded-lg, shadow-sm, border border-gray-200, p-6
- Consistent 24px (space-y-6) between cards
- shadcn/ui components throughout: Card, Tabs, Table, Badge, Button, Input, Textarea, Select, Alert, Separator, Tooltip

TOP NAV (fixed):
- Left: small circle logo in industrial green with "QP" text + product name "QuotePilot" + small tagline "RFQ Automation"
- Right: user avatar with name "Ted Kunewa", Save Draft ghost button, "Sync to Odoo" primary button

STEPPER (below top nav, sticky):
Full-width bar with 3 numbered circles connected by lines:
1. Input Form (completed — green checkmark)
2. Extraction Results (currently active — green background, white number)
3. Odoo Cross-Check (pending — gray)
Each step is clickable.

RFQ HEADER (below stepper, above main content):
Small header showing:
- Left: large RFQ ID "QP26-001" in bold, with badge "Extraction Complete"
- Right: metadata pills — "BU: Maverick Powder Coating" | "Received: July 5, 2026" | "Customer: ABC Metal Works"

Now build the 3 sections. Show Section 2 (Extraction Results) as the currently visible/active screen with all details filled in.

===

SECTION 1: INPUT FORM

Section title: "Input Form"
Section subtitle: "Enter customer email content and upload drawings to begin extraction."

CARD 1 — "Request / Email Details"
- Large textarea (min-height 250px) with label "Paste the customer's RFQ email content"
- Prefilled placeholder text:
  "Hi,
  Could we please get pricing for the attached items? The qty will be 6 each.
  Thanks,
  John
  ABC Company
  714-555-1212"
- Small "Clear" ghost button in bottom-right corner of card

CARD 2 — "Upload Drawings"
- Drag-and-drop zone with dashed border and upload icon
- Label: "Upload or drop drawing files. Limit 200 MB per file. Supported: PDF, STP, STEP"
- Show 3 uploaded files as stacked cards (not side-by-side):
  - Row 1: 📄 Filename1.pdf | 5,426 KB | badge "PDF" | [View] [× Remove]
  - Row 2: 🔧 Filename2.stp | 6,426 KB | badge "CAD — accurate surface area" (green) | [View] [× Remove]
  - Row 3: 🔧 Filename3.step | 7,426 KB | badge "CAD — accurate surface area" (green) | [View] [× Remove]

CARD 3 — "Additional Info"
- Radio group: "Parts delivered in hand?" — options: "At receiving" | "Not received"
- Dropdown: "Business Unit" with "Maverick Powder Coating" selected

CARD 4 — "Process the RFQ"
Single-row layout:
- Left: Dropdown "AI Model" with options: Gemini 2.5 Pro (selected), Claude Opus 4.8, Grok 4.20
- Right: Large primary button "RUN Extraction →"

===

SECTION 2: EXTRACTION RESULTS (this is the main focus — build in most detail)

Section title: "Extraction Results"
Section subtitle: "Review each part's coating specs and pricing before Odoo cross-check."

Metadata line: small text "Extracted with Gemini 2.5 Pro · 47 fields · 3 flagged for review"

Alert banner at top:
- Green/success: "AI extraction complete. Review each part below."
- Include a "View Extraction Log" link on the right

CARD 1 — "Customer Information" (collapsible, expanded by default)
Single column of fields (each label on its own line, value below, with inline edit-pencil icon on hover):
- Odoo Q#: (empty — helper "If applicable")
- Company: ABC Metal Works
- Contact: John Smith
- Email: John@abcmetalworks.com
- Phone: 714-555-1212
- Address: 123 Main St, Los Angeles, CA 90024
- Email/Req Date: July 5, 2026
- Request DD (Due Date): Unknown ⚠️ (amber warning)
- Request Summary: "Request for quote to apply CARC powder coating to two riveted assemblies per drawings 117-0018-001 and 117-0019-001."

CARD 2 — "Part Summary"
Above-the-fold summary table showing all parts at a glance:
- Table with columns: # | Part # | Qty | Name/Description | Price/unit | Total
- Row 1: 1 | Pa4-354/35 | 10 | Rivet Panel Holder | $300 / 250 sqin | $3,000
- Row 2: 2 | DSC4577524 | 25 | Wheel Bearing Insert | $55 / 10 sqin | $1,375
- Row 3: 3 | ABCsdf456456 | 3 | Lamp Shade Panel With Multi-Colors | $2,000 / 1,562 sqin | $6,000
- Bottom row (bold): "Total Quote: $10,375" — right-aligned, larger text

CARD 3 — "Part Details" — this is the biggest card and contains one sub-card per part.
Show Part 1 (Pa4-354/35) fully expanded. Show Parts 2 and 3 as collapsed rows with expand chevron and part name/number visible.

PART 1 SUB-CARD (fully expanded, single column, all content stacked vertically):

Header row of the sub-card:
- Left: "Pa4-354/35 → Rivet Panel Holder" (bold, larger)
- Right: [✏️ Edit] [🗑 Delete] buttons

Sub-section: "Specifications" (with light background to visually group)
Fields in a single column:
- Price per unit: $300 (small text: "Computed price: $300")
- Quantity: 10
- Total Line Item: $3,000
- Drawing file: Filename1.pdf [View]
- Revision: C00
- Is Assembly: Yes
- (E) Coating?: Unknown ⚠️
- Material: Steel
- Part Mark: Yes
- Prep type: Media blasting
- Scale?: No ⚠️
- Total surface (Sq In): 595 (helper text: "All sides, 2 sided, edges")
- Coating Area (Sq In): 250 with RED badge "LOW confidence"
- Masking Area (Sq In): 345 with AMBER badge "MEDIUM confidence"

Sub-section: "Coating Details (Coating BOM)"
Small helper note above: "Items marked None/Not listed will NOT be exported to Odoo."
Two-column key-value list (this is fine — it's within a single card, not two side-by-side cards):
- Masking: None ⚠️
- Media Blasting: Not listed ⚠️
- Primer: MIL-PRF-32348, TYPE 1
- Prep: Prep and apply per MIL-DTL-53072
- Topcoat: MIL-PRF-32348, TYPE 3 (CARC Powder Coat)
- Color: FED-STD-595 34094 GREEN 383 CAMO
- Coverage: All surfaces
- Sequencing: Apply primer and topcoat to all surfaces after rivet installation
- Part Mark: Ink stamp part number, revision, mfg date

Sub-section: "Extraction Notes & Warnings" (amber-tinted background to signal caution)
Bullet list:
- ⚠️ No dimensions on the drawing → low-confidence surface area estimation
- Method: Visual Estimation from 3D Model Views
- Dimensions found: No dimensional values present. Tolerances specified (e.g., X.X ± 0.5 mm), but no nominal dimensions.
- Reasoning: Visual approximation from isometric views.
- Notes for estimator: Request the 3D model referenced in Note 2 for accurate surface area.

Sub-section: "Pricing Breakdown" — the crown jewel, make this visually distinct
Use a subtle darker gray-50 background for the entire sub-section to emphasize it.

Header row (bold):
"Pricing: $300.24/unit × 10 = $3,004.36 total"

Config row:
Label "Complexity (1-5)": dropdown [3 (Moderate)] with helper "Adjusts labor (+/- X%)"

Now stack the breakdown groups vertically (single column). Each group is a light card within the pricing sub-section:

Group A — "Masking":
- Area: 345 Sq In
- Holes: 24 Openings
- Time: 30 min @ $35.56/hr
- Cost: $35.24

Group B — "Media Blasting":
- Area: 250 Sq In
- Time: 8 min @ $35.56/hr
- Cost: $10.38

Group C — "Coating":
- Area: 250 Sq In
- Time: 20 min @ $45.56/hr
- Material: 1.3 Oz @ $11.22/oz
- Color Complexity: Normal (Color: FED-STD-595 34094 GREEN 383 CAMO)
- Oven Time: 35 min @ $20.38/hr
- Cost: $85.27

Group D — "Part Mark & Extras":
- Part Mark: + $1.00 (Typical: $1/mark)
- Extra work: + $0.00
- Extra resource: + $0.00

Subtotal row (Separator, then bold summary):
- Total Part Cost: $243.24 per unit
- Total Labor: $198.15 | Total Material: $68.15 | Total Time: 01:32 min

Group E — "Adjustments":
- Rush order: + $2.24 (or + 1.5% of cost)
- Setup/Extra work: + $3.20 (or + 2.3% of cost)
- Shipping: + $0.00 (or + 0%)
- Discount: -$0.00 (or - 0%)
- Overhead & Profit: + $57.00 (or + 18% of cost) — small link [Adjust for neg. rate] [Details]

Final total row (larger text, industrial green background box):
- Price per Unit: $300.24 — helper "$0.28 / PSI (ABC Metal Works Inc. Neg Rate: $0.28)"
- Total Line Item: $3,004.36 (10 Qty)

Sub-section: "Estimator Notes"
Textarea prefilled: "This part has issues with packing. The shipping material is expensive. So add more work $."

END OF PART 1 SUB-CARD.

Below Part 1, show two COLLAPSED rows for Parts 2 and 3:
- Row with chevron icon, part number, name, and total price — click to expand
- Part 2: DSC4577524 → Wheel Bearing Insert — Total: $1,375
- Part 3: ABCsdf456456 → Lamp Shade Panel With Multi-Colors — Total: $6,000

Bottom of Section 2:
Full-width action row:
- Left: [← Back to Input] ghost button
- Right: [Continue to Odoo Cross-Check →] primary button

===

SECTION 3: ODOO CROSS-CHECK

Section title: "Odoo Cross-Check"
Section subtitle: "Cross-check with existing Odoo database before exporting the quote."

Top row (single column):
- Left: [🔄 Run Cross-Check] button
- Right: badge "BU: Maverick Powder Coating"

CARD 1 — "Client Info Cross-Check"

Use shadcn Tabs component with two tabs:
- Tab 1 (default active): "Scenario 1: Partial Match"
- Tab 2: "Scenario 2: No Match Found"

TAB 1 CONTENT:
Amber alert: "Customer partially matches an existing Odoo record. Review discrepancies below."

Single-column list of field comparisons. Each row shows label, extracted value, and a status badge:
- Email: john@email.com — GREEN badge "Existing"
- Company: ABC Metal Works - S9 — GREEN badge "Existing"
- Contact: James Smith — GREEN badge "Existing"
- Phone: 714-555-1212 — AMBER badge "Not found ⚠️"
- Address: 123 Main St, Los Angeles, CA 90024 — AMBER badge "Not found ⚠️"

Action row at bottom of tab:
- [Update Odoo Contact Info] primary button
- [Export without updating] ghost button

TAB 2 CONTENT:
Amber alert: "No matching customer found in Odoo. Please review before creating new."

Single-column list:
- Email: john@email.com — AMBER badge "Not found ⚠️"
- Company: ABC Metal Works Inc — AMBER badge "Not found ⚠️"
  Below in helper text: "Possible matches in Odoo: ABC Metal Works | ABC Metal Works - S9" (with a small "Choose match" link)
- Contact: John Smith — AMBER badge "Not found ⚠️"
- Phone: 714-555-1212 — AMBER badge "Not found ⚠️"
- Address: Not listed — AMBER badge "Not to be exported ⚠️"

Action row:
- [+ Add New Contact] primary button
- [Re-Run Cross-Check] ghost button

CARD 2 — "Part Management"

Full-width table with columns:
# | Part # | Existing in Odoo? | Revision | Name/Description | Price/unit

Rows:
1. Pa4-354/35 | GREEN badge "YES" | Current: C00 (small text below: "Previous: B12") | Rivet Panel Holder | $300.24 (Current) / $256.27 (Previous — small text)
2. DSC4577524 | AMBER badge "NO — Add New" | Current: A00 | Wheel Bearing Insert | $25.24 (Current)
3. ABCsdf456456 | GREEN badge "YES" | Current: D10 (small: "Previous: B32") | Lamp Shade Panel With Multi-Colors | $120.24 (Current) / $200.27 (Previous)

Below the table, info alert:
"ℹ️ If Company and Email are 'Existing', this application can export to Odoo. Otherwise the Export button is disabled."

CARD 3 — "Ready to Export"
Center-aligned:
- Large green primary button: "Export to Odoo Quotation →"
- Below: ghost button "Save as Draft (Don't Export)"

Bottom of Section 3:
- Left: [← Back to Extraction Results] ghost button

===

RESPONSIVE + POLISH REQUIREMENTS:

- On tablet/mobile (< 768px): sections adjust naturally since we're single-column throughout
- The stepper at top collapses to horizontal scrolling on mobile
- All money values use $ prefix and 2 decimals
- All area values suffixed with "Sq In"
- All time values use "min" or "min @ $rate/hr" format
- Confidence badges use consistent color scheme: red=Low, amber=Medium, green=High
- Warning ⚠️ icon used consistently for items needing attention
- Every editable field has hover state suggesting edit-in-place capability
- Cards have subtle hover state (slightly darker border)
- Use lucide-react icons throughout: Upload, FileText, Edit, Trash2, ChevronDown, AlertTriangle, CheckCircle, ExternalLink, RefreshCw
- Include realistic loading states and empty states (but not critical for this mockup)

Do NOT wire up backend logic. This is a static mockup for design review only. All data is hardcoded to values specified above.

Ensure the mockup deploys to Vercel cleanly. Focus on making Section 2 (Extraction Results) fully polished since it's the currently-visible/active screen. Sections 1 and 3 should be complete but Section 2 is the money shot.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://quote-craft-pilot.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/86113911-712a-47ab-836d-e1b00676ed5f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
