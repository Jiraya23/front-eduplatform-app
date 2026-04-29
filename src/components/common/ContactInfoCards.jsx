'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

// ── Stagger variants ─────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── ContactInfoCards ─────────────────────────────────────────
export function ContactInfoCards() {
  return (
    <motion.div
      className="lg:col-span-4 flex flex-col gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* ── Email Support ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="p-8 bg-surface-container-low rounded-2xl relative overflow-hidden"
      >
        {/* African geometric mask — top-right corner */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 translate-x-8 -translate-y-8 pointer-events-none">
          <svg viewBox="0 0 100 100" className="fill-primary w-full h-full">
            <path d="M0,0 L100,0 L100,100 Z" />
          </svg>
        </div>

        <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(0,110,47,0.10)', color: '#006e2f' }}>
          <Mail strokeWidth={1.5} size={22} />
        </div>
        <h3 className="text-xl font-headline font-semibold mb-2 text-on-surface">
          Support par Email
        </h3>
        <p className="text-sm mb-4" style={{ color: '#3d4a3d' }}>
          Délai de réponse : sous 24 heures
        </p>
        <a
          href="mailto:support@eduplattform.com"
          className="text-primary font-semibold hover:underline text-sm"
        >
          support@eduplattform.com
        </a>
      </motion.div>

      {/* ── Direct Hotline ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="p-8 bg-surface-container-low rounded-2xl relative overflow-hidden"
      >
        {/* African geometric mask */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 translate-x-8 -translate-y-8 pointer-events-none">
          <svg viewBox="0 0 100 100" className="fill-secondary w-full h-full">
            <path d="M0,100 L100,0 L100,100 Z" />
          </svg>
        </div>

        <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(120,90,0,0.10)', color: '#785a00' }}>
          <Phone strokeWidth={1.5} size={22} />
        </div>
        <h3 className="text-xl font-headline font-semibold mb-2 text-on-surface">
          Ligne Directe
        </h3>
        <p className="text-sm mb-4" style={{ color: '#3d4a3d' }}>
          Lun - Ven, 8h à 18h GMT+1
        </p>
        <a
          href="tel:+237600000000"
          className="font-semibold hover:underline text-sm"
          style={{ color: '#785a00' }}
        >
          +237 600 000 000
        </a>
      </motion.div>

      {/* ── Campus Presence ── */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="p-8 bg-primary text-white rounded-2xl flex flex-col justify-between"
        style={{ minHeight: '200px' }}
      >
        <div>
          <h3 className="text-xl font-headline font-semibold mb-2">
            Présence sur Campus
          </h3>
          <p className="text-sm" style={{ opacity: 0.8 }}>
            Visitez notre principal hub d'innovation à Douala.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-6 font-semibold text-sm">
          <MapPin strokeWidth={1.5} size={18} />
          <span>Akwa, Douala, Cameroon</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
