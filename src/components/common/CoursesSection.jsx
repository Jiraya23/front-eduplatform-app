'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CatalogCourseCard } from '@/components/formation/CatalogCourseCard';
import { Spinner } from '@/components/ui/Spinner';
import { useFormations } from '@/hooks/useFormations';

function normalizeFormation(f) {
  return {
    id:          f.id,
    title:       f.titre       ?? f.title       ?? 'Sans titre',
    description: f.description ?? '',
    image:       f.image       ?? f.image_url   ?? 'https://placehold.co/400x250/eff4ff/006e2f?text=Formation',
    level:       f.niveau      ?? f.level       ?? '',
    duration:    f.duree       ?? f.duration    ?? '',
    price:       f.prix != null ? (f.prix === 0 ? 'FREE' : `${f.prix} FCFA`) : 'FREE',
    badge:       f.badge       ?? (f.prix === 0 ? 'FREE' : 'PREMIUM'),
  };
}

export function CoursesSection() {
  const { formations, loading } = useFormations({ per_page: 3 });

  const courses = formations.slice(0, 3).map(normalizeFormation);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  // Rien à afficher si l'API ne retourne rien (et pas en chargement)
  if (!loading && courses.length === 0) return null;

  return (
    <section className="py-32 bg-surface-container">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20"
        >
          <div className="max-w-xl">
            <h2 className="font-headline font-extrabold text-4xl mb-6">Programmes d&apos;Excellence</h2>
            <p className="text-on-surface text-lg">Nos formations les plus plébiscitées pour transformer votre carrière en un temps record.</p>
          </div>
          <Link href="/formations" className="group flex items-center gap-2 font-bold text-primary hover:text-primary/80 transition-colors">
            Voir tout le catalogue
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {courses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <CatalogCourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
