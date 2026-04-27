'use client';
import {use} from 'react';
import { motion } from 'framer-motion';
import { mockLessons } from '@/lib/mockData';
import LessonHero from '@/components/lecon/LessonHero';
import VideoPlayer from '@/components/lecon/VideoPlayer';
import LessonNavigation from '@/components/lecon/LessonNavigation';
import LessonContent from '@/components/lecon/LessonContent';
import LessonSidebar from '@/components/lecon/LessonSidebar';

export default function LessonPage({ params }) {
  // Récupérer les données de la leçon
  const resolvedParams = use(params);
  
  // Maintenant on peut accéder à l'ID en toute sécurité
  const lesson = mockLessons[resolvedParams.id];
 

  if (!lesson) {
    return (
      <div className="pt-28 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        <p className="text-center text-on-surface/60">Leçon non trouvée.</p>
      </div>
    );
  }

  return (
    <motion.main
      className="pt-28 pb-12 px-6 max-w-[1600px] mx-auto min-h-screen bg-surface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header avec progress */}
      <LessonHero lesson={lesson} />

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne gauche - Contenu principal */}
        <motion.div
          className="lg:col-span-8 flex flex-col gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Lecteur vidéo */}
          <VideoPlayer lesson={lesson} />

          {/* Navigation entre leçons */}
          <LessonNavigation
            prevId={lesson.prevId}
            nextId={lesson.nextId}
            quizId={lesson.quizId}
          />

          {/* Contenu écrit détaillé */}
          <LessonContent lesson={lesson} />
        </motion.div>

        {/* Sidebar droite */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <LessonSidebar lesson={lesson} />
        </motion.div>
      </div>
    </motion.main>
  );
}
