import { Check } from "lucide-react";

interface StepperProps {
  current: 1 | 2 | 3;
  variant?: "light" | "dark";
}

const STEPS = [
  { n: 1, label: "Fotografie" },
  { n: 2, label: "Analýza" },
  { n: 3, label: "Výsledek" },
] as const;

export function Stepper({ current, variant = "light" }: StepperProps) {
  const isDark = variant === "dark";
  const mutedText = isDark ? "rgba(255,255,255,0.55)" : "var(--muted-text)";
  const activeText = isDark ? "#fff" : "var(--dark)";
  const lineBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)";

  return (
    <div className="w-full max-w-[560px] mx-auto">
      <div className="flex items-center justify-between">
        {STEPS.map((s, i) => {
          const done = s.n < current;
          const active = s.n === current;
          return (
            <div key={s.n} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors shrink-0"
                  style={{
                    background: done || active ? "var(--orange)" : "transparent",
                    border: done || active ? "none" : `1.5px solid ${lineBg}`,
                    color: done || active ? "#fff" : mutedText,
                  }}
                >
                  {done ? <Check className="w-4 h-4" /> : s.n}
                </div>
                <span
                  className="text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap"
                  style={{ color: active ? activeText : mutedText }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 ? (
                <div className="flex-1 h-px mx-2 sm:mx-3 -mt-5" style={{ background: lineBg }} />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
