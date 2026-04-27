// ════════════════════════════════════════
// 📄 app/(auth)/signup/page.jsx
// ════════════════════════════════════════
import { Navbar }  from '@/components/layout/Navbar'
import SignupForm  from '@/components/auth/SignupForm'
import SignupVisual from '@/components/auth/SignupVisual'
import AuthFooter  from '@/components/auth/AuthFooter'

export const metadata = {
  title: 'Créer un compte | EduPlattform',
  description: 'Rejoignez EduPlattform — La communauté des scholars africains. Accédez aux meilleurs cours et mentors.',
}

export default function SignupPage() {
  return (
    <>
      {/* ── Navbar glassmorphism ── */}
      <Navbar />

      {/* ── Contenu principal ── */}
      <main
        className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 md:px-8"
        aria-label="Page d'inscription"
      >
        <div
          className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-white rounded-3xl"
          style={{ boxShadow: '0 32px 64px -12px rgba(18,28,42,0.08)' }}
        >
          {/* ── Formulaire (gauche) ── */}
          <div className="lg:col-span-5">
            <SignupForm />
          </div>

          {/* ── Visuel inspirant (droite) ── */}
          <div className="hidden lg:block lg:col-span-7">
            <SignupVisual />
          </div>
        </div>
      </main>

      {/* ── Footer simplifié ── */}
      <AuthFooter />
    </>
  )
}