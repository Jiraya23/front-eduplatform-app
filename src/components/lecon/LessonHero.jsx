'use client';

import { motion } from 'framer-motion';

// Section Header avec Module et Titre - sans progression
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
      className="mb-8"
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
    </motion.div>
  );
}
