// ════════════════════════════════════════
// 📄 components/auth/AuthBranding.jsx
// ════════════════════════════════════════
import Image        from 'next/image'
import Link         from 'next/link'
import { GraduationCap } from 'lucide-react'

// ── URLs des avatars scholars ──────────────────────
const scholarAvatars = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW3lPVusqdczxuny3pQAm0u8plpVo6hlSq2SM0TgD_hPfu_fYK0WIDAd1WGwU9oN_dk7OgYWnCzxobExFN6i77ODg66fvyKV9dSmPYtAu3ZBiRIx9dgfQI3UxDjOcm8KaO2TnQQhohVNMd5JF_MYA-gu8rZoQ6upyzK1aas-6RtzPeqEMdE7mpXEb8LB5vhl_YuGF8jqWMclss3wa54-73gwfFU_L-kYhi_VjDkOPqU_8dd-lzgLpBGqLyZ5aXqIjBCrkJavgerzU',
    alt: 'Étudiante africaine souriante',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Vk7Oj16SguQm0zz30OlPFkCFimBcv9-ZeE3SmlQf6E_mRsEunJoD415WXyIDd_Khy9s4bFRcZzRm-PtNv0A761JRykFsj7xG9qg87hQWurw3nXQNg6hfqonqF0GdOcXlB4TfB2uT5vM6xsEpgFOel4-j1Gs88gjl3pMHQXEKULmjilKtFp6jLmjAtQ6UuRnAJCTivx_6ycpG9zXT8Zaj6EfO44FeEnz_gAYhioxBkNqWK91p7vfX4QWX1rjzmGghsD-LEPmbjI0',
    alt: 'Étudiant africain concentré',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYzvXl8MKP6dfb6Fq7ku5kXyaZpANI4tRL8wNB0tFqFHbQT9Y5YdX3d_EkmxOmAiqLMKwGJBY8lWQ8Q9WFjwqY-4qrrUkenvkETjBiO8HraLaxTbxG5shOd_EhkKrojSIz7p8BBac7COyVvQQuugl6ZLBi0x8nUj4IQkIYPUrwvgECCoxDaf8jo4e9Q1hGDBT2XyqtO1xoxVRZ2UnMYjv6EULUrojZ-rGmAkxep3UIkIObONxx-BxEA9fY0W9CFjMycBxp-liajoA',
    alt: 'Étudiant portant des lunettes',
  },
]

export default function AuthBranding() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden text-white"
      style={{ background: 'linear-gradient(135deg, #006e2f 0%, #22c55e 100%)' }}
      aria-label="Panneau de présentation EduPlattform"
    >

      {/* ── Texture géométrique africaine ── */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Cercle décoratif ── */}
      <div
        className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.2)' }}
        aria-hidden="true"
      />

      {/* ── Logo ── */}
      <div className="relative z-10">
        <Link
          href="/"
          className="flex items-center gap-3 mb-12"
          aria-label="EduPlattform — Retour à l'accueil"
        >
          <GraduationCap size={36} strokeWidth={2} className="text-white" />
          <span
            className="font-bold text-2xl tracking-tighter text-white"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            EduPlattform
          </span>
        </Link>

        {/* ── Headline ── */}
        <h2
          className="text-5xl font-bold leading-tight mb-6 tracking-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Élever{' '}
          <br />
          <span style={{ color: '#fdc425' }}>l'apprenant africain.</span>
        </h2>

        <p className="text-white/80 text-lg max-w-md leading-relaxed font-medium">
          Rejoignez l'écosystème d'apprentissage le plus moderne d'Afrique. Accédez à des cours de classe mondiale,
          des mentors experts et une communauté de passionnés.
        </p>
      </div>

      {/* ── Image + social proof ── */}
      <div className="relative z-10">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5MWMZcy8-W4RwUCjSB80uKcBFKO676Lg6cNFEWrK-GNsk1LeoxpLnOVF8GSb7RN4VQ3oCws296Aki5gRYpuInU2tm5S_uvTaxNy9lHHCdS8zWZSCTZlJUUv_co6xZ0xRjdycPZ-cnQ5DtZj_0UrSqrQCmf8A4tfv-EMR1y4AGzBZGmJ-ivjLavEMJcMxnp1hP4wU07M8ZpM-bbyRKLWaL8Nxdh1uZADQEBuTzM0osoVXOHNNzahk055MjGci5RIAEPDDWJu2Hhmk"
          alt="Étudiants collaborant ensemble sur un projet universitaire"
          width={480}
          height={300}
          className="rounded-2xl shadow-2xl"
          style={{ transform: 'rotate(2deg)', transition: 'transform 0.5s ease' }}
          priority
        />

        {/* ── Social proof ── */}
        <div className="mt-10 flex items-center gap-4">
          <div
            className="flex -space-x-3"
            aria-label="Quelques membres de la communauté EduPlattform"
          >
            {scholarAvatars.map((avatar, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white/60 overflow-hidden bg-[#e6eeff]"
                style={{
                  backgroundImage: `url('${avatar.src}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label={avatar.alt}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-white/90">
            Rejoignez +5 000 apprenants aujourd'hui
          </p>
        </div>
      </div>

    </div>
  )
}