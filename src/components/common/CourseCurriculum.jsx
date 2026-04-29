'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

export function CourseCurriculum({ sections }) {
  const [openIndex, setOpenIndex] = useState(1);

 // ✅ CORRIGÉ
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,  // ← ajouter ça
    transition: { staggerChildren: 0.1 } 
  }
}

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
      className="py-20 px-6 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="font-['Inter'] text-3xl font-bold text-[#121c2a] mb-2">Programme des Cours</h2>
        <p className="text-[#121c2a]/60">Explorez nos modules de formation en détail</p>
      </motion.div>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="border border-[#121c2a]/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className={`w-full p-6 flex items-center justify-between transition-colors ${
                openIndex === idx
                  ? 'bg-[#006e2f] text-white'
                  : 'bg-white hover:bg-[#f8f9ff] text-[#121c2a]'
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <span className="text-sm font-bold">{section.icon}</span>
                <h3 className="font-['Inter'] font-bold text-lg">{section.title}</h3>
              </div>
              <ChevronDown
                size={24}
                className={`transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
              />
            </button>

            {openIndex === idx && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 space-y-3 border-t border-[#121c2a]/10"
              >
                {section.lessons.map((lesson, lessonIdx) => (
                  lesson.id ? (
                    <Link
                      key={lessonIdx}
                      href={`/lecons/${lesson.id}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#f8f9ff] group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Play size={13} className="text-[#006e2f] group-hover:scale-110 transition-transform" fill="currentColor" />
                        <span className="text-[#121c2a]/70 group-hover:text-[#006e2f] transition-colors">{lesson.title}</span>
                      </div>
                      <span className="text-xs font-bold text-[#121c2a]/60">{lesson.duration}</span>
                    </Link>
                  ) : (
                    <div key={lessonIdx} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[#006e2f]">●</span>
                        <span className="text-[#121c2a]/70">{lesson.title}</span>
                      </div>
                      <span className="text-xs font-bold text-[#121c2a]/60">{lesson.duration}</span>
                    </div>
                  )
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
