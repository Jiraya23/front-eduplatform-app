'use client';

import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';

// ── FAQ mock data ────────────────────────────────────────────
const faqs = [
  {
    id: 1,
    question: 'How do I access my course materials?',
    answer:
      "Once enrolled, all your materials are accessible via the 'Dashboard' link in your profile. You can download resources for offline viewing through our mobile app.",
  },
  {
    id: 2,
    question: 'Are the certificates globally recognized?',
    answer:
      'Our certifications are co-signed by leading industry partners and are designed to meet international standards for technical and soft-skill proficiency.',
  },
  {
    id: 3,
    question: 'Can I request a refund?',
    answer:
      "We offer a 7-day 'No Questions Asked' refund policy if you haven't completed more than 20% of the course content.",
  },
  {
    id: 4,
    question: 'Do you offer corporate training?',
    answer:
      "Yes, we have specialized 'Team Growth' plans for organizations looking to upskill their employees at scale with custom learning paths.",
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
            Frequently Asked Questions
          </h2>
          <p className="text-sm" style={{ color: '#3d4a3d' }}>
            Quick answers to common questions about our platform and methodology.
          </p>
        </div>

        <motion.button
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
        >
          View Help Center
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
