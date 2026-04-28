'use client';

import { use }           from 'react';
import { motion }        from 'framer-motion';
import LessonHero        from '@/components/lecon/LessonHero';
import VideoPlayer       from '@/components/lecon/VideoPlayer';
import LessonNavigation  from '@/components/lecon/LessonNavigation';
import LessonContent     from '@/components/lecon/LessonContent';
import LessonSidebar     from '@/components/lecon/LessonSidebar';
import { SpinnerPage }   from '@/components/ui/Spinner';
import { ErrorBlock }    from '@/components/ui/ErrorBlock';
import { useLecon }      from '@/hooks/useLecon';
import { useToast }      from '@/components/ui/Toast';

// ── Normalise la leçon API → props des composants ───────────
function normalizeLecon(l) {
  return {
    id:       l.id,
    title:    l.titre       ?? l.title    ?? 'Leçon',
    module:   l.module?.titre ?? l.module?.title ?? l.module_titre ?? 'Module',
    progress: l.progression  ?? l.progress ?? 0,
    videoUrl: l.video_url    ?? l.videoUrl ?? null,
    content:  l.contenu      ?? l.content  ?? '',
    overview: l.description  ?? '',
    overviewObjectives: l.objectifs ?? [],
    resources:  l.ressources  ?? l.resources  ?? [],
    // Navigation
    prevId:   l.lecon_precedente?.id ?? l.prev_id ?? null,
    nextId:   l.lecon_suivante?.id   ?? l.next_id ?? null,
    quizId:   l.quiz?.id             ?? l.quiz_id ?? null,
    // "Up next" teaser sidebar
    nextLesson: l.lecon_suivante
      ? {
          id:       l.lecon_suivante.id,
          title:    l.lecon_suivante.titre ?? l.lecon_suivante.title ?? 'Leçon suivante',
          number:   l.lecon_suivante.ordre ? `Leçon ${l.lecon_suivante.ordre}` : '',
          duration: l.lecon_suivante.duree ?? '',
        }
      : { id: null, title: 'Fin du module', number: '', duration: '' },
  };
}

export default function LessonPage({ params }) {
  const { id }                              = use(params);
  const { lecon, loading, error, markComplete, completing } = useLecon(id);
  const toast                               = useToast();

  const handleMarkComplete = async () => {
    try {
      await markComplete();
      toast.success('Leçon marquée comme terminée !');
    } catch {
      toast.error('Impossible de marquer la leçon comme terminée.');
    }
  };

  if (loading) return <SpinnerPage />;
  if (error)   return <ErrorBlock message={error} />;
  if (!lecon)  return null;

  const lesson = normalizeLecon(lecon);

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

        {/* Colonne gauche */}
        <motion.div
          className="lg:col-span-8 flex flex-col gap-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <VideoPlayer lesson={lesson} />

          <LessonNavigation
            prevId={lesson.prevId}
            nextId={lesson.nextId}
            quizId={lesson.quizId}
            onMarkComplete={handleMarkComplete}
            completing={completing}
            completed={lecon.completed ?? false}
          />

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
