'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { mockTestimonials } from '@/lib/mockData';

export function TestimonialsSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="absolute top-1/2 left-0 w-full h-full pattern-african pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <h2 className="font-headline font-extrabold text-4xl mb-6 italic">
            « EduPlattform a radicalement changé ma trajectoire professionnelle. »
          </h2>
          <p className="text-on-surface text-lg">— Histoires de réussite de notre communauté</p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {mockTestimonials.map((testimonial, idx) => (
            <motion.div key={testimonial.id} variants={itemVariants} className="space-y-8">
              <p className="text-lg leading-relaxed text-on-surface italic">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-2xl object-cover shadow-lg"
                />
                <div>
                  <div className="font-bold text-on-surface">{testimonial.author}</div>
                  <div className="text-sm text-primary font-semibold">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
