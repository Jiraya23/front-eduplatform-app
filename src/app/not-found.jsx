// ════════════════════════════════════════
// 📄 app/not-found.jsx
// ════════════════════════════════════════
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import NotFoundContent from "@/components/common/NotFoundContent";

export const metadata = {
  title: "404 – Classroom Not Found | EduPlattform",
  description: "La page que vous cherchez est introuvable.",
};

export default function NotFound() {
  return (
    // ── Viewport fixe, zéro scroll ──────────────────────────────
    <div className="h-screen overflow-hidden flex flex-col bg-surface">

      {/* ── Navbar ───────────────────────────────────────────── */}
      <Navbar />

      <div className="h-18 shrink-0" aria-hidden="true" />

      {/* ── Zone centrale — prend tout l'espace restant ───────── */}
      <main
        className="flex-1 flex items-center justify-center relative overflow-hidden px-6"
        aria-label="Page introuvable"
      >
        {/* ── Blob gauche ─── */}
        <div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(0,110,47,0.06)" }}
          aria-hidden="true"
        />
        {/* ── Blob droit ─── */}
        <div
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(120,90,0,0.05)" }}
          aria-hidden="true"
        />
        {/* ── Pattern africain global ─── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            opacity: 0.025,
            maskImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            maskSize: "24px 24px",
            WebkitMaskImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            WebkitMaskSize: "24px 24px",
            backgroundImage: "repeating-linear-gradient(45deg, #121c2a 0, #121c2a 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />

        {/* ── Contenu 404 ─── */}
        <NotFoundContent />
      </main>

      {/* ── Footer minimal ───────────────────────────────────── */}
      <footer className="shrink-0 py-4 px-8 flex justify-between items-center border-t border-slate-200/50 bg-slate-50/80">
        <p className="text-xs text-slate-400">
          © Avril 2026 EduPlattform. Built for The Elevated Scholar.
        </p>
        <nav className="flex gap-6" aria-label="Liens légaux">
          {["Privacy Policy", "Terms of Service", "Help Center"].map((label) => (
            <Link
              key={label}
              href="#"
              className="text-[10px] font-medium text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
            >
              {label}
            </Link>
          ))}
        </nav>
      </footer>

    </div>
  );
}