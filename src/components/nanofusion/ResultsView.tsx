import { useState } from "react";
import { motion } from "framer-motion";
import { AnalysisResult, SurfaceType } from "@/lib/types";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { track } from "@/lib/analytics";
import { Stepper } from "./Stepper";
import { supabase } from "@/integrations/supabase/client";

interface ResultsViewProps {
  imageUrl: string;
  afterImageUrl?: string;
  surface: SurfaceType;
  analysis: AnalysisResult;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  leadId: string | null;
  onRestart: () => void;
}

function ScoreDonut({ score }: { score: number }) {
  const r = 45;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 10) * c;

  const color = score >= 8 ? "#22C55E" : score >= 5 ? "#F5A623" : "#EF4444";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 100, height: 100 }}>
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#f1f5f9" strokeWidth={10} />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[32px] font-extrabold text-[var(--dark)]">{score}</span>
        <span className="text-sm text-[var(--muted-text)]">/10</span>
      </div>
    </div>
  );
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  const styles =
    urgency === "Doporučit ihned"
      ? { bg: "#fee2e2", text: "#b91c1c" }
      : urgency === "Do 3 měsíců"
      ? { bg: "#ffedd5", text: "#c2410c" }
      : { bg: "#dcfce7", text: "#15803d" };

  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-xs font-bold"
      style={{ background: styles.bg, color: styles.text }}
    >
      {urgency}
    </span>
  );
}

export function ResultsView({
  imageUrl,
  afterImageUrl,
  surface,
  analysis,
  leadName,
  leadPhone,
  leadEmail,
  leadId,
  onRestart,
}: ResultsViewProps) {
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !timeline) return;

    track("quote_submitted");

    const quoteNotes = `Poptávka odeslána:
Popis povrchu: ${description.trim()}
Preferovaný termín: ${timeline}`;

    if (leadId) {
      // 1. If we have a lead ID, update the existing record to avoid duplication
      const { error } = await supabase
        .from("leads")
        .update({
          additional_notes: quoteNotes,
        })
        .eq("id", leadId);

      if (error) console.error("[Leads Database] Quote update failed:", error);
    } else {
      // 2. Fallback: if no leadId, insert a new record matching their columns
      const urgencyMapping: Record<string, string> = {
        "Doporučit ihned": "vysoká",
        "Do 3 měsíců": "střední",
        "Preventivní ošetření": "nízká",
      };
      const mappedUrgency = urgencyMapping[analysis.urgency] || "střední";

      const { error } = await supabase.from("leads").insert({
        name: leadName,
        phone: leadPhone || null,
        email: leadEmail,
        analysis_type: surface,
        urgency: mappedUrgency,
        original_photo_url: imageUrl,
        additional_notes: quoteNotes,
        status: "new",
      });
      if (error) console.error("[Leads Database] Quote fallback insert failed:", error);
    }

    setQuoteSubmitted(true);
  };

  return (
    <div className="pb-24 px-4 lg:px-8 pt-8" style={{ background: "var(--light-bg)" }}>
      <Stepper current={3} />
      <div className="max-w-[560px] lg:max-w-[1100px] mx-auto">
        {/* 8a. SUCCESS HEADER */}
        <div className="mt-6 bg-white rounded-2xl p-6 text-center lg:text-left">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--orange)]">Výsledek analýzy</div>
          <h3 className="mt-2 text-xl lg:text-2xl font-bold text-[var(--dark)]">Povrch: {surface}</h3>

          {analysis.isMock ? (
            <div
              className="mt-3 rounded-xl p-3 text-sm"
              style={{
                background: "rgba(245,166,35,0.1)",
                border: "1px solid rgba(245,166,35,0.3)",
                color: "var(--orange)",
              }}
            >
              Ukázkový režim — backend není zatím připojen, hodnoty jsou ilustrativní.
            </div>
          ) : null}
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:mt-4">
        {/* LEFT COLUMN */}
        <div className="space-y-4 mt-4 lg:mt-0">
        {/* 8b. SCORE CARD */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-5">
            <ScoreDonut score={analysis.score} />
            <div className="flex-1">
              <div className="text-xl font-bold text-[var(--dark)]">{analysis.label}</div>
              <div className="text-sm text-[var(--muted-text)]">Celkové hodnocení povrchu</div>
              <div className="mt-2">
                <UrgencyBadge urgency={analysis.urgency} />
              </div>
            </div>
          </div>
        </div>

        {/* 8c. BEFORE/AFTER SLIDER */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="p-4 pb-2">
            <h4 className="text-base font-bold text-[var(--dark)]">Vizualizace výsledku</h4>
          </div>
          <BeforeAfterSlider imageUrl={imageUrl} afterImageUrl={afterImageUrl} />
          <p className="p-3 text-center text-xs text-[var(--muted-text)] italic">
            * Vizualizace je ilustrativní. Výsledek závisí na typu a rozsahu znečištění.
          </p>
        </div>

        {/* 8d. CONTAMINATION BREAKDOWN */}
        <div className="bg-white rounded-2xl p-6">
          <h4 className="text-base font-bold text-[var(--dark)] mb-4">Složení znečištění</h4>
          <div className="space-y-3">
            {analysis.breakdown.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-[var(--dark)]">{item.label}</span>
                  <span className="font-bold text-[var(--dark)]">{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 1.5 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
        {/* RIGHT COLUMN */}
        <div className="space-y-4 mt-4 lg:mt-0">
        {/* 8e. RECOMMENDATIONS */}
        <div className="bg-white rounded-2xl p-6">
          <h4 className="text-base font-bold text-[var(--dark)] mb-4">Doporučení</h4>
          <div className="space-y-3">
            {analysis.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div
                  className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--orange)" }}
                />
                <p className="text-sm text-[var(--dark)] leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 8f. IMPROVEMENT STAT */}
        <div className="bg-white rounded-2xl p-6 text-center">
          <p className="text-sm text-[var(--muted-text)] mb-2">Odhadované zlepšení po ošetření</p>
          <div className="text-5xl font-extrabold text-[var(--orange)]">{analysis.improvementPercent}%</div>
          <p className="text-sm text-[var(--muted-text)] mt-1">vizuální zlepšení povrchu</p>
        </div>

        {/* 8g. POPTÁVKA FORM */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(245,166,35,0.06)",
            border: "1px solid rgba(245,166,35,0.2)",
          }}
        >
          {!quoteSubmitted ? (
            <>
              <h3 className="text-xl font-extrabold text-[var(--dark)]">Chcete takový výsledek?</h3>
              <p className="text-sm text-[var(--muted-text)] mt-1 mb-5">
                Pošleme vám nezávaznou nabídku přímo na váš povrch.
              </p>
              <form onSubmit={handleQuoteSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-[var(--dark)] mb-1.5">Popis povrchu / adresa</label>
                  <textarea
                    rows={3}
                    placeholder="Např. střecha rodinného domu, cca 120 m², Praha 6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--dark)] mb-1.5">Preferovaný termín</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="form-input"
                  >
                    <option value="">Vyberte...</option>
                    <option value="Co nejdříve">Co nejdříve</option>
                    <option value="Do 1 měsíce">Do 1 měsíce</option>
                    <option value="Do 3 měsíců">Do 3 měsíců</option>
                    <option value="Jen zjišťuji cenu">Jen zjišťuji cenu</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={!description.trim() || !timeline}
                  className="btn-primary w-full mt-4"
                  style={{ padding: "20px 24px" }}
                >
                  Odeslat poptávku →
                </button>
              </form>
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold text-green-800">
                Poptávka odeslána. Ozveme se vám do 24 hodin.
              </p>
            </div>
          )}
        </div>
        </div>
        </div>

        {/* 8h. FOOTER ACTIONS */}
        <div className="mt-6 pb-10 text-center">
          <button
            onClick={() => {
              track("cta_restart");
              onRestart();
            }}
            className="btn-secondary inline-block px-6 py-3"
          >
            Analyzovat další povrch
          </button>

          <div className="mt-4">
            <a
              href="https://nanofusion.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--muted-text)] hover:text-[var(--orange)] transition-colors no-underline"
            >
              ← Zpět na nanofusion.cz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
