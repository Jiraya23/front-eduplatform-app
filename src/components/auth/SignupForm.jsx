// ════════════════════════════════════════
// 📄 components/auth/SignupForm.jsx
// ════════════════════════════════════════
'use client'

import { useState }   from 'react'
import Link           from 'next/link'
import { useRouter }  from 'next/navigation'
import { motion }     from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { useAuthContext } from '@/context/AuthContext'
import { Spinner }        from '@/components/ui/Spinner'

// ── Champ de saisie réutilisable ──────────────────
function InputField({ id, label, type = 'text', placeholder, value, onChange, error }) {
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
        className={`w-full px-5 py-4 bg-[#eff4ff] rounded-xl text-sm text-[#121c2a]
          placeholder:text-[#121c2a]/30 font-medium focus:outline-none border-none
          transition-all duration-200 ${error ? 'border-red-500' : ''}`}
        style={{
          borderBottom: focused ? '2px solid #006e2f' : '2px solid transparent',
        }}
      />
      {error && (
        <div className="text-red-500 text-xs mt-1">
          <AlertCircle className="inline-block mr-1" size={12} />
          {error}
        </div>
      )}
    </div>
  )
}

export default function SignupForm() {
  const router          = useRouter()
  const { register: apiRegister } = useAuthContext()

  // ── État du formulaire ─────────────────────────
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [agreed,    setAgreed]    = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  // ── Soumission ────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    setLoading(true)
    try {
      await apiRegister({ first_name: firstName, last_name: lastName, email, password, password_confirmation: password })
      router.push('/formations')
    } catch (err) {
      if (err.status === 422 && err.errors) {
        setFieldErrors(err.errors)
      } else {
        setError(err.message || 'Une erreur est survenue')
      }
    } finally {
      setLoading(false)
    }
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

      {/* ── Message d'erreur global ── */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 font-medium mb-4"
        >
          <AlertCircle size={16} strokeWidth={2} className="shrink-0" />
          {error}
        </motion.div>
      )}

      {/* ── Formulaire ── */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="firstName"
            label="First name"
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            error={fieldErrors.first_name?.[0]}
          />
          <InputField
            id="lastName"
            label="Last name"
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            error={fieldErrors.last_name?.[0]}
          />
        </div>

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={fieldErrors.email?.[0]}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={fieldErrors.password?.[0]}
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
          disabled={loading || !agreed}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #006e2f, #22c55e)',
            boxShadow: '0 12px 32px rgba(0,110,47,0.25)',
          }}
        >
          {loading ? <><Spinner size="sm" /> Création...</> : 'Create Account'}
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