'use client';

import { motion } from 'framer-motion';

export function CourseDescription({ course }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className="py-20 px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left - Description */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <h2 className="font-['Inter'] text-3xl font-bold text-[#121c2a] mb-6">Detailed Description</h2>
            <p className="text-[#121c2a]/70 leading-relaxed mb-4">
              {course.detailedDescription}
            </p>
            <p className="text-[#121c2a]/70 leading-relaxed">
              {course.additionalDescription}
            </p>
          </motion.div>
        </div>

        {/* Right - Course Includes */}
        <motion.div
          variants={itemVariants}
          className="bg-[#f0f3f8] rounded-2xl p-8 h-fit"
        >
          <h3 className="font-['Inter'] text-xl font-bold text-[#121c2a] mb-6">This course includes:</h3>
          <ul className="space-y-4">
            {[
              '37 hours of On-Demand Video',
              '15 Downloadable Resources',
              '1 Full Article Access',
              'Certificate of Completion'
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-[#006e2f] flex-shrink-0 mt-0.5"></span>
                <span className="text-[#121c2a]/70 text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>

          {/* Instructor */}
          <div className="mt-8 pt-8 border-t border-[#121c2a]/10">
            <p className="text-xs font-bold text-[#121c2a]/60 uppercase tracking-wider mb-4">Instructor</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#006e2f] flex-shrink-0"></div>
              <div>
                <p className="font-bold text-[#121c2a] text-sm">{course.instructor}</p>
                <p className="text-[#121c2a]/60 text-xs">{course.instructorRole}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
