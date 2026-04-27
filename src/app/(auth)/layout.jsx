// ════════════════════════════════════════
// 📄 app/(auth)/layout.jsx
// ════════════════════════════════════════
export const metadata = {
  title: {
    template: '%s | EduPlattform',
    default: 'Authentification | EduPlattform',
  },
  description: 'Connectez-vous à EduPlattform — La plateforme d\'apprentissage panafricaine.',
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
      {children}
    </div>
  )
}