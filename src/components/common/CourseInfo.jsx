'use client';

import { motion } from 'framer-motion';

export function CourseInfo({ course }) {
  const items = [
    { label: 'Durée', value: course.duration },
    { label: 'Niveau', value: course.level },
    { label: 'Certificat', value: 'Reconnu par l\'État' },
    { label: 'Langue', value: 'Français' }
  ];

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
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="py-20 px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="text-center"
          >
            <p className="text-[#121c2a]/60 text-sm font-medium mb-2">{item.label}</p>
            <p className="font-['Inter'] text-2xl font-bold text-[#121c2a]">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
