'use client';

import { motion } from 'framer-motion';

// Section Header avec Module, Titre et Progress Bar
export default function LessonHero({ lesson }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div
      className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Titre et module */}
      <motion.div className="space-y-1" variants={itemVariants}>
        <span className="text-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {lesson.module}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
          {lesson.title}
        </h1>
      </motion.div>

      {/* Progress Tracker */}
      <motion.div className="w-full md:w-80 space-y-2" variants={itemVariants}>
        <div className="flex justify-between items-center text-sm font-semibold text-on-surface/60">
          <span>Course Progress</span>
          <span className="text-primary">{lesson.progress}%</span>
        </div>
        <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${lesson.progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
