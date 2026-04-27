'use client';

import { motion } from 'framer-motion';

export function CatalogHero() {
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
    <motion.header
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-16"
    >
      <motion.h1
        variants={itemVariants}
        className="font-['Inter'] text-[3.5rem] font-bold tracking-tight text-[#121c2a] leading-none mb-6"
      >
        Discover Your <span className="bg-gradient-to-r from-[#006e2f] to-[#785a00] bg-clip-text text-transparent">Future</span>.
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-[#121c2a]/70 text-lg max-w-2xl mb-10"
      >
        Access world-class curriculum designed for the next generation of Cameroonian leaders. Start your journey with our curated course catalog.
      </motion.p>
    </motion.header>
  );
}
