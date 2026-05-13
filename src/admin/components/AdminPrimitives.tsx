import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  New: "border-blue-200 bg-blue-50 text-blue-700",
  Contacted: "border-slate-200 bg-slate-50 text-slate-700",
  Hot: "border-red-200 bg-red-50 text-red-700",
  Closed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-zinc-200 bg-zinc-100 text-zinc-600",
  Live: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Draft: "border-amber-200 bg-amber-50 text-amber-800",
  Review: "border-blue-200 bg-blue-50 text-blue-700",
  Unread: "border-red-200 bg-red-50 text-red-700",
  Replied: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Needs follow-up": "border-amber-200 bg-amber-50 text-amber-800",
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Invited: "border-blue-200 bg-blue-50 text-blue-700",
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <Badge variant="outline" className={cn("rounded-md font-bold", statusStyles[value])}>
      {value}
    </Badge>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("border border-slate-200 bg-white shadow-soft", className)}>
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-black text-slate-950">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
          ) : null}
        </div>
        {action ? (
          <Button variant="outline" size="sm" className="w-fit rounded-md">
            {action}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tone?: string;
}) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    navy: "bg-slate-100 text-slate-800 border-slate-200",
  };

  return (
    <article className="border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <span className={cn("grid h-11 w-11 place-items-center rounded-md border", tones[tone])}>
          <Icon className="h-5 w-5" />
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md text-slate-400"
          aria-label={`Open ${label} metric actions`}
          onClick={() => toast.info(`${label} metric details are ready for API drill-down`)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <p className="text-3xl font-black tracking-tight text-slate-950">{value}</p>
        <p className="text-xs font-bold text-emerald-700">{change}</p>
      </div>
    </article>
  );
}

export function EmptyPreview({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
      <p className="font-black text-slate-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">{text}</p>
    </div>
  );
}
