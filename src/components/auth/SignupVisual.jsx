// ════════════════════════════════════════
// 📄 components/auth/SignupVisual.jsx
// ════════════════════════════════════════
import Image  from 'next/image'
import { Star, Award } from 'lucide-react'

export default function SignupVisual() {
  return (
    <div className="relative overflow-hidden bg-slate-900 h-full min-h-[600px]">

      {/* ── Image de fond ── */}
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZpvAi_Jd6qh3kZUoUCc6r7JBS1zZlCXSME7rCOjbyGj-j3VEfeZzd5lNEtrfDeV7oWJSM2gDkLN0mK4rt-MYvVQYGH3BJ3lOmGnGGkbjso0QduXu4Q4ezKI17b2Ltbs-YdtetweIT7FTHwl78q-jiTtILyCEeqK9_-r3mFAuUf0wfLzR_tvbYVwcJBD1LFP09Yt-9GKFSvm8oNu8C8M-oWvOWzMCw0272RtCNjRSwseYVdH-04zxXqXXUU3-6c7cYEUF3atFU-aY"
        alt="Espace de travail collaboratif dans un hub technologique africain moderne"
        fill
        className="object-cover opacity-80 mix-blend-overlay"
        priority
      />

      {/* ── Dégradé bas → primary ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,110,47,0.92) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* ── Texture géométrique africaine coin supérieur droit ── */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* ── Badge flottant "Accredited" ── */}
      <div
        className="absolute top-12 right-12 p-6 rounded-3xl flex flex-col items-center"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
        }}
        aria-label="Certification : Accredited, Global Standard"
      >
        <Award
          size={36}
          strokeWidth={1.5}
          className="mb-2"
          style={{ color: '#fdc425' }}
          aria-hidden="true"
        />
        <p className="text-white font-bold text-xs uppercase tracking-tighter">Accrédité</p>
        <p className="text-white/60 text-[10px]">Norme internationale</p>
      </div>

      {/* ── Contenu bas : citation + auteur ── */}
      <div className="absolute bottom-0 left-0 p-16 text-white z-10">

        {/* Badge "The Elevated Choice" */}
        <div className="flex items-center gap-2 mb-6">
          <Star
            size={16}
            strokeWidth={1.5}
            className="fill-current"
            style={{ color: '#fdc425' }}
            aria-hidden="true"
          />
          <span className="text-sm font-bold tracking-widest uppercase">
            Le choix d'excellence
          </span>
        </div>

        {/* Citation */}
        <blockquote
          className="text-4xl font-bold leading-tight mb-6"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          "L'éducation est l'arme la plus puissante que vous puissiez utiliser pour changer le monde."
        </blockquote>

        {/* Auteur */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: '2px solid rgba(107,255,143,0.6)' }}
          >
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBJrm1QoIxE2ubDkH1R96l_ZvU8M_HIIRDd-oRuwyRqysX_8phzzgRXJqtgmEUzRbu15dhBUfzEBetTy9p8Oa6eLJ5g67ZSSOKIZ5ksZ-KvVF6GC2ZMXSlxbNLsl49WYjmKVgOlvSq73HiKRRwefklAAegGZryM-MRJTfaCUAu-nQHI14T11ZWQxsXmC1q7CBBbR97dCqLgRnyhuyV6Dtc2tIELwR-9TDiI04GHC124QEsnMlHftNrA4EfO13jB8jB0lKuHs6PPks"
              alt="Photo de profil d'Awa Nemlin, Lead Instructor en Creative Design"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-white">Awa Nemlin</p>
            <p className="text-sm" style={{ color: '#6bff8f' }}>
              Instructrice principale, Design Créatif
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}