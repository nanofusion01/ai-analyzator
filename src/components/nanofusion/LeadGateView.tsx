import { useState } from "react";
import { motion } from "framer-motion";
import { LeadData } from "@/lib/types";
import { track } from "@/lib/analytics";
import { Stepper } from "./Stepper";

interface LeadGateViewProps {
  onSubmit: (data: LeadData) => void;
}

export function LeadGateView({ onSubmit }: LeadGateViewProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [gdpr, setGdpr] = useState(false);

  const isValid = name.trim() && phone.trim() && email.trim() && propertyType && gdpr;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    const data: LeadData = { name: name.trim(), phone: phone.trim(), email: email.trim(), propertyType };
    track("lead_submitted", { propertyType });
    onSubmit(data);
  };

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: "var(--light-bg)" }}>
      <Stepper current={3} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 w-full max-w-[480px] mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl font-extrabold text-center text-[var(--dark)]">
          Analýza je hotová
        </h2>
        <p className="mt-2 text-sm text-center text-[var(--muted-text)]">
          Pro zobrazení výsledků nám prosím nechte kontakt.
        </p>

        {/* Blurred teaser */}
        <div className="mt-4 relative rounded-xl p-4" style={{ background: "#f8fafc", border: "1px solid var(--border)" }}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
              </div>
            </div>
            <div className="h-2 w-full rounded bg-slate-200" />
            <div className="h-2 w-3/4 rounded bg-slate-200" />
          </div>
          <div
            className="absolute inset-0 rounded-xl flex items-center justify-center backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.6)" }}
          >
            <span className="text-sm font-semibold text-[var(--dark)]">Výsledky jsou připraveny</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-sm text-[var(--muted-text)] text-center">Zadejte kontakt pro zobrazení výsledků</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--dark)] mb-1.5">
              Jméno a příjmení <span className="text-[var(--orange)]">*</span>
            </label>
            <input
              type="text"
              placeholder="Jan Novák"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--dark)] mb-1.5">
              Telefon <span className="text-[var(--orange)]">*</span>
            </label>
            <input
              type="tel"
              placeholder="+420 774 509 409"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--dark)] mb-1.5">
              E-mail <span className="text-[var(--orange)]">*</span>
            </label>
            <input
              type="email"
              placeholder="jan@email.cz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--dark)] mb-1.5">
              Typ nemovitosti <span className="text-[var(--orange)]">*</span>
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="form-input"
            >
              <option value="">Vyberte...</option>
              <option value="Rodinný dům">Rodinný dům</option>
              <option value="Bytový dům">Bytový dům</option>
              <option value="Komerční objekt">Komerční objekt</option>
              <option value="Jiné">Jiné</option>
            </select>
          </div>

          <div className="flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              id="gdpr"
              checked={gdpr}
              onChange={(e) => setGdpr(e.target.checked)}
              className="mt-1 h-5 w-5 accent-[var(--orange)]"
            />
            <label htmlFor="gdpr" className="text-sm text-[var(--muted-text)] leading-relaxed">
              Souhlasím se zpracováním osobních údajů.{" "}
              <a href="/privacy" className="underline hover:text-[var(--orange)] transition-colors">
                Zásady ochrany
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="btn-primary w-full mt-6"
            style={{ fontSize: 17, padding: "20px 24px" }}
          >
            Zobrazit výsledky analýzy →
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-[var(--muted-text)]">
          Nezasíláme spam. Použijeme kontakt pouze pro konzultaci vašeho povrchu.
        </p>
      </motion.div>
    </div>
  );
}
