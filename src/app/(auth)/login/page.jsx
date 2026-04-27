// ════════════════════════════════════════
// 📄 app/(auth)/login/page.jsx
// ════════════════════════════════════════
import AuthBranding from '@/components/auth/AuthBranding'
import LoginForm    from '@/components/auth/LoginForm'
import AuthFooter   from '@/components/auth/AuthFooter'

export const metadata = {
  title: 'Connexion',
  description: 'Connectez-vous à votre compte EduPlattform et continuez votre parcours d\'excellence.',
}

export default function LoginPage() {
  return (
    <>
      {/* ── Conteneur principal split ── */}
      <main
        className="flex-1 flex items-center justify-center p-6 md:p-12"
        aria-label="Page de connexion"
      >
        <div
          className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl bg-white"
          style={{ boxShadow: '0 32px 64px -12px rgba(18,28,42,0.08)' }}
        >
          {/* ── Panneau gauche : branding ── */}
          <AuthBranding />

          {/* ── Panneau droit : formulaire ── */}
          <LoginForm />
        </div>
      </main>

      {/* ── Footer simplifié ── */}
      <AuthFooter />
    </>
  )
}