// ════════════════════════════════════════
// 📄 components/auth/LoginForm.jsx
// ════════════════════════════════════════
'use client'

import { useState }          from 'react'
import Link                  from 'next/link'
import Image                 from 'next/image'
import { useRouter }         from 'next/navigation'
import { motion }            from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react'

export default function LoginForm() {
  const router = useRouter()

  // ── État du formulaire ─────────────────────────
  const [activeTab,   setActiveTab]   = useState('login')
  const [showPass,    setShowPass]    = useState(false)
  const [remember,    setRemember]    = useState(false)
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [emailFocus,  setEmailFocus]  = useState(false)
  const [passFocus,   setPassFocus]   = useState(false)

  // ── Soumission ────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO : intégrer l'auth réelle (NextAuth / Supabase)
    // Les admins seront redirigés depuis le middleware selon leur rôle
    router.push('/formations')
  }

  return (
    <motion.div
      className="p-8 md:p-16 flex flex-col justify-center bg-white"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >

      {/* ── Logo mobile uniquement ── */}
      <div className="flex items-center gap-2 justify-center lg:hidden mb-8">
        <GraduationCap size={28} strokeWidth={2} className="text-primary" />
        <span
          className="font-bold text-xl text-primary"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          EduPlattform
        </span>
      </div>

      {/* ── En-tête ── */}
      <header className="mb-10">
        <h1
          className="text-3xl font-bold text-[#121c2a] mb-2"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
        >
          Welcome Back
        </h1>
        <p className="text-[#121c2a]/60 font-medium text-sm">
          Continue your journey of excellence.
        </p>
      </header>

      {/* ── Tabs Login / Sign Up ── */}
      <nav
        className="flex p-1 bg-[#eff4ff] rounded-xl mb-8 w-full max-w-sm"
        aria-label="Choix entre connexion et inscription"
      >
        {[
          { id: 'login',  label: 'Login',   href: '/login' },
          { id: 'signup', label: 'Sign Up',  href: '/signup' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              if (tab.id === 'signup') router.push('/signup')
            }}
            aria-pressed={activeTab === tab.id}
            className={`
              flex-1 py-2.5 px-4 text-sm rounded-lg transition-all duration-300
              ${activeTab === tab.id
                ? 'bg-white text-primary font-bold shadow-sm'
                : 'text-[#121c2a]/60 font-semibold hover:text-[#121c2a]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ── Formulaire ── */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-bold text-[#121c2a]/60 uppercase tracking-wider block"
          >
            Email Address
          </label>
          <div
            className="relative flex items-center bg-[#f8f9ff] rounded-xl transition-all duration-200"
            style={{
              borderBottom: emailFocus ? '2px solid #006e2f' : '2px solid transparent',
            }}
          >
            <Mail
              size={18}
              strokeWidth={1.5}
              className="absolute left-4 text-[#121c2a]/40"
              aria-hidden="true"
            />
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              placeholder="scholar@eduplattform.com"
              autoComplete="email"
              required
              className="
                w-full bg-transparent py-4 pl-12 pr-4
                text-[#121c2a] placeholder:text-[#121c2a]/30
                font-medium text-sm focus:outline-none border-none
              "
            />
          </div>
        </div>

        {/* Mot de passe */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="text-xs font-bold text-[#121c2a]/60 uppercase tracking-wider"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-primary hover:text-[#22c55e] transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <div
            className="relative flex items-center bg-[#f8f9ff] rounded-xl transition-all duration-200"
            style={{
              borderBottom: passFocus ? '2px solid #006e2f' : '2px solid transparent',
            }}
          >
            <Lock
              size={18}
              strokeWidth={1.5}
              className="absolute left-4 text-[#121c2a]/40"
              aria-hidden="true"
            />
            <input
              id="password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="
                w-full bg-transparent py-4 pl-12 pr-12
                text-[#121c2a] placeholder:text-[#121c2a]/30
                font-medium text-sm focus:outline-none border-none
              "
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              aria-label={showPass ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              className="absolute right-4 text-[#121c2a]/40 hover:text-primary transition-colors"
            >
              {showPass
                ? <EyeOff size={18} strokeWidth={1.5} />
                : <Eye    size={18} strokeWidth={1.5} />
              }
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-3">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={e => setRemember(e.target.checked)}
            className="w-5 h-5 rounded accent-primary cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-sm font-semibold text-[#121c2a]/60 cursor-pointer"
          >
            Keep me signed in
          </label>
        </div>

        {/* CTA principal */}
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-full py-4 rounded-xl text-white font-bold text-base transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #006e2f, #22c55e)',
            boxShadow: '0 8px 24px rgba(0,110,47,0.25)',
          }}
        >
          Sign In to Dashboard
        </motion.button>

      </form>

      {/* ── Séparateur ── */}
      <div className="mt-8 relative flex items-center">
        <div className="flex-grow border-t border-[#d9e3f6]" aria-hidden="true" />
        <span className="flex-shrink mx-4 text-xs font-bold text-on-surface/40 uppercase tracking-widest">
          Or continue with
        </span>
        <div className="flex-grow border-t border-[#d9e3f6]" aria-hidden="true" />
      </div>

      {/* ── Boutons OAuth ── */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          type="button"
          aria-label="Se connecter avec Google"
          className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-[#eff4ff] text-on-surface font-semibold text-sm hover:bg-[#dee9fc] transition-colors"
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKoa5nMMopa-5Wuac--jXoiGpObDFQFWFb_41Zl24OoNSaS6GhlLK8SUjUr8YfYDjWmvk_HYQ7flYadk4xuiipxa6nRB5jYRXKh1l515tTnEzYD0QNJZm4EmMpZeIhyK9lMwftMQ4RRNAbZuQh-xp_9B77jh_h2XqPtg5jy9eDKjGzeT6rU9korGmVVoCuxObyHUEkINY2QL1NyPlu301wXabzcuZnx-Sd-SleR92J8N-pZ9MBzb16AlmQoseZLkPJSyo25cjtsEQ"
            alt="Logo Google"
            width={20}
            height={20}
          />
          Google
        </button>
        <button
          type="button"
          aria-label="Se connecter avec Facebook"
          className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-[#eff4ff] text-on-surface font-semibold text-sm hover:bg-[#dee9fc] transition-colors"
        >
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2mAd_EQIxkHDQ3zUA2mr2bMY64qLhgccCvlF163WVmzHguCEMuSqLI_afwTG5KfIIRc1aZUAl2AOxWv-5z6v5Y2dmcENwFet4KwWvOk5E7IUuTUdS2ilQkOtGjqAs01XDMHNXrrtDj2mO6ZAMHmzjVAKZPstk3y47sqlOLrQTo8Qs5FjG0odLsFFmqEroYWCZXFSZBDWTGY11l2Gy5EL3lY5AuKh9S7Id8lQhtK03W1yCQB4KvpnJZGzZixkay8dsPjKRyEFXjTE"
            alt="Logo Facebook"
            width={20}
            height={20}
          />
          Facebook
        </button>
      </div>

      {/* ── Lien inscription ── */}
      <p className="mt-10 text-center text-sm font-medium text-on-surface/60">
        New to the platform?{' '}
        <Link
          href="/signup"
          className="text-primary font-bold ml-1 hover:underline underline-offset-4 transition-colors"
        >
          Create your free account
        </Link>
      </p>

    </motion.div>
  )
}