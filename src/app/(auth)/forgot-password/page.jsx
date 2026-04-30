// ════════════════════════════════════════
// 📄 app/(auth)/forgot-password/page.jsx
// ════════════════════════════════════════
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password – EduPlattform",
  description: "Réinitialisez votre mot de passe EduPlattform.",
};

const footerLinks = ["Privacy Policy", "Terms of Service", "Help Center", "Career"];

export default function ForgotPasswordPage() {
  return (
    // ── Viewport fixe, zéro scroll ──────────────────────────────
    <div className="h-screen overflow-hidden flex flex-col bg-[#f8f9ff]">

      {/* ── Navbar ───────────────────────────────────────────── */}
      <Navbar />

      {/* ── Espaceur navbar fixe ─────────────────────────────── */}
      <div className="h-[72px] shrink-0" aria-hidden="true" />

      {/* ── Zone centrale ─────────────────────────────────────── */}
      <main
        className="flex-1 min-h-0 flex items-center justify-center relative overflow-hidden px-6"
        aria-label="Réinitialisation du mot de passe"
      >
        {/* ── Blob haut droite ─── */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"
          style={{ background: "rgba(0,110,47,0.05)" }}
          aria-hidden="true"
        />
        {/* ── Blob bas gauche ─── */}
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"
          style={{ background: "rgba(120,90,0,0.05)" }}
          aria-hidden="true"
        />

        <ForgotPasswordForm />
      </main>

      {/* ── Footer 1 ligne ───────────────────────────────────── */}
      <footer className="shrink-0 py-3 px-8 bg-slate-50/80 border-t border-slate-200/50 flex justify-between items-center">
        <p className="text-xs text-slate-400">
          © 2026 EduPlattform. Built for The Elevated Scholar.
        </p>
        <nav className="flex gap-6" aria-label="Liens légaux">
          {footerLinks.map((label) => (
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