import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { a as ChevronDown, C as Check } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const logo = "/assets/nanofusion-logo-CoggMHsx.png";
function Navbar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      className: "sticky top-0 z-50 h-20 md:h-24",
      style: {
        background: "var(--navy)",
        borderBottom: "1px solid var(--navy-border)"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-full items-center justify-between px-4 md:px-8", style: { maxWidth: 1200 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 no-underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Nanofusion — čištění, impregnace, nátěry", className: "h-14 md:h-20 w-auto object-contain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "hidden sm:inline-block px-2 py-1 rounded text-[10px] font-bold tracking-[0.2em] uppercase",
              style: {
                background: "rgba(245,166,35,0.15)",
                border: "1px solid rgba(245,166,35,0.35)",
                color: "var(--orange)"
              },
              children: "Analyzátor"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "tel:+420774509409",
            className: "flex items-center gap-2 text-sm font-medium text-white/80 hover:text-[var(--orange)] transition-colors no-underline",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "+420 774 509 409" })
            ]
          }
        )
      ] })
    }
  );
}
const track = (event, props) => {
  console.log("[Analytics]", event, props);
};
const STEPS = [
  { n: 1, label: "Fotografie" },
  { n: 2, label: "Analýza" },
  { n: 3, label: "Výsledek" }
];
function Stepper({ current, variant = "light" }) {
  const isDark = variant === "dark";
  const mutedText = isDark ? "rgba(255,255,255,0.55)" : "var(--muted-text)";
  const activeText = isDark ? "#fff" : "var(--dark)";
  const lineBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[560px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: STEPS.map((s, i) => {
    const done = s.n < current;
    const active = s.n === current;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1 last:flex-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors shrink-0",
            style: {
              background: done || active ? "var(--orange)" : "transparent",
              border: done || active ? "none" : `1.5px solid ${lineBg}`,
              color: done || active ? "#fff" : mutedText
            },
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : s.n
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap",
            style: { color: active ? activeText : mutedText },
            children: s.label
          }
        )
      ] }),
      i < STEPS.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px mx-2 sm:mx-3 -mt-5", style: { background: lineBg } }) : null
    ] }, s.n);
  }) }) });
}
const previewBeforeAfter = "/assets/preview-before-after-vpMVak58.jpg";
const SURFACES = ["Střecha", "Fasáda", "Okna", "Dlažba", "Jiné"];
function IntroView({ previewUrl, surface, onFileSelect, onClear, onSurfaceSelect, onAnalyze }) {
  const fileInputRef = reactExports.useRef(null);
  const uploadRef = reactExports.useRef(null);
  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleFile = (file) => {
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
      const preview = e.target?.result;
      onFileSelect(file, preview);
      track("photo_uploaded", { surfaceType: surface });
    };
    reader.readAsDataURL(file);
  };
  const onDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };
  const onChange = (e) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };
  const isReady = previewUrl && surface;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] items-center justify-center px-6 pt-8 pb-6 md:pt-10 md:pb-8 hex-pattern overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "pointer-events-none absolute -top-40 -right-40 w-[460px] h-[460px] lg:w-[640px] lg:h-[640px] rounded-full opacity-[0.18] blur-[140px]",
          style: { background: "var(--orange)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full mx-auto py-8 lg:py-10", style: { maxWidth: 1200 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "text-center lg:text-left max-w-[560px] mx-auto lg:mx-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3",
                    style: {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1 h-1 rounded-full bg-[var(--orange)]" }),
                      "Nanofusion · Analyzátor povrchů"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[42px] sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05] tracking-tight", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Zjistíme stav vašeho" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--orange)]", children: "povrchu z fotografie" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base sm:text-lg leading-relaxed max-w-[520px] mx-auto lg:mx-0", style: { color: "rgba(255,255,255,0.7)" }, children: "Pošlete nám snímek střechy, fasády nebo dlažby. Vyhodnotíme míru znečištění a doporučíme, jaké ošetření je pro váš povrch vhodné." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm", style: { color: "rgba(255,255,255,0.65)" }, children: ["Vyhodnocení do minuty", "Doporučení ošetření", "Nezávazně a zdarma"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1 h-1 rounded-full bg-[var(--orange)]" }),
                  t
                ] }, t)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: scrollToUpload,
                    className: "btn-primary mt-6 w-full sm:w-auto",
                    style: {
                      fontSize: 17,
                      padding: "20px 36px",
                      boxShadow: "0 10px 28px -12px rgba(245,166,35,0.45)"
                    },
                    children: "Nahrát fotografii povrchu"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-6 justify-center lg:justify-start text-sm", style: { color: "rgba(255,255,255,0.55)" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "2 847" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "analýz" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4", style: { background: "rgba(255,255,255,0.15)" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold", children: "98 %" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "přesnost" })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.7, delay: 0.15 },
              className: "hidden lg:block relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "relative rounded-3xl overflow-hidden",
                    style: {
                      background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 30px 80px -20px rgba(0,0,0,0.5)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b", style: { borderColor: "rgba(255,255,255,0.06)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-[var(--orange)]" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-white/70", children: "Ukázka výstupu" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/40", children: "před / po" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: previewBeforeAfter,
                            alt: "Před a po ošetření fasády Nanofusion",
                            width: 1280,
                            height: 768,
                            className: "block w-full h-[220px] object-cover",
                            loading: "lazy"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px",
                            style: { background: "rgba(245,166,35,0.9)", boxShadow: "0 0 12px rgba(245,166,35,0.6)" }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white",
                            style: { background: "rgba(0,0,0,0.55)" },
                            children: "Dnes"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white",
                            style: { background: "rgba(245,166,35,0.9)" },
                            children: "Po Nanofusion"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: 88, height: 88 }, children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "88", height: "88", viewBox: "0 0 88 88", className: "-rotate-90", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "44", cy: "44", r: "38", fill: "none", stroke: "rgba(255,255,255,0.08)", strokeWidth: "8" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "44", cy: "44", r: "38", fill: "none", stroke: "var(--orange)", strokeWidth: "8", strokeLinecap: "round", strokeDasharray: 2 * Math.PI * 38, strokeDashoffset: 2 * Math.PI * 38 * (1 - 0.62) })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-extrabold text-white", children: "6.2" }) })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-white", children: "Střední znečištění" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/50", children: "Fasáda · 120 m²" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider", style: { background: "rgba(245,166,35,0.18)", color: "var(--orange)" }, children: "Do 3 měsíců" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: [
                          { label: "Mechy a řasy", value: 48 },
                          { label: "Prach a saze", value: 32 },
                          { label: "Organické skvrny", value: 20 }
                        ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[11px] mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70", children: row.label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-semibold", children: [
                              row.value,
                              "%"
                            ] })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full overflow-hidden", style: { background: "rgba(255,255,255,0.06)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: { width: `${row.value}%`, background: "var(--orange)" } }) })
                        ] }, row.label)) })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-30 blur-3xl", style: { background: "var(--orange)" } })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "mt-14 flex justify-center lg:hidden",
            animate: { y: [0, 8, 0] },
            transition: { repeat: Infinity, duration: 1.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-6 h-6", style: { color: "rgba(255,255,255,0.35)" } })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: uploadRef, id: "upload", className: "py-16 lg:py-24 px-4", style: { background: "var(--light-bg)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[720px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { current: 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[var(--dark)]", children: "Nahrajte fotografii povrchu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[var(--muted-text)]", children: "Střecha, fasáda, dlažba nebo okna." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        !previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "block md:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => fileInputRef.current?.click(),
              className: "btn-primary w-full",
              style: { fontSize: 17, padding: "20px 24px" },
              children: "Vyfotit nebo vybrat z galerie"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-xs text-[var(--muted-text)]", children: "nebo přetáhněte soubor sem" })
        ] }),
        !previewUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "hidden md:block",
            onDragOver: (e) => e.preventDefault(),
            onDrop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-xl border-2 border-dashed p-8 text-center transition-colors hover:border-[var(--orange)]/60",
                style: { borderColor: "rgba(245,166,35,0.4)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "var(--orange)", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "13", r: "4" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base font-semibold text-[var(--dark)]", children: "Přetáhněte fotografii sem" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[var(--muted-text)]", children: "nebo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => fileInputRef.current?.click(),
                      className: "mt-3 inline-flex items-center justify-center rounded-lg border border-[var(--orange)] text-[var(--orange)] px-4 py-2 text-sm font-semibold hover:bg-[var(--orange)]/5 transition-colors",
                      children: "Vybrat soubor"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-[var(--muted-text)]", children: "JPG, PNG, WEBP • Max 10 MB" })
                ] })
              }
            )
          }
        ),
        previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: previewUrl,
              alt: "Náhled",
              className: "w-full object-cover rounded-lg",
              style: { maxHeight: 280 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClear,
              className: "absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-[var(--dark)] hover:bg-gray-100",
              "aria-label": "Odstranit fotografii",
              children: "×"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onClear,
              className: "mt-3 text-sm text-[var(--muted-text)] hover:text-[var(--orange)] underline underline-offset-2",
              children: "Nahrát jinou fotografii"
            }
          )
        ] }) : null
      ] }),
      previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-[var(--dark)] mb-2 block", children: "Typ povrchu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SURFACES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onSurfaceSelect(s),
            className: `px-4 py-2 text-sm rounded-full border transition-colors ${surface === s ? "bg-[var(--orange)] text-white border-transparent" : "bg-white text-[var(--dark)] border-[var(--border)] hover:border-[var(--orange)]"}`,
            children: s
          },
          s
        )) })
      ] }) : null,
      previewUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onAnalyze,
          disabled: !isReady,
          className: "btn-primary w-full mt-6",
          style: { fontSize: 17, padding: "20px 24px" },
          children: "Spustit analýzu →"
        }
      ) : null
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange
      }
    )
  ] });
}
const NANO_TIPS = [
  {
    id: "lifetime",
    title: "Životnost",
    text: "Nanopovlak Nanofusion chrání povrch 3–5 let bez nutnosti opakování."
  },
  {
    id: "self-cleaning",
    title: "Samočistící efekt",
    text: "Díky hydrofobní vrstvě stéká voda i nečistoty samy — povrch se čistí deštěm."
  },
  {
    id: "uv",
    title: "UV ochrana",
    text: "Nanovrstva odráží UV záření a brání vyblednutí barev fasády či auta."
  },
  {
    id: "bio",
    title: "Stop mechům a řasám",
    text: "Ošetřený povrch zabraňuje opětovnému usazování mechů, řas a lišejníků."
  },
  {
    id: "eco",
    title: "Šetrné k okolí",
    text: "Naše přípravky jsou biologicky odbouratelné a bezpečné pro rostliny i zvířata."
  },
  {
    id: "warranty",
    title: "Záruka kvality",
    text: "Na profesionální aplikaci poskytujeme záruku až 5 let písemně."
  },
  {
    id: "speed",
    title: "Rychlá realizace",
    text: "Běžnou fasádu rodinného domu zvládneme ošetřit za 1–2 dny."
  }
];
const STATUS_MESSAGES = [
  "Nahrávám fotografii...",
  "Analyzuji typ povrchu...",
  "Detekuji znečištění...",
  "Vyhodnocuji míru poškození...",
  "Připravuji doporučení..."
];
function LoadingView({ onComplete, apiDone, isActive }) {
  const [progress, setProgress] = reactExports.useState(0);
  const [statusIndex, setStatusIndex] = reactExports.useState(0);
  const [tipIndex, setTipIndex] = reactExports.useState(0);
  const intervalRef = reactExports.useRef(null);
  const statusRef = reactExports.useRef(null);
  const tipRef = reactExports.useRef(null);
  const hasCompleted = reactExports.useRef(false);
  const prevActive = reactExports.useRef(false);
  reactExports.useEffect(() => {
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
      }, 2e3);
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
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-12", style: { background: "var(--light-bg)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { current: 2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 w-full max-w-[480px] mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--orange)] opacity-60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-[var(--orange)]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--muted-text)]", children: "Probíhá analýza" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-[var(--dark)]", children: "Vyhodnocujeme vaši fotografii" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-slate-100 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full rounded-full",
            style: {
              background: "linear-gradient(90deg, var(--orange), #FFD700)",
              width: `${displayProgress}%`
            },
            initial: { width: 1.5 },
            animate: { width: `${displayProgress}%` },
            transition: { duration: 0.3 }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 1.5 },
              transition: { duration: 0.3 },
              className: "text-sm text-[var(--muted-text)]",
              children: statusText
            },
            statusText
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono text-[var(--muted-text)]", children: [
            displayProgress,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-8 rounded-xl p-4",
          style: {
            background: "rgba(245,166,35,0.08)",
            border: "1px solid rgba(245,166,35,0.25)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--orange)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1 h-1 rounded-full bg-[var(--orange)]" }),
                "NanoTip"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px", style: { background: "rgba(245,166,35,0.2)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: NANO_TIPS.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-1 h-1 rounded-full transition-colors",
                  style: { background: i === tipIndex % NANO_TIPS.length ? "var(--orange)" : "rgba(245,166,35,0.25)" }
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 6 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -6 },
                transition: { duration: 0.35 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[var(--dark)]", children: tip.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[var(--dark)]/80", children: tip.text })
                ]
              },
              tip.id
            ) })
          ]
        }
      )
    ] })
  ] });
}
function LeadGateView({ onSubmit }) {
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [propertyType, setPropertyType] = reactExports.useState("");
  const [gdpr, setGdpr] = reactExports.useState(false);
  const isValid = name.trim() && phone.trim() && email.trim() && propertyType && gdpr;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    const data = { name: name.trim(), phone: phone.trim(), email: email.trim(), propertyType };
    track("lead_submitted", { propertyType });
    onSubmit(data);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen px-4 py-8", style: { background: "var(--light-bg)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { current: 3 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "mt-8 w-full max-w-[480px] mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold text-center text-[var(--dark)]", children: "Analýza je hotová" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-center text-[var(--muted-text)]", children: "Pro zobrazení výsledků nám prosím nechte kontakt." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 relative rounded-xl p-4", style: { background: "#f8fafc", border: "1px solid var(--border)" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-slate-200" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-24 rounded bg-slate-200" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-16 rounded bg-slate-200" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded bg-slate-200" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-3/4 rounded bg-slate-200" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-xl flex items-center justify-center backdrop-blur-sm",
                style: { background: "rgba(255,255,255,0.6)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-[var(--dark)]", children: "Výsledky jsou připraveny" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-[var(--border)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[var(--muted-text)] text-center", children: "Zadejte kontakt pro zobrazení výsledků" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-[var(--border)]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-4 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold text-[var(--dark)] mb-1.5", children: [
                "Jméno a příjmení ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--orange)]", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Jan Novák",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  className: "form-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold text-[var(--dark)] mb-1.5", children: [
                "Telefon ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--orange)]", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "tel",
                  placeholder: "+420 774 509 409",
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  className: "form-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold text-[var(--dark)] mb-1.5", children: [
                "E-mail ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--orange)]", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "email",
                  placeholder: "jan@email.cz",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  className: "form-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-semibold text-[var(--dark)] mb-1.5", children: [
                "Typ nemovitosti ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--orange)]", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: propertyType,
                  onChange: (e) => setPropertyType(e.target.value),
                  className: "form-input",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Vyberte..." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Rodinný dům", children: "Rodinný dům" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Bytový dům", children: "Bytový dům" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Komerční objekt", children: "Komerční objekt" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Jiné", children: "Jiné" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  id: "gdpr",
                  checked: gdpr,
                  onChange: (e) => setGdpr(e.target.checked),
                  className: "mt-1 h-5 w-5 accent-[var(--orange)]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "gdpr", className: "text-sm text-[var(--muted-text)] leading-relaxed", children: [
                "Souhlasím se zpracováním osobních údajů.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacy", className: "underline hover:text-[var(--orange)] transition-colors", children: "Zásady ochrany" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: !isValid,
                className: "btn-primary w-full mt-6",
                style: { fontSize: 17, padding: "20px 24px" },
                children: "Zobrazit výsledky analýzy →"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-xs text-[var(--muted-text)]", children: "Nezasíláme spam. Použijeme kontakt pouze pro konzultaci vašeho povrchu." })
        ]
      }
    )
  ] });
}
function BeforeAfterSlider({
  imageUrl,
  leftLabel = "DNES",
  rightLabel = "PO NANOFUSION",
  sliderColor = "#F5A623",
  initialPosition = 0.5
}) {
  const [position, setPosition] = reactExports.useState(initialPosition);
  const [showHint, setShowHint] = reactExports.useState(true);
  const containerRef = reactExports.useRef(null);
  const isDragging = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3e3);
    return () => clearTimeout(timer);
  }, []);
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct2 = Math.max(0, Math.min(1, x / rect.width));
    setPosition(pct2);
  };
  const onPointerDown = (e) => {
    isDragging.current = true;
    handleMove(e.clientX);
    e.target.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };
  const onPointerUp = () => {
    isDragging.current = false;
  };
  const onTouchStart = (e) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };
  const onTouchEnd = () => {
    isDragging.current = false;
  };
  const pct = Math.round(position * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: "relative select-none cursor-ew-resize overflow-hidden",
      style: { touchAction: "none" },
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: "Před ošetřením",
            className: "block w-full h-auto",
            draggable: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-1.5 overflow-hidden",
            style: { left: 0, width: `${pct}%` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: "Po ošetření",
                className: "block h-full max-w-none object-cover",
                style: {
                  width: containerRef.current ? containerRef.current.offsetWidth : "100%",
                  filter: "brightness(1.2) contrast(1.08) saturate(1.3)"
                },
                draggable: false
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-3 left-3 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider",
            style: { opacity: position > 0.15 ? 1 : 0, transition: "opacity 0.2s" },
            children: leftLabel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-3 right-3 bg-[var(--orange)]/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider",
            style: { opacity: position < 0.85 ? 1 : 0, transition: "opacity 0.2s" },
            children: rightLabel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0",
            style: { left: `${pct}%`, transform: "translateX(-50%)", width: 2, background: sliderColor }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center",
            style: { left: `${pct}%` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center",
                style: { border: `2px solid ${sliderColor}` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: sliderColor, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "15 18 9 12 15 6" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: sliderColor, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "9 18 15 12 9 6" }) })
                ]
              }
            )
          }
        ),
        showHint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1.5 left-0 right-0 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-[var(--muted-text)] bg-white/80 px-2 py-1 rounded-full", children: "← Táhněte pro porovnání →" }) })
      ]
    }
  );
}
function createSupabaseClient() {
  const SUPABASE_URL = "https://fvrekzjeqnnutezbkobd.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2cmVremplcW5udXRlemJrb2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NDc1ODAsImV4cCI6MjA5NTMyMzU4MH0._FNJcZvyE9lWtYi8JFRZnlD0D6PIFJb_p9H0tAW8uPU";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
function ScoreDonut({ score }) {
  const r = 45;
  const c = 2 * Math.PI * r;
  const offset = c - score / 10 * c;
  const color = score >= 8 ? "#22C55E" : score >= 5 ? "#F5A623" : "#EF4444";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", style: { width: 100, height: 100 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "100", height: "100", viewBox: "0 0 100 100", className: "-rotate-90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r, fill: "none", stroke: "#f1f5f9", strokeWidth: 10 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.circle,
        {
          cx: "50",
          cy: "50",
          r,
          fill: "none",
          stroke: color,
          strokeWidth: 10,
          strokeLinecap: "round",
          strokeDasharray: c,
          initial: { strokeDashoffset: c },
          animate: { strokeDashoffset: offset },
          transition: { duration: 1, ease: "easeOut" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[32px] font-extrabold text-[var(--dark)]", children: score }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[var(--muted-text)]", children: "/10" })
    ] })
  ] });
}
function UrgencyBadge({ urgency }) {
  const styles = urgency === "Doporučit ihned" ? { bg: "#fee2e2", text: "#b91c1c" } : urgency === "Do 3 měsíců" ? { bg: "#ffedd5", text: "#c2410c" } : { bg: "#dcfce7", text: "#15803d" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "inline-block rounded-full px-3 py-1 text-xs font-bold",
      style: { background: styles.bg, color: styles.text },
      children: urgency
    }
  );
}
function ResultsView({
  imageUrl,
  surface,
  analysis,
  leadName,
  leadPhone,
  leadEmail,
  onRestart
}) {
  const [description, setDescription] = reactExports.useState("");
  const [timeline, setTimeline] = reactExports.useState("");
  const [quoteSubmitted, setQuoteSubmitted] = reactExports.useState(false);
  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || !timeline) return;
    track("quote_submitted");
    const { error } = await supabase.from("leads").insert({
      name: leadName,
      phone: leadPhone,
      email: leadEmail,
      surface,
      score: analysis.score,
      label: analysis.label,
      urgency: analysis.urgency,
      description: description.trim(),
      timeline,
      source: "quote"
    });
    if (error) console.error("quote insert failed", error);
    setQuoteSubmitted(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-24 px-4 lg:px-8 pt-8", style: { background: "var(--light-bg)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { current: 3 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[560px] lg:max-w-[1100px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 bg-white rounded-2xl p-6 text-center lg:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--orange)]", children: "Výsledek analýzy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-2 text-xl lg:text-2xl font-bold text-[var(--dark)]", children: [
          "Povrch: ",
          surface
        ] }),
        analysis.isMock ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mt-3 rounded-xl p-3 text-sm",
            style: {
              background: "rgba(245,166,35,0.1)",
              border: "1px solid rgba(245,166,35,0.3)",
              color: "var(--orange)"
            },
            children: "Ukázkový režim — backend není zatím připojen, hodnoty jsou ilustrativní."
          }
        ) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:grid lg:grid-cols-2 lg:gap-6 lg:mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4 lg:mt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreDonut, { score: analysis.score }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-[var(--dark)]", children: analysis.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-[var(--muted-text)]", children: "Celkové hodnocení povrchu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UrgencyBadge, { urgency: analysis.urgency }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-[var(--dark)]", children: "Vizualizace výsledku" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfterSlider, { imageUrl }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-3 text-center text-xs text-[var(--muted-text)] italic", children: "* Vizualizace je ilustrativní. Výsledek závisí na typu a rozsahu znečištění." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-[var(--dark)] mb-4", children: "Složení znečištění" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: analysis.breakdown.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.1 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[var(--dark)]", children: item.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[var(--dark)]", children: [
                      item.value,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-slate-100 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "h-full rounded-full",
                      style: { background: item.color },
                      initial: { width: 1.5 },
                      animate: { width: `${item.value}%` },
                      transition: { duration: 0.8, delay: i * 0.1, ease: "easeOut" }
                    }
                  ) })
                ]
              },
              item.label
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4 lg:mt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-bold text-[var(--dark)] mb-4", children: "Doporučení" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: analysis.recommendations.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full",
                  style: { background: "var(--orange)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--dark)] leading-relaxed", children: rec })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--muted-text)] mb-2", children: "Odhadované zlepšení po ošetření" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-5xl font-extrabold text-[var(--orange)]", children: [
              analysis.improvementPercent,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--muted-text)] mt-1", children: "vizuální zlepšení povrchu" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-2xl p-6",
              style: {
                background: "rgba(245,166,35,0.06)",
                border: "1px solid rgba(245,166,35,0.2)"
              },
              children: !quoteSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-extrabold text-[var(--dark)]", children: "Chcete takový výsledek?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--muted-text)] mt-1 mb-5", children: "Pošleme vám nezávaznou nabídku přímo na váš povrch." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleQuoteSubmit, className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--dark)] mb-1.5", children: "Popis povrchu / adresa" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        rows: 3,
                        placeholder: "Např. střecha rodinného domu, cca 120 m², Praha 6",
                        value: description,
                        onChange: (e) => setDescription(e.target.value),
                        className: "form-input resize-none"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--dark)] mb-1.5", children: "Preferovaný termín" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: timeline,
                        onChange: (e) => setTimeline(e.target.value),
                        className: "form-input",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Vyberte..." }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Co nejdříve", children: "Co nejdříve" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Do 1 měsíce", children: "Do 1 měsíce" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Do 3 měsíců", children: "Do 3 měsíců" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Jen zjišťuji cenu", children: "Jen zjišťuji cenu" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: !description.trim() || !timeline,
                      className: "btn-primary w-full mt-4",
                      style: { padding: "20px 24px" },
                      children: "Odeslat poptávku →"
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-green-50 border border-green-200 rounded-xl p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-green-800", children: "Poptávka odeslána. Ozveme se vám do 24 hodin." }) })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pb-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              track("cta_restart");
              onRestart();
            },
            className: "btn-secondary inline-block px-6 py-3",
            children: "Analyzovat další povrch"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://nanofusion.cz",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-sm text-[var(--muted-text)] hover:text-[var(--orange)] transition-colors no-underline",
            children: "← Zpět na nanofusion.cz"
          }
        ) })
      ] })
    ] })
  ] });
}
const mockAnalysisResult = {
  score: 5,
  label: "Průměrný",
  breakdown: [
    { label: "Atmosferická špína", value: 42, color: "#94a3b8" },
    { label: "Biologický nárůst", value: 33, color: "#86efac" },
    { label: "Vodní kámen", value: 25, color: "#93c5fd" }
  ],
  recommendations: [
    "Doporučujeme profesionální tlakové čištění před aplikací nanopovlaku.",
    "Nanopovlak Nanofusion prodlouží životnost povrchu o 3–5 let.",
    "Po ošetření bude povrch odolný vůči biologickému nárůstu a povětrnosti."
  ],
  urgency: "Do 3 měsíců",
  improvementPercent: 75,
  isMock: true
};
function Index() {
  const [view, setView] = reactExports.useState("intro");
  const [previewUrl, setPreviewUrl] = reactExports.useState(null);
  const [surface, setSurface] = reactExports.useState(null);
  const [analysisResult, setAnalysisResult] = reactExports.useState(null);
  const [analysisDone, setAnalysisDone] = reactExports.useState(false);
  const [analysisId, setAnalysisId] = reactExports.useState(null);
  const [leadData, setLeadData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    track("page_view");
  }, []);
  const handleFileSelect = reactExports.useCallback((file, preview) => {
    setPreviewUrl(preview);
  }, []);
  const handleClear = reactExports.useCallback(() => {
    setPreviewUrl(null);
    setSurface(null);
  }, []);
  const handleSurfaceSelect = reactExports.useCallback((s) => {
    setSurface(s);
  }, []);
  const handleAnalyze = reactExports.useCallback(() => {
    if (!previewUrl || !surface) {
      toast.error("Vyberte fotografii a typ povrchu.");
      return;
    }
    track("analysis_started");
    setAnalysisResult(null);
    setAnalysisDone(false);
    setAnalysisId(crypto.randomUUID());
    setView("loading");
    setTimeout(() => {
      const result = {
        ...mockAnalysisResult,
        isMock: true
      };
      setAnalysisResult(result);
      setAnalysisDone(true);
      track("analysis_complete", {
        score: result.score,
        isMock: true
      });
    }, 2e3);
  }, [previewUrl, surface]);
  const handleLoadingComplete = reactExports.useCallback(() => {
    setView("lead");
  }, []);
  const handleLeadSubmit = reactExports.useCallback((data) => {
    setLeadData(data);
    setView("results");
    supabase.from("leads").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      property_type: data.propertyType,
      surface: surface ?? null,
      score: analysisResult?.score ?? null,
      label: analysisResult?.label ?? null,
      urgency: analysisResult?.urgency ?? null,
      source: "analyzer"
    }).then(({
      error
    }) => {
      if (error) console.error("lead insert failed", error);
    });
  }, [surface, analysisResult]);
  const handleRestart = reactExports.useCallback(() => {
    setView("intro");
    setPreviewUrl(null);
    setSurface(null);
    setAnalysisResult(null);
    setAnalysisDone(false);
    setAnalysisId(null);
    setLeadData(null);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: view === "intro" ? "block" : "none"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IntroView, { previewUrl, surface, onFileSelect: handleFileSelect, onClear: handleClear, onSurfaceSelect: handleSurfaceSelect, onAnalyze: handleAnalyze }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: view === "loading" ? "block" : "none"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingView, { onComplete: handleLoadingComplete, apiDone: analysisDone, isActive: view === "loading" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: view === "lead" ? "block" : "none"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadGateView, { onSubmit: handleLeadSubmit }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: view === "results" ? "block" : "none"
    }, children: analysisResult && previewUrl && surface ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsView, { imageUrl: previewUrl, surface, analysis: analysisResult, leadName: leadData?.name ?? "", leadPhone: leadData?.phone ?? "", leadEmail: leadData?.email ?? "", onRestart: handleRestart }) : null })
  ] });
}
export {
  Index as component
};
