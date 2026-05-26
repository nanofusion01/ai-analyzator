import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stepper } from "./Stepper";
import { NANO_TIPS } from "@/lib/nano-tips";

interface LoadingViewProps {
  onComplete: () => void;
  apiDone: boolean;
  isActive: boolean;
}

const STATUS_MESSAGES = [
  "Nahrávám fotografii...",
  "Analyzuji typ povrchu...",
  "Detekuji znečištění...",
  "Vyhodnocuji míru poškození...",
  "Připravuji doporučení...",
];

export function LoadingView({ onComplete, apiDone, isActive }: LoadingViewProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statusRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tipRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasCompleted = useRef(false);
  const prevActive = useRef(false);

  // Reset and start animation when becoming active
  useEffect(() => {
    if (isActive && !prevActive.current) {
      prevActive.current = true;
      setProgress(0);
      setStatusIndex(0);
      setTipIndex(Math.floor(Math.random() * NANO_TIPS.length));
      hasCompleted.current = false;

      const totalDuration = 8001;
      const intervalMs = 40;
      const increment = 100 / (totalDuration / intervalMs);

      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 90;
          }
          return Math.min(prev + increment, 90);
        });
      }, intervalMs);

      statusRef.current = setInterval(() => {
        setStatusIndex((prev) => {
          if (apiDone) return prev;
          return (prev + 1) % STATUS_MESSAGES.length;
        });
      }, 2000);

      tipRef.current = setInterval(() => {
        setTipIndex((prev) => (prev + 1) % NANO_TIPS.length);
      }, 4500);
    }

    if (!isActive) {
      prevActive.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (statusRef.current) clearInterval(statusRef.current);
      if (tipRef.current) clearInterval(tipRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (statusRef.current) clearInterval(statusRef.current);
      if (tipRef.current) clearInterval(tipRef.current);
    };
  }, [isActive, apiDone]);

  // Complete when apiDone becomes true
  useEffect(() => {
    if (apiDone && isActive && !hasCompleted.current) {
      hasCompleted.current = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (statusRef.current) clearInterval(statusRef.current);
      if (tipRef.current) clearInterval(tipRef.current);

      setProgress(100);
      const timeout = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [apiDone, isActive, onComplete]);

  const displayProgress = Math.round(progress);
  const statusText = apiDone ? "Zpracovávám výsledky..." : STATUS_MESSAGES[statusIndex % STATUS_MESSAGES.length];
  const tip = NANO_TIPS[tipIndex % NANO_TIPS.length];

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: "var(--light-bg)" }}>
      <Stepper current={2} />
      <div className="mt-10 w-full max-w-[480px] mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--orange)] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--orange)]" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--muted-text)]">Probíhá analýza</span>
        </div>

        <h2 className="text-2xl font-bold text-[var(--dark)]">Vyhodnocujeme vaši fotografii</h2>

        <div className="mt-8">
          <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--orange), #FFD700)",
                width: `${displayProgress}%`,
              }}
              initial={{ width: 1.5 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={statusText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 1.5 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-[var(--muted-text)]"
              >
                {statusText}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm font-mono text-[var(--muted-text)]">{displayProgress}%</span>
          </div>
        </div>

        <div
          className="mt-8 rounded-xl p-4"
          style={{
            background: "rgba(245,166,35,0.08)",
            border: "1px solid rgba(245,166,35,0.25)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--orange)]">
              <span className="inline-block w-1 h-1 rounded-full bg-[var(--orange)]" />
              NanoTip
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(245,166,35,0.2)" }} />
            <div className="flex gap-1">
              {NANO_TIPS.map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full transition-colors"
                  style={{ background: i === tipIndex % NANO_TIPS.length ? "var(--orange)" : "rgba(245,166,35,0.25)" }}
                />
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-sm font-semibold text-[var(--dark)]">{tip.title}</p>
              <p className="mt-1 text-sm text-[var(--dark)]/80">{tip.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
