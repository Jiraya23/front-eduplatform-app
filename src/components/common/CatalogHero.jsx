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
        Decouvrez votre <span className="bg-gradient-to-r from-[#006e2f] to-[#785a00] bg-clip-text text-transparent">Avenir</span>.
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-[#121c2a]/70 text-lg max-w-2xl mb-10"
      >
       Accédez à un programme de classe mondiale conçu pour la prochaine génération de dirigeants camerounais. Commencez votre parcours avec notre catalogue de cours soigneusement sélectionné.
      </motion.p>
    </motion.header>
  );
}
