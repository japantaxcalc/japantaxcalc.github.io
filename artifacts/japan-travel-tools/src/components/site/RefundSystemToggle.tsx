import type { RefundSystem } from "@/lib/calculators";

const OPTIONS: { value: RefundSystem; label: string; hint: string }[] = [
  { value: "old", label: "10/31 以前（舊制）", hint: "舊制：大多在店裡結帳時直接免稅。" },
  { value: "new", label: "11/1 以後（新制）", hint: "新制：結帳先付含稅價，出境時海關確認後才退稅。" },
];

interface RefundSystemToggleProps {
  value: RefundSystem;
  onChange: (value: RefundSystem) => void;
}

export default function RefundSystemToggle({ value, onChange }: RefundSystemToggleProps) {
  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0]!;
  return (
    <div>
      <p className="text-sm font-medium text-[var(--jp-ink)]">購買日期</p>
      <div
        role="radiogroup"
        aria-label="購買日期"
        className="mt-1.5 grid grid-cols-2 gap-1 rounded-full border border-[var(--jp-border)] bg-[var(--jp-paper)] p-1"
      >
        {OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              value === o.value
                ? "bg-[var(--jp-ink)] text-[var(--jp-paper)]"
                : "text-[var(--jp-ink-muted)] hover:text-[var(--jp-ink)]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="mt-1 text-xs text-[var(--jp-ink-faint)]">{current.hint}</p>
    </div>
  );
}
