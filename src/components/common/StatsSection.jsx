'use client';

import { motion } from 'framer-motion';

export function StatsSection() {
  const stats = [
    { value: '10k+', label: 'Étudiants Actifs' },
    { value: '50+', label: 'Experts Mentors' },
    { value: '95%', label: 'Taux de Réussite' },
    { value: '200+', label: 'Cours Certifiants' }
  ];

  return (
    <section className="py-12 border-b border-surface-container-highest bg-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="space-y-1"
            >
              <div className="text-4xl font-extrabold font-headline text-on-surface">
                {stat.value === '10k+' ? <span className="text-primary">{stat.value}</span> : stat.value}
              </div>
              <div className="text-sm font-semibold uppercase tracking-widest text-on-surface">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
