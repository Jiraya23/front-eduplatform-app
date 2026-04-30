// ════════════════════════════════════════
// 📄 components/auth/AuthFooter.jsx
// ════════════════════════════════════════
import Link from 'next/link'

export default function AuthFooter() {
  return (
    <footer className="w-full py-10 px-8" aria-label="Pied de page">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* ── Logo ── */}
        <div className="flex items-center gap-2">
          <span
            className="text-xl font-bold text-primary"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            EduPlattform
          </span>
          <span className="text-xs font-bold text-on-surface/30 ml-2 tracking-wider">
            EST. 2024
          </span>
        </div>

        {/* ── Liens ── */}
        <nav className="flex gap-8" aria-label="Liens du pied de page">
          {[
            { label: 'Centre d\'aide',     href: '/help' },
            { label: 'Conditions d\'utilisation', href: '/terms' },
            { label: 'Politique de confidentialité',  href: '/privacy' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-on-surface/60 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Copyright ── */}
        <p className="text-sm text-on-surface/50">
          © 2026 EduPlattform. Construit pour les leaders de demain.
        </p>

      </div>
    </footer>
  )
}