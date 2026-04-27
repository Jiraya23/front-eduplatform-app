'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function CourseDetailCTA() {
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
          <Link href="/signup" className="bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white px-10 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-[#006e2f]/20 transition-all hover:-translate-y-1">
            Commencer maintenant
          </Link>
          <button className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">
            Consulter le syllabus
          </button>
        </div>
      </div>
    </motion.section>
  );
}
