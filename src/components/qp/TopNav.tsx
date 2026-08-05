import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RefreshCw } from "lucide-react";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            QP
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold">QuotePilot</div>
            <div className="text-sm text-muted-foreground">RFQ Automation</div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <Avatar className="size-8">
              <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">
                TK
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Ted Kunewa</span>
          </div>
          <Button variant="ghost" size="sm">
            Save Draft
          </Button>
          <Button size="sm">
            <RefreshCw className="size-4" /> Sync to Odoo
          </Button>
        </div>
      </div>
    </header>
  );
}
