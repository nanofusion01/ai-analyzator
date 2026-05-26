import { Link } from "@tanstack/react-router";
import logo from "@/assets/nanofusion-logo.png";

export function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 h-20 md:h-24"
      style={{
        background: "var(--navy)",
        borderBottom: "1px solid var(--navy-border)",
      }}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4 md:px-8" style={{ maxWidth: 1200 }}>
        <Link to="/" className="flex items-center gap-3 no-underline">
          <img src={logo} alt="Nanofusion — čištění, impregnace, nátěry" className="h-14 md:h-20 w-auto object-contain" />
          <span
            className="hidden sm:inline-block px-2 py-1 rounded text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{
              background: "rgba(245,166,35,0.15)",
              border: "1px solid rgba(245,166,35,0.35)",
              color: "var(--orange)",
            }}
          >
            Analyzátor
          </span>
        </Link>
        <a
          href="tel:+420774509409"
          className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-[var(--orange)] transition-colors no-underline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="hidden sm:inline">+420 774 509 409</span>
        </a>
      </div>
    </nav>
  );
}
