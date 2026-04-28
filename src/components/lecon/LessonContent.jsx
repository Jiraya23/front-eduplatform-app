'use client';

import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle } from 'lucide-react';

// Contenu détaillé de la leçon avec sections
export default function LessonContent({ lesson }) {
  return (
    <motion.div
      className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl shadow-[0_32px_64px_-12px_rgba(18,28,42,0.04)] border border-surface-variant/20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="max-w-none space-y-12">
        {/* Titre de la leçon */}
        <h2 className="text-3xl font-bold text-on-surface mb-8 tracking-tight">
          {lesson.lessonTitle}
        </h2>

        {/* Contenu principal */}
        <div className="space-y-6 text-on-surface/80 leading-relaxed text-lg">
          {/* Intro text */}
          <p>{lesson.content}</p>

          {/* Sections avec numérotation */}
          {lesson.sections?.length > 0 && <div className="flex flex-col md:flex-row gap-8 my-10">
            {lesson.sections?.map((section, idx) => (
              <motion.div
                key={idx}
                className={`flex-1 space-y-4 ${idx > 0 ? 'border-l border-surface-variant/30 md:pl-8' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono text-sm">
                    {section.number}
                  </span>
                  {section.title}
                </h3>
                <p className="text-[0.9375rem]">{section.content}</p>
              </motion.div>
            ))}
          </div>}

          {/* Key Principles */}
          {lesson.keyPrinciples?.length > 0 && <div className="mt-12">
            <h4 className="font-bold text-on-surface text-lg border-b border-surface-variant pb-2 inline-block mb-6">
              Key Principles for Success:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
              {lesson.keyPrinciples.map((principle, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-surface-container-low"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block text-on-surface">{principle.title}</span>
                    <span className="text-sm text-on-surface/70">{principle.description}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>}

          {/* Key Takeaway */}
          {lesson.keyTakeaway && <div className="mt-12 bg-primary/5 border border-primary/20 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb size={20} className="text-primary" />
                <span className="font-bold text-primary tracking-wide uppercase text-sm">Key Takeaway</span>
              </div>
              <p className="text-on-surface font-medium text-lg italic leading-relaxed">
                {lesson.keyTakeaway}
              </p>
            </div>
          </div>}
        </div>
      </div>
    </motion.div>
  );
}
