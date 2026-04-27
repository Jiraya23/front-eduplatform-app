'use client';

import { motion } from 'framer-motion';
import { ContactHero } from '@/components/common/ContactHero';
import { ContactInfoCards } from '@/components/common/ContactInfoCards';
import { ContactForm } from '@/components/common/ContactForm';
import { FAQSection } from '@/components/common/FAQSection';

// ── Metadata (handled via layout since this is a client component) ──

// ── ContactPage ──────────────────────────────────────────────
export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        {/* ── Hero Section ── */}
        <ContactHero />

        {/* ── Bento: Info Cards + Contact Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ContactInfoCards />
          <ContactForm />
        </div>

        {/* ── FAQ Section ── */}
        <FAQSection />
      </main>
    </motion.div>
  );
}
