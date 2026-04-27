// ════════════════════════════════════════
// 📄 components/auth/SignupForm.jsx
// ════════════════════════════════════════
'use client'

import { useState }   from 'react'
import Link           from 'next/link'
import { useRouter }  from 'next/navigation'
import { motion }     from 'framer-motion'

// ── Champ de saisie réutilisable ──────────────────
function InputField({ id, label, type = 'text', placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-[#121c2a]/60 ml-1 uppercase tracking-wider"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        autoComplete={type === 'email' ? 'email' : type === 'password' ? 'new-password' : 'name'}
        required
        className="w-full px-5 py-4 bg-[#eff4ff] rounded-xl text-sm text-[#121c2a]
          placeholder:text-[#121c2a]/30 font-medium focus:outline-none border-none
          transition-all duration-200"
        style={{
          borderBottom: focused ? '2px solid #006e2f' : '2px solid transparent',
        }}
      />
    </div>
  )
}

export default function SignupForm() {
  const router = useRouter()

  // ── État du formulaire ─────────────────────────
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [agreed,   setAgreed]   = useState(false)

  // ── Soumission ────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO : intégrer l'auth réelle (NextAuth / Supabase)
    router.push('/login')
  }

  return (
    <motion.div
      className="p-8 md:p-16 flex flex-col justify-center h-full"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >

      {/* ── En-tête ── */}
      <header className="mb-10">
        <span
          className="inline-block py-1 px-3 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4"
          style={{ background: '#ffdf9a', color: '#251a00' }}
        >
          Start Your Journey
        </span>
        <h1
          className="text-4xl md:text-5xl font-extrabold text-[#121c2a] tracking-tight mb-4"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
        >
          Create your account
        </h1>
        <p className="text-[#121c2a]/60 leading-relaxed text-sm">
          Join a community of elevated scholars across the continent and unlock your potential.
        </p>
      </header>

      {/* ── Formulaire ── */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        <InputField
          id="fullname"
          label="Full name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* ── Checkbox CGU ── */}
        <div className="flex items-start gap-3 py-2">
          <input
            id="agree"
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            required
            className="w-5 h-5 rounded accent-primary cursor-pointer mt-0.5 flex-shrink-0"
          />
          <label
            htmlFor="agree"
            className="text-sm text-[#121c2a]/60 leading-tight cursor-pointer"
          >
            I agree to the{' '}
            <Link href="/terms" className="text-primary font-semibold hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary font-semibold hover:underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {/* ── CTA ── */}
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #006e2f, #22c55e)',
            boxShadow: '0 12px 32px rgba(0,110,47,0.25)',
          }}
        >
          Create Account
        </motion.button>

      </form>

      {/* ── Lien connexion ── */}
      <div className="mt-8 pt-8 text-center"
        style={{ borderTop: '1px solid #dee9fc' }}
      >
        <p className="text-[#121c2a]/60 text-sm">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline underline-offset-4 transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>

    </motion.div>
  )
}