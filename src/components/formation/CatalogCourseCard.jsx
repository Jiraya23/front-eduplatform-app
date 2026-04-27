'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function CatalogCourseCard({ course }) {
  const badgeConfig = {
    FREE: { bg: 'bg-[#006e2f]/90', text: 'text-white' },
    PREMIUM: { bg: 'bg-[#fdc425]', text: 'text-[#6d5200]' },
    SCHOLARSHIP: { bg: 'bg-[#006e2f]/90', text: 'text-white' }
  };

  const badgeLabel = course.price === 'FREE' ? 'FREE' : 
                     course.badge === 'SCHOLARSHIP' ? 'SCHOLARSHIP' : 
                     'PREMIUM';

  const badge = badgeConfig[badgeLabel];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 300, duration: 0.5 }}
      className="group relative bg-white rounded-[1.5rem] overflow-hidden flex flex-col shadow-[0_32px_64px_-12px_rgba(18,28,42,0.04)] hover:shadow-[0_48px_80px_-16px_rgba(18,28,42,0.08)] transition-all duration-500 border border-[rgba(18,28,42,0.05)]"
    >
      {/* Image Container */}
      <div className="aspect-video w-full overflow-hidden relative">
        <Image
          src={course.image}
          alt={course.title}
          width={400}
          height={250}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badge */}
        <div className={`absolute top-4 left-4 ${badge.bg} ${badge.text} backdrop-blur-md text-[0.6875rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
          {badgeLabel}
        </div>

        {/* African Pattern Mask */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(18,28,42,1) 0.5px, transparent 0.5px)',
            backgroundSize: '12px 12px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        {/* Level & Duration */}
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center text-[0.6875rem] font-bold text-[#6d7b6c] uppercase tracking-widest">
            {course.level}
          </span>
          <span className="flex items-center text-[0.6875rem] font-bold text-[#6d7b6c] uppercase tracking-widest">
            {course.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-['Inter'] text-[1.375rem] font-bold text-[#121c2a] leading-tight mb-3">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-[#121c2a]/60 text-[0.875rem] leading-relaxed mb-8 flex-grow">
          {course.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-[#121c2a]/5">
          <span className="text-[#006e2f] font-bold text-lg">
            {course.price === 'FREE' ? 'FREE' : course.price}
          </span>
          <Link
            href={`/formations/${course.id}`}
            className="bg-[#dee9fc] text-[#121c2a] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#006e2f] hover:text-white transition-all duration-300"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
