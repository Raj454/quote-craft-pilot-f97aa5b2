import type { ReactNode } from "react";
import { AlertTriangle, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  value,
  helper,
  warn,
  children,
  editable = true,
}: {
  label: string;
  value?: ReactNode;
  helper?: string;
  warn?: boolean;
  children?: ReactNode;
  editable?: boolean;
}) {
  return (
    <div className="group rounded-md px-2 py-2 -mx-2 transition-colors hover:bg-surface">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-0.5 flex items-center gap-2">
        <div
          className={cn(
            "text-base",
            warn ? "font-medium text-warning" : "text-foreground",
            !value && !children && "text-muted-foreground italic",
          )}
        >
          {children ?? value ?? "—"}
        </div>
        {warn ? <AlertTriangle className="size-4 text-warning" /> : null}
        {editable ? (
          <Pencil className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        ) : null}
      </div>
      {helper ? <div className="mt-0.5 text-sm text-muted-foreground">{helper}</div> : null}
    </div>
  );
}

export function KV({
  label,
  value,
  warn,
  bold,
}: {
  label: string;
  value: ReactNode;
  warn?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right text-base",
          bold && "font-semibold",
          warn && "font-medium text-warning",
        )}
      >
        {value}
        {warn ? <AlertTriangle className="ml-1 inline size-4 align-[-2px]" /> : null}
      </span>
    </div>
  );
}

export function SubSection({
  title,
  children,
  tone = "plain",
  right,
}: {
  title: string;
  children: ReactNode;
  tone?: "plain" | "muted" | "warning" | "strong";
  right?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border p-4 sm:p-5",
        tone === "plain" && "border-border bg-background",
        tone === "muted" && "border-border bg-surface",
        tone === "warning" && "border-warning/25 bg-surface-warning",
        tone === "strong" && "border-border bg-surface",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-base font-semibold">{title}</h4>
        {right}
      </div>
      {children}
    </section>
  );
}

export function Money({ children }: { children: ReactNode }) {
  return <span className="tabular-nums">{children}</span>;
}
