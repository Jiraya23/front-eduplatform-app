// ════════════════════════════════════════
// 📄 components/common/NotFoundContent.jsx
// ════════════════════════════════════════
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, BookOpen, Headphones, History } from "lucide-react";

// ── Cartes d'aide ───────────────────────────────────────────────
const cards = [
  {
    id: 1,
    icon: BookOpen,
    title: "Help Center",
    description: "Find guides and tutorials.",
    href: "#",
  },
  {
    id: 2,
    icon: Headphones,
    title: "Support",
    description: "Talk to our learning advisors.",
    href: "#",
  },
  {
    id: 3,
    icon: History,
    title: "Recent Courses",
    description: "Resume your learning journey.",
    href: "/formations",
  },
];

// ── Variants ────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ── Composant principal ─────────────────────────────────────────
export default function NotFoundContent() {
  return (
    <div className="relative z-10 text-center max-w-2xl mx-auto w-full flex flex-col items-center">
      {/* ── 404 géant ────────────────────────────────────────── */}
      <motion.div
        className="relative inline-block mb-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="absolute -inset- rounded-full blur-2xl pointer-events-none"
          style={{ background: "rgba(34,197,94,0.10)" }}
          aria-hidden="true"
        />
        <h1
          className="relative font-headline font-extrabold leading-none tracking-tighter text-transparent bg-clip-text select-none"
          style={{
            fontSize: "clamp(5rem, 16vw, 9rem)",
            backgroundImage:
              "linear-gradient(180deg, #006e2f 0%, rgba(6,78,59,0.30) 100%)",
          }}
        >
          404
        </h1>
        {/* Pattern africain sur le 404 */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          aria-hidden="true"
          style={{
            maskImage:
              "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            maskSize: "20px 20px",
            WebkitMaskImage:
              "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
            WebkitMaskSize: "20px 20px",
            backgroundImage:
              "repeating-linear-gradient(45deg, #006e2f 0, #006e2f 1px, transparent 0, transparent 50%)",
            backgroundSize: "8px 8px",
          }}
        />
      </motion.div>

      {/* ── Titre ────────────────────────────────────────────── */}
      <motion.h2
        className="text-2xl md:text-3xl font-headline font-bold text-on-surface tracking-tight mb-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      >
        Classroom Not Found 💔
      </motion.h2>

      {/* ── Description ──────────────────────────────────────── */}
      <motion.p
        className="text-base text-slate-500 max-w-md mx-auto leading-relaxed mb-7"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
      >
        It looks like the knowledge you&apos;re seeking has moved to a new
        oasis. Don&apos;t worry, even the best scholars get lost sometimes.
      </motion.p>

      {/* ── CTAs ─────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-white text-sm shadow-lg shadow-primary/20 transition-all"
            style={{ background: "linear-gradient(135deg, #006e2f, #22c55e)" }}
          >
            <Home size={16} aria-hidden="true" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-on-surface text-sm bg-[#dee9fc] hover:bg-[#d9e3f6] transition-colors"
          >
            <Search size={16} aria-hidden="true" />
            Browse Courses
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Cartes bento ─────────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-3 gap-3 w-full"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {cards.map(({ id, icon: Icon, title, description, href }) => (
          <motion.div key={id} variants={item}>
            <Link href={href}>
              <motion.article
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-4 bg-white rounded-2xl shadow-[0_8px_32px_rgba(18,28,42,0.06)]
                           hover:shadow-[0_16px_40px_rgba(18,28,42,0.10)] transition-shadow text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#f0fdf4] flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                  <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="font-headline font-semibold text-on-surface text-sm mb-0.5">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {description}
                </p>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
