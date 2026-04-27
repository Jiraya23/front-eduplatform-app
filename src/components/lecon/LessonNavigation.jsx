'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

// Boutons de navigation entre leçons
export default function LessonNavigation({ prevId, nextId, quizId }) {
  return (
    <motion.div
      className="mt-8 flex flex-wrap items-center justify-between gap-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
    >
      {/* Boutons précédent/suivant */}
      <div className="flex gap-4">
        {prevId ? (
          <Link
            href={`/lecons/${prevId}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft size={16} />
            Précédent
          </Link>
        ) : (
          <button disabled className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface/30 font-semibold cursor-not-allowed">
            <ArrowLeft size={16} />
            Précédent
          </button>
        )}

        {nextId ? (
          <Link
            href={`/lecons/${nextId}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:-translate-y-0.5 transition-all"
          >
            Suivant
            <ArrowRight size={16} />
          </Link>
        ) : (
          <button disabled className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface/30 font-semibold cursor-not-allowed">
            Suivant
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Bouton terminer le module → quiz */}
      {quizId ? (
        <motion.div whileHover={{ y: -2 }}>
          <Link
            href={`/quiz/${quizId}`}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <CheckCircle size={18} />
            Terminer le module
          </Link>
        </motion.div>
      ) : (
        <motion.button
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          whileHover={{ y: -2 }}
        >
          <CheckCircle size={18} />
          Marquer comme terminée
        </motion.button>
      )}
    </motion.div>
  );
}
