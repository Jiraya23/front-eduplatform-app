'use client';

import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';

// ── FAQ mock data ────────────────────────────────────────────
const faqs = [
  {
    id: 1,
    question: 'Comment accéder à mes supports de cours ?',
    answer:
      "Une fois inscrit, tous vos supports sont accessibles via le lien 'Tableau de bord' dans votre profil. Vous pouvez télécharger les ressources pour une consultation hors ligne via notre application mobile.",
  },
  {
    id: 2,
    question: 'Les certificats sont-ils reconnus à l\'international ?',
    answer:
      'Nos certifications sont co-signées par des partenaires industriels de premier plan et sont conçues pour répondre aux normes internationales de compétences techniques et humaines.',
  },
  {
    id: 3,
    question: 'Puis-je demander un remboursement ?',
    answer:
      "Nous offrons une politique de remboursement de 7 jours sans conditions si vous n'avez pas complété plus de 20% du contenu du cours.",
  },
  {
    id: 4,
    question: 'Proposez-vous des formations en entreprise ?',
    answer:
      "Oui, nous avons des plans 'Croissance d'équipe' spécialisés pour les organisations souhaitant améliorer les compétences de leurs employés à grande échelle avec des parcours personnalisés.",
  },
];

// ── Stagger variants ─────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── FAQSection ───────────────────────────────────────────────
export function FAQSection() {
  return (
    <section aria-label="Frequently Asked Questions" className="mt-32">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
      >
        <div className="max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Questions Fréquemment Posées
          </h2>
          <p className="text-sm" style={{ color: '#3d4a3d' }}>
            Réponses rapides aux questions courantes sur notre plateforme et notre méthodologie.
          </p>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
        >
          Voir le centre d'aide
          <ArrowRight strokeWidth={1.5} size={18} />
        </motion.button>
      </motion.div>

      {/* ── FAQ Grid ── */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {faqs.map((faq) => (
          <motion.article
            key={faq.id}
            variants={itemVariants}
            className="group pb-8"
            style={{
              borderBottom: '1px solid rgba(188,203,185,0.30)',
            }}
          >
            <h4
              className="text-lg font-headline font-semibold mb-3 flex justify-between items-center text-on-surface group-hover:text-primary transition-colors"
            >
              {faq.question}
              <Plus
                strokeWidth={1.5}
                size={20}
                className="shrink-0 ml-4"
                style={{ color: '#22c55e' }}
              />
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: '#3d4a3d' }}>
              {faq.answer}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
