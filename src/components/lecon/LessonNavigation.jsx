'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';

// Boutons de navigation entre leçons
export default function LessonNavigation({ prevId, nextId, quizId, leconId, onMarkComplete, completing, completed }) {
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

        {nextId && completed ? (
          <Link
            href={`/lecons/${nextId}`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:-translate-y-0.5 transition-all"
          >
            Suivant
            <ArrowRight size={16} />
          </Link>
        ) : (
          <button disabled className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface/30 font-semibold cursor-not-allowed" title={!completed ? 'Terminez cette leçon d\'abord' : 'Dernière leçon'}>
            Suivant
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Bouton terminer le module → quiz */}
      {quizId ? (
        <motion.div whileHover={{ y: -2 }}>
          <Link
            href={`/quiz/${leconId}`}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <CheckCircle size={18} />
            Terminer le module
          </Link>
        </motion.div>
      ) : (
        <motion.button
          onClick={onMarkComplete}
          disabled={completing || completed}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={{ y: -2 }}
        >
          {completing
            ? <><Spinner size="sm" /> En cours...</>
            : completed
              ? <><CheckCircle size={18} /> Terminée ✓</>
              : <><CheckCircle size={18} /> Marquer comme terminée</>
          }
        </motion.button>
      )}
    </motion.div>
  );
}
