'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { heroImage } from '@/lib/mockData';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
        <div className="absolute inset-0 bg-linear-to-l from-transparent via-[#f8f9ff]/80 to-[#f8f9ff] z-10"></div>
        <Image
          src={heroImage}
          alt="Professional workspace"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20">
        <motion.div
          className="max-w-2xl space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs tracking-wider uppercase"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Rejoignez l&apos;élite académique
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="font-headline font-extrabold text-5xl lg:text-7xl leading-[1.1] text-balance tracking-tight"
          >
            Propulsez votre <span className="text-primary italic">avenir</span> par le savoir.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-on-surface leading-relaxed max-w-lg"
          >
            La plateforme panafricaine qui connecte vos ambitions aux meilleures opportunités d&apos;apprentissage et de mentorat.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-5"
          >
            <Button href="/signup">Commencer gratuitement</Button>
            <Button href="/formations" variant="outline" className="flex items-center gap-3">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explorer le catalogue
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 pt-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-4 border-white bg-linear-to-br from-primary to-primary-container"
                ></div>
              ))}
            </div>
            <p className="text-sm font-medium text-on-surface">
              <span className="font-bold">4.8/5</span> basé sur 2,500+ avis
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Pattern Decor */}
      <div className="absolute bottom-0 left-0 w-64 h-64 pattern-african -z-10"></div>
    </section>
  );
}
