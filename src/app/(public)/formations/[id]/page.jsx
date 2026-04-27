'use client';
import { use } from 'react';
import { motion } from 'framer-motion';
import { CourseHero } from '@/components/common/CourseHero';
import { CourseInfo } from '@/components/common/CourseInfo';
import { CourseDescription } from '@/components/common/CourseDescription';
import { LearningObjectives } from '@/components/common/LearningObjectives';
import { CourseCurriculum } from '@/components/common/CourseCurriculum';
import { CourseDetailCTA } from '@/components/common/CourseDetailCTA';
import { courseDetails } from '@/lib/mockData';

export default function CourseDetailPage({ params }) {
  const { id } = use(params);
  const course = courseDetails[Number(id)];

  if (!course) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <p className="text-xl text-[#121c2a]/60">Course not found</p>
      </motion.div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#f8f9ff]"
    >
      {/* Hero Section */}
      <CourseHero course={course} />

      {/* Course Info Grid */}
      <div className="bg-white">
        <CourseInfo course={course} />
      </div>

      {/* Description Section */}
      <div className="bg-[#f8f9ff]">
        <CourseDescription course={course} />
      </div>

      {/* Learning Objectives */}
      <div className="bg-white">
        <LearningObjectives objectives={course.learningObjectives} />
      </div>

      {/* Curriculum */}
      <div className="bg-[#f8f9ff]">
        <CourseCurriculum sections={course.curriculum} />
      </div>

      {/* CTA Section */}
      <div className="bg-[#f8f9ff]">
        <CourseDetailCTA />
      </div>
    </motion.main>
  );
}
