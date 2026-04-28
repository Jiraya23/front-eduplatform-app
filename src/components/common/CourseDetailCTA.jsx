'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Spinner } from '@/components/ui/Spinner';

export function CourseDetailCTA({ isAuthenticated, onEnroll, enrolling }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="py-24 px-6"
    >
      <div className="max-w-3xl mx-auto bg-[#121c2a] text-white rounded-3xl p-12 text-center space-y-8">
        <h2 className="font-['Inter'] text-4xl font-bold">
          Prêt à transformer votre carrière ?
        </h2>
        <p className="text-lg text-white/70">
          Rejoignez une communauté de 5,000+ apprenants passionnés et boostez vos compétences dès aujourd'hui.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={onEnroll}
            disabled={enrolling}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-[#006e2f]/20 transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {enrolling
              ? <><Spinner size="sm" /> Inscription...</>
              : isAuthenticated ? 'Commencer maintenant' : "S'inscrire gratuitement"
            }
          </button>
          <Link href="/formations" className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all text-center">
            Voir tout le catalogue
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
