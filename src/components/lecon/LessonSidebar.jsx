'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, FolderOpen } from 'lucide-react';

// Sidebar sticky avec overview, resources et next lesson
export default function LessonSidebar({ lesson }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div
      className="space-y-8 sticky top-28"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Lesson Overview */}
      <motion.div
        className="bg-surface-container-lowest p-8 rounded-3xl shadow-[0_32px_64px_-12px_rgba(18,28,42,0.06)] relative overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none" />
        <div className="flex items-center gap-2 mb-6">
          <FileText size={20} className="text-[#006e2f]" />
          <h3 className="text-xl font-bold text-on-surface">Lesson Overview</h3>
        </div>
        <div className="space-y-4 text-on-surface/80 leading-relaxed text-[0.9375rem]">
          <p>{lesson.overview}</p>
          <ul className="space-y-3 list-none p-0">
            {lesson.overviewObjectives?.map((point, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-[#006e2f] mt-1">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Resources & Materials */}
      <motion.div
        className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
          <FolderOpen size={20} className="text-[#006e2f]" />
          Course Resources
        </h3>
        <div className="space-y-3">
          {lesson.resources?.length === 0 && <p className="text-sm text-on-surface/50">Aucune ressource disponible.</p>}
          {lesson.resources?.map((resource, idx) => (
            <motion.a
              key={idx}
              href="#"
              className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-lowest hover:bg-white transition-colors group cursor-pointer"
              whileHover={{ x: 4 }}
              variants={itemVariants}
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#006e2f]" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">{resource.title}</span>
                  <span className="text-[0.7rem] text-on-surface/50">
                    {resource.size} • {resource.type?.toUpperCase()}
                  </span>
                </div>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#006e2f] text-lg">↓</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Next Lesson Teaser */}
      <motion.div className="group" variants={itemVariants}>
        {lesson.nextLesson?.id ? (
          <Link href={`/lecons/${lesson.nextLesson.id}`}>
            <motion.div
              className="p-6 rounded-3xl bg-on-surface text-white relative overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative z-10">
                <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#22c55e]">
                  Up Next
                </span>
                <h4 className="text-lg font-bold mt-1">{lesson.nextLesson.title}</h4>
                <p className="text-xs text-white/60 mt-2">
                  {lesson.nextLesson.number} • {lesson.nextLesson.duration}
                </p>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/3 bg-[#006e2f]/20 blur-3xl rounded-full translate-x-10"></div>
              <span className="absolute bottom-6 right-6 group-hover:translate-x-2 transition-transform text-white text-xl">→</span>
            </motion.div>
          </Link>
        ) : (
          <motion.div
            className="p-6 rounded-3xl bg-on-surface/50 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-white/40">
                Fin du module
              </span>
              <h4 className="text-lg font-bold mt-1 text-white/60">{lesson.nextLesson.title}</h4>
              <p className="text-xs text-white/40 mt-2">
                {lesson.nextLesson.number} • {lesson.nextLesson.duration}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
