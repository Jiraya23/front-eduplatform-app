'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';

export function CourseHero({ course }) {
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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#006e2f]/10 text-[#006e2f] rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-[#006e2f] rounded-full"></span>
            Advanced Specialization
          </div>

          {/* Title */}
          <h1 className="font-['Inter'] text-5xl font-bold text-[#121c2a] leading-tight">
            {course.title}
          </h1>

          {/* Description */}
          <p className="text-[#121c2a]/70 text-lg leading-relaxed">
            {course.description}
          </p>

          {/* Rating & Enroll Button */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#785a00] text-[#785a00]" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#121c2a]">{course.rating} ({course.reviewCount} Reviews)</span>
            </div>
          </div>

          {/* Enroll Button — visiteur → /signup, connecté → /lecons/[firstLessonId] */}
          <motion.div variants={itemVariants} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Link
              href={course.firstLessonId ? `/lecons/${course.firstLessonId}` : '/signup'}
              className="inline-block bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#006e2f]/20 transition-all"
            >
              S'inscrire à cette formation
            </Link>
          </motion.div>
        </motion.div>

        {/* Right - Video */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-[#121c2a]/10">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer">
              <button className="w-20 h-20 rounded-full bg-white group-hover:bg-[#006e2f] group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                <Play size={40} className="text-[#006e2f] group-hover:text-white fill-current" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
