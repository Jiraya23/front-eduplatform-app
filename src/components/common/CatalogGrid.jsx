'use client';

import { motion } from 'framer-motion';
import { CatalogCourseCard } from '../formation/CatalogCourseCard';

export function CatalogGrid({ courses }) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={itemVariants}>
          <CatalogCourseCard course={course} />
        </motion.div>
      ))}
    </motion.div>
  );
}
