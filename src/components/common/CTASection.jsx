'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-on-surface rounded-3xl p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Gradient Blobs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>

          <div className="relative z-10 space-y-10">
            <h2 className="font-headline font-extrabold text-4xl lg:text-6xl leading-tight">
              Prêt à propulser <br className="hidden md:block" />votre carrière ?
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
              Rejoignez des milliers d&apos;étudiants qui façonnent déjà leur futur sur EduPlattform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/signup" className="bg-primary-container hover:bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95">
                S&apos;inscrire maintenant
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-12 py-5 rounded-2xl font-bold text-lg backdrop-blur-md transition-all">
                Nous contacter
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
