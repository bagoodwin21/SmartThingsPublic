"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Verdict = "yes" | "no" | "partial";

interface Cell {
  verdict?: Verdict;
  note?: string;
}

interface Row {
  criterion: string;
  cells: Cell[]; // order matches PLATFORMS
}

const PLATFORMS = [
  "CYRA Wellness",
  "Midi Health",
  "Alloy",
  "Evernow",
  "Winona",
  "Hers",
];

const ROWS: Row[] = [
  {
    criterion: "Prescribing Provider Type",
    cells: [
      { note: "Board-Certified DO (Physician)" },
      { note: "Nurse Practitioner (primary)" },
      { note: "Physician-designed / NP delivery" },
      { note: "Physician review / NP primary" },
      { note: "Physician" },
      { note: "NP / PA" },
    ],
  },
  {
    criterion: "Testosterone for Women Included",
    cells: [
      { verdict: "yes", note: "Standard part of care" },
      { verdict: "partial", note: "Available, not emphasized" },
      { verdict: "no", note: "Not standard" },
      { verdict: "partial", note: "Limited" },
      { verdict: "partial", note: "Add-on" },
      { verdict: "no" },
    ],
  },
  {
    criterion: "Personalized Protocol vs. Standardized",
    cells: [
      { verdict: "yes", note: "Fully personalized" },
      { verdict: "partial", note: "Protocol-based" },
      { verdict: "partial", note: "Algorithm-assisted" },
      { verdict: "partial", note: "App-driven" },
      { verdict: "partial", note: "Standardized tiers" },
      { verdict: "no", note: "Standardized" },
    ],
  },
  {
    criterion: "Continuity (Same Provider Every Visit)",
    cells: [
      { verdict: "yes", note: "Always Dr. Mondona" },
      { verdict: "no", note: "Rotating providers" },
      { verdict: "partial", note: "Not guaranteed" },
      { verdict: "no", note: "Rotating" },
      { verdict: "partial", note: "Not guaranteed" },
      { verdict: "no", note: "Rotating" },
    ],
  },
  {
    criterion: "Care Plan vs. Subscription Model",
    cells: [
      { verdict: "yes", note: "12-month care plan" },
      { verdict: "no", note: "Monthly subscription" },
      { verdict: "no", note: "Monthly subscription" },
      { verdict: "no", note: "Monthly subscription" },
      { verdict: "no", note: "Monthly subscription" },
      { verdict: "no", note: "Monthly subscription" },
    ],
  },
  {
    criterion: "Financing Available (Cherry / CareCredit)",
    cells: [
      { verdict: "yes", note: "Cherry + CareCredit" },
      { verdict: "no" },
      { verdict: "no" },
      { verdict: "no" },
      { verdict: "no" },
      { verdict: "no" },
    ],
  },
  {
    criterion: "Labs Ordered & Reviewed by Same Provider",
    cells: [
      { verdict: "yes" },
      { verdict: "partial" },
      { verdict: "partial" },
      { verdict: "partial" },
      { verdict: "partial" },
      { verdict: "no" },
    ],
  },
  {
    criterion: "Thyroid & Adrenal in Scope",
    cells: [
      { verdict: "yes" },
      { verdict: "partial" },
      { verdict: "no" },
      { verdict: "no" },
      { verdict: "no" },
      { verdict: "no" },
    ],
  },
  {
    criterion: "Superbill for OON Reimbursement",
    cells: [
      { verdict: "yes" },
      { verdict: "partial" },
      { verdict: "no" },
      { verdict: "no" },
      { verdict: "no" },
      { verdict: "no" },
    ],
  },
  {
    criterion: "California & Arizona Telehealth",
    cells: [
      { verdict: "yes" },
      { verdict: "yes" },
      { verdict: "yes" },
      { verdict: "yes" },
      { verdict: "yes" },
      { verdict: "yes" },
    ],
  },
];

const VERDICT_META: Record<
  Verdict,
  { label: string; className: string; Icon: typeof Check }
> = {
  yes: { label: "Yes", className: "bg-primary/10 text-primary", Icon: Check },
  no: { label: "No", className: "bg-[#C25E5E]/10 text-[#B3574F]", Icon: X },
  partial: {
    label: "Partial",
    className: "bg-amber-500/10 text-amber-600",
    Icon: Minus,
  },
};

function VerdictMark({ verdict }: { verdict: Verdict }) {
  const { label, className, Icon } = VERDICT_META[verdict];
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-full",
        className
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={3} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}

// Solid tint (not translucent) so the sticky CYRA column fully covers
// content scrolling beneath it on mobile.
const CYRA_BG = "bg-[#F1F6F7]";

function CellContent({ cell, isCyra }: { cell: Cell; isCyra: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      {cell.verdict && <VerdictMark verdict={cell.verdict} />}
      {cell.note && (
        <span
          className={cn(
            "text-small leading-snug",
            isCyra ? "font-medium text-primary" : "text-foreground-secondary"
          )}
        >
          {cell.note}
        </span>
      )}
    </div>
  );
}

export function ComparisonTable() {
  return (
    <div>
      <div className="overflow-x-auto rounded-card border border-border bg-surface shadow-card">
        <table className="w-full min-w-[880px] border-collapse">
          <caption className="sr-only">
            Comparison of menopause telehealth platforms by provider type,
            testosterone access, care structure, financing, and scope.
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="sticky left-0 z-20 w-44 min-w-44 bg-surface p-4 text-left text-small font-semibold uppercase tracking-wide text-foreground-muted"
              >
                Criteria
              </th>
              {PLATFORMS.map((platform, i) => {
                const isCyra = i === 0;
                return (
                  <th
                    key={platform}
                    scope="col"
                    className={cn(
                      "p-4 text-center align-bottom",
                      isCyra
                        ? `sticky left-44 z-20 border-l-2 border-l-primary ${CYRA_BG} font-heading text-base font-bold text-primary`
                        : "text-small font-semibold text-foreground"
                    )}
                  >
                    {platform}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, rowIndex) => (
              <motion.tr
                key={row.criterion}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: rowIndex * 0.06 }}
                className="border-b border-border last:border-b-0"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 w-44 min-w-44 bg-surface p-4 text-left text-small font-semibold text-foreground"
                >
                  {row.criterion}
                </th>
                {row.cells.map((cell, i) => {
                  const isCyra = i === 0;
                  return (
                    <td
                      key={`${row.criterion}-${PLATFORMS[i]}`}
                      className={cn(
                        "p-4 align-middle",
                        isCyra &&
                          `sticky left-44 z-10 border-l-2 border-l-primary ${CYRA_BG}`
                      )}
                    >
                      <CellContent cell={cell} isCyra={isCyra} />
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-small text-foreground-muted">
        Table reflects publicly available information as of July 2026. Platform
        offerings change. We encourage you to verify directly with any provider
        before making your decision.
      </p>
    </div>
  );
}
