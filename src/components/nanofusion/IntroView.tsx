import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SurfaceType } from "@/lib/types";
import { track } from "@/lib/analytics";
import { Stepper } from "./Stepper";
import previewBeforeAfter from "@/assets/preview-before-after.jpg";

interface IntroViewProps {
  previewUrl: string | null;
  surface: SurfaceType | null;
  onFileSelect: (file: File, preview: string) => void;
  onClear: () => void;
  onSurfaceSelect: (s: SurfaceType) => void;
  onAnalyze: () => void;
}

const SURFACES: SurfaceType[] = ["Střecha", "Fasáda", "Okna", "Dlažba", "Jiné"];

export function IntroView({ previewUrl, surface, onFileSelect, onClear, onSurfaceSelect, onAnalyze }: IntroViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("Soubor je příliš velký. Maximum je 10 MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Nepodporovaný formát. Použijte JPG, PNG nebo WEBP.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onFileSelect(file, preview);
      track("photo_uploaded", { surfaceType: surface });
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const isReady = previewUrl && surface;

  return (
    <div>
      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] items-center justify-center px-6 pt-8 pb-6 md:pt-10 md:pb-8 hex-pattern overflow-hidden">
        {/* Subtle ambient glow — single warm light from top-right */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[460px] h-[460px] lg:w-[640px] lg:h-[640px] rounded-full opacity-[0.18] blur-[140px]"
          style={{ background: "var(--orange)" }}
        />
        <div className="relative z-10 w-full mx-auto py-8 lg:py-10" style={{ maxWidth: 1200 }}>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left max-w-[560px] mx-auto lg:mx-0"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <span className="inline-block w-1 h-1 rounded-full bg-[var(--orange)]" />
                Nanofusion · Analyzátor povrchů
              </div>

              <h1 className="text-[42px] sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight">
                <span className="text-white">Zjistíme stav vašeho</span>
                <br />
                <span className="text-[var(--orange)]">povrchu z fotografie</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-[520px] mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.7)" }}>
                Pošlete nám snímek střechy, fasády nebo dlažby. Vyhodnotíme míru
                znečištění a doporučíme, jaké ošetření je pro váš povrch vhodné.
              </p>

              <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                {["Vyhodnocení do minuty", "Doporučení ošetření", "Nezávazně a zdarma"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-[var(--orange)]" />
                    {t}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToUpload}
                className="btn-primary mt-6 w-full sm:w-auto"
                style={{
                  fontSize: 17,
                  padding: "20px 36px",
                  boxShadow: "0 10px 28px -12px rgba(245,166,35,0.45)",
                }}
              >
                Nahrát fotografii povrchu
              </button>

              <div className="mt-6 flex items-center gap-6 justify-center lg:justify-start text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">2 847</span>
                  <span>analýz</span>
                </div>
                <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">98 %</span>
                  <span>přesnost</span>
                </div>
              </div>
            </motion.div>

            {/* Right column — visual proof / preview card (desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:block relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)",
                }}
              >
                <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--orange)]" />
                      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70">Ukázka výstupu</span>
                    </div>
                    <span className="text-[11px] text-white/40">před / po</span>
                  </div>
                </div>
                {/* Before / After photo */}
                <div className="relative">
                  <img
                    src={previewBeforeAfter}
                    alt="Před a po ošetření fasády Nanofusion"
                    width={1280}
                    height={768}
                    className="block w-full h-[220px] object-cover"
                    loading="lazy"
                  />
                  {/* Center divider */}
                  <div
                    className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
                    style={{ background: "rgba(245,166,35,0.9)", boxShadow: "0 0 12px rgba(245,166,35,0.6)" }}
                  />
                  <div
                    className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: "rgba(0,0,0,0.55)" }}
                  >
                    Dnes
                  </div>
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: "rgba(245,166,35,0.9)" }}
                  >
                    Po Nanofusion
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-5">
                    <div className="relative" style={{ width: 88, height: 88 }}>
                      <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
                        <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="44" cy="44" r="38" fill="none" stroke="var(--orange)" strokeWidth="8" strokeLinecap="round" strokeDasharray={2 * Math.PI * 38} strokeDashoffset={2 * Math.PI * 38 * (1 - 0.62)} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-extrabold text-white">6.2</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg font-bold text-white">Střední znečištění</div>
                      <div className="text-sm text-white/50">Fasáda · 120 m²</div>
                      <div className="mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(245,166,35,0.18)", color: "var(--orange)" }}>
                        Do 3 měsíců
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { label: "Mechy a řasy", value: 48 },
                      { label: "Prach a saze", value: 32 },
                      { label: "Organické skvrny", value: 20 },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-white/70">{row.label}</span>
                          <span className="text-white font-semibold">{row.value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <div className="h-full rounded-full" style={{ width: `${row.value}%`, background: "var(--orange)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="pointer-events-none absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-30 blur-3xl" style={{ background: "var(--orange)" }} />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-14 flex justify-center lg:hidden"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-6 h-6" style={{ color: "rgba(255,255,255,0.35)" }} />
          </motion.div>
        </div>
      </section>

      {/* UPLOAD SECTION */}
      <section ref={uploadRef} id="upload" className="py-16 lg:py-24 px-4" style={{ background: "var(--light-bg)" }}>
        <div className="max-w-[720px] mx-auto">
          <Stepper current={1} />
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Nahrajte fotografii povrchu</h2>
            <p className="mt-1 text-sm text-[var(--muted-text)]">Střecha, fasáda, dlažba nebo okna.</p>
          </div>

          <div className="mt-6">
            {!previewUrl && (
              <div className="block md:hidden">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary w-full"
                  style={{ fontSize: 17, padding: "20px 24px" }}
                >
                  Vyfotit nebo vybrat z galerie
                </button>
                <p className="mt-3 text-center text-xs text-[var(--muted-text)]">nebo přetáhněte soubor sem</p>
              </div>
            )}

            {!previewUrl && (
              <div
                className="hidden md:block"
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
              >
              <div
                className="rounded-xl border-2 border-dashed p-8 text-center transition-colors hover:border-[var(--orange)]/60"
                style={{ borderColor: "rgba(245,166,35,0.4)" }}
              >
                <div className="flex flex-col items-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <p className="mt-3 text-base font-semibold text-[var(--dark)]">Přetáhněte fotografii sem</p>
                  <p className="mt-1 text-sm text-[var(--muted-text)]">nebo</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 inline-flex items-center justify-center rounded-lg border border-[var(--orange)] text-[var(--orange)] px-4 py-2 text-sm font-semibold hover:bg-[var(--orange)]/5 transition-colors"
                  >
                    Vybrat soubor
                  </button>
                  <p className="mt-3 text-xs text-[var(--muted-text)]">JPG, PNG, WEBP • Max 10 MB</p>
                </div>
              </div>
              </div>
            )}

            {previewUrl ? (
              <div className="relative mt-4">
                <img
                  src={previewUrl}
                  alt="Náhled"
                  className="w-full object-cover rounded-lg"
                  style={{ maxHeight: 280 }}
                />
                <button
                  onClick={onClear}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-[var(--dark)] hover:bg-gray-100"
                  aria-label="Odstranit fotografii"
                >
                  ×
                </button>
                <button
                  onClick={onClear}
                  className="mt-3 text-sm text-[var(--muted-text)] hover:text-[var(--orange)] underline underline-offset-2"
                >
                  Nahrát jinou fotografii
                </button>
              </div>
            ) : null}
          </div>

          {previewUrl ? (
            <div className="mt-5">
              <label className="text-sm font-semibold text-[var(--dark)] mb-2 block">Typ povrchu</label>
              <div className="flex flex-wrap gap-2">
                {SURFACES.map((s) => (
                  <button
                    key={s}
                    onClick={() => onSurfaceSelect(s)}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                      surface === s
                        ? "bg-[var(--orange)] text-white border-transparent"
                        : "bg-white text-[var(--dark)] border-[var(--border)] hover:border-[var(--orange)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {previewUrl ? (
            <button
              onClick={onAnalyze}
              disabled={!isReady}
              className="btn-primary w-full mt-6"
              style={{ fontSize: 17, padding: "20px 24px" }}
            >
              Spustit analýzu →
            </button>
          ) : null}
        </div>
      </section>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
}
