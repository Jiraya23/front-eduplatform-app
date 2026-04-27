'use client';

import { motion } from 'framer-motion';
import { CatalogHero } from '@/components/common/CatalogHero';
import { SearchBar } from '@/components/common/SearchBar';
import { CatalogGrid } from '@/components/common/CatalogGrid';
import { mockCatalogCourses } from '@/lib/mockData';

export default function FormationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Hero & Search */}
        <CatalogHero />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <SearchBar />
        </motion.div>

        {/* Course Grid */}
        <CatalogGrid courses={mockCatalogCourses} />

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="mt-20 flex justify-center"
        >
          <button className="group flex items-center space-x-3 bg-[#eff4ff] px-10 py-4 rounded-full font-bold text-[#121c2a] hover:bg-[#dee9fc] transition-all">
            <span>View More Courses</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </main>
    </motion.div>
  );
}
