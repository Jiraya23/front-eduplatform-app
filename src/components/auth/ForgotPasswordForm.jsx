// ════════════════════════════════════════
// 📄 components/auth/ForgotPasswordForm.jsx
// ════════════════════════════════════════
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, LockKeyhole } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <div className="w-full mt-10 max-w-md z-10">

      {/* ── Card ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-4xl px-10 py-9 shadow-[0_32px_64px_-12px_rgba(18,28,42,0.08)] relative overflow-hidden"
      >
        {/* ── Motif géométrique coin supérieur droit ─── */}
        <div
          className="absolute top-0 right-0 w-36 h-36 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23006e2f' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-6">

          {/* ── Icône ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="w-14 h-14 bg-[#eff4ff] rounded-2xl flex items-center justify-center text-primary"
          >
            <LockKeyhole size={26} strokeWidth={1.6} aria-hidden="true" />
          </motion.div>

          {/* ── Titre + description ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-col gap-2"
          >
            <h1 className="font-headline text-2xl font-bold tracking-tight text-on-surface">
              Forgot Password?
            </h1>
            <p className="text-slate-500 leading-relaxed text-sm">
              No worries, it happens. Enter the email address associated with
              your account and we&apos;ll send you a recovery link.
            </p>
          </motion.div>

          {/* ── Formulaire / Succès ───────────────────────── */}
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22 }}
            >
              {/* Input email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="scholar@eduplattform.com"
                    className="w-full px-5 py-4 pr-12 bg-[#eff4ff] rounded-xl text-sm text-on-surface
                               placeholder:text-slate-400 outline-none border-b-2 border-transparent
                               focus:border-primary transition-all"
                  />
                  <Mail
                    size={17}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Bouton submit */}
              <motion.button
                type="submit"
                whileHover={{ y: -2, boxShadow: "0 20px 48px rgba(0,110,47,0.28)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full py-4 rounded-2xl font-semibold text-white text-sm flex items-center justify-center gap-2
                           shadow-lg shadow-primary/20"
                style={{ background: "linear-gradient(135deg, #006e2f, #22c55e)" }}
              >
                Send Reset Link
                <ArrowRight size={17} aria-hidden="true" />
              </motion.button>
            </motion.form>

          ) : (

            /* ── État succès ──────────────────────────────── */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-4 text-center flex flex-col items-center gap-3"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/20"
                style={{ background: "linear-gradient(135deg, #006e2f, #22c55e)" }}
              >
                <Mail size={22} className="text-white" aria-hidden="true" />
              </div>
              <p className="font-headline font-bold text-on-surface">Check your inbox!</p>
              <p className="text-sm text-slate-500">
                Recovery link sent to{" "}
                <span className="font-semibold text-primary">{email}</span>
              </p>
            </motion.div>
          )}

          {/* ── Back to Sign In ───────────────────────────── */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <Link
              href="/login"
              className="group flex items-center gap-2 text-slate-500 hover:text-primary font-medium text-sm transition-colors"
            >
              <ArrowLeft
                size={15}
                className="group-hover:-translate-x-1 transition-transform"
                aria-hidden="true"
              />
              Back to Sign In
            </Link>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Support hint ──────────────────────────────────────── */}
      <motion.p
        className="mt-6 text-center text-sm text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        Having trouble?{" "}
        <Link href="/contact" className="text-primary font-semibold hover:underline">
          Contact our support oasis.
        </Link>
      </motion.p>

    </div>
  );
}