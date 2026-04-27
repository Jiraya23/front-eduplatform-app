'use client';

import { motion } from 'framer-motion';

export function LearningObjectives({ objectives }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: false, amount: 0.2 }}
      className="py-20 px-6 max-w-7xl mx-auto"
    >
      <motion.h2
        variants={itemVariants}
        className="font-['Inter'] text-3xl font-bold text-[#121c2a] mb-12 text-center"
      >
        Learning Objectives
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {objectives.map((objective, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#006e2f] flex-shrink-0 flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-[#121c2a]/70 leading-relaxed">{objective}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
