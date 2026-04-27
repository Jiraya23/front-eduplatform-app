'use client';

import { motion } from 'framer-motion';
import { HeroSection } from '@/components/common/HeroSection';
import { StatsSection } from '@/components/common/StatsSection';
import { BenefitsSection } from '@/components/common/BenefitsSection';
import { CoursesSection } from '@/components/common/CoursesSection';
import { TestimonialsSection } from '@/components/common/TestimonialsSection';
import { CTASection } from '@/components/common/CTASection';    

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <CoursesSection />
      <TestimonialsSection />
      <CTASection />
    </motion.div>
  );
}
