'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { CourseHero }        from '@/components/common/CourseHero';
import { CourseInfo }        from '@/components/common/CourseInfo';
import { CourseDescription } from '@/components/common/CourseDescription';
import { LearningObjectives } from '@/components/common/LearningObjectives';
import { CourseCurriculum }  from '@/components/common/CourseCurriculum';
import { CourseDetailCTA }   from '@/components/common/CourseDetailCTA';
import { SpinnerPage }       from '@/components/ui/Spinner';
import { ErrorBlock }        from '@/components/ui/ErrorBlock';
import { useFormation }      from '@/hooks/useFormation';
import { useAuthContext }    from '@/context/AuthContext';
import { enroll }            from '@/lib/api/inscriptions';
import { useToast }          from '@/components/ui/Toast';
import { useRouter }         from 'next/navigation';

// ── Normalise formation API → props des composants ──────────
function normalizeFormation(f) {
  // Modules → sections pour CourseCurriculum
  const curriculum = (f.modules ?? []).map((mod, idx) => ({
    icon:    ['📚', '🎯', '💡', '🚀', '🏆'][idx % 5],
    title:   mod.titre   ?? mod.title ?? `Module ${idx + 1}`,
    lessons: (mod.lecons ?? mod.lessons ?? []).map(l => ({
      id:       l.id,
      title:    l.titre    ?? l.title    ?? 'Leçon',
      duration: l.duree    ?? l.duration ?? '',
    })),
  }));

  // Première leçon disponible pour le bouton CTA
  const firstLessonId = curriculum[0]?.lessons[0]?.id ?? null;

  return {
    id:               f.id,
    title:            f.titre        ?? f.title       ?? 'Sans titre',
    description:      f.description  ?? '',
    image:            f.image        ?? f.image_url   ?? 'https://placehold.co/800x450/eff4ff/006e2f?text=Formation',
    level:            f.niveau       ?? f.level       ?? '-',
    duration:         f.duree        ?? f.duration    ?? '-',
    price:            f.prix != null ? (f.prix === 0 ? 'FREE' : `${f.prix} FCFA`) : 'FREE',
    rating:           f.note         ?? 4.5,
    reviewCount:      f.nb_avis      ?? 0,
    learningObjectives: f.objectifs  ?? [],
    curriculum,
    firstLessonId,
  };
}

export default function CourseDetailPage({ params }) {
  const { id }                         = use(params);
  const { formation, loading, error }  = useFormation(id);
  const { isAuthenticated }            = useAuthContext();
  const toast                          = useToast();
  const router                         = useRouter();
  const [enrolling, setEnrolling]      = useState(false);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/formations/${id}`);
      return;
    }
    setEnrolling(true);
    try {
      await enroll(id);
      toast.success('Inscription réussie !');
      // Rediriger vers la 1ère leçon si disponible
      const firstLesson = course?.firstLessonId;
      if (firstLesson) router.push(`/lecons/${firstLesson}`);
    } catch (err) {
      toast.error(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <SpinnerPage />;
  if (error)   return <ErrorBlock message={error} />;
  if (!formation) return null;

  const course = normalizeFormation(formation);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#f8f9ff]"
    >
      {/* Hero — bouton S'inscrire / Continuer */}
      <CourseHero
        course={course}
        onEnroll={handleEnroll}
        enrolling={enrolling}
        isAuthenticated={isAuthenticated}
      />

      {/* Infos rapides : durée, niveau… */}
      <div className="bg-white">
        <CourseInfo course={course} />
      </div>

      {/* Description */}
      <div className="bg-[#f8f9ff]">
        <CourseDescription course={course} />
      </div>

      {/* Objectifs pédagogiques */}
      {course.learningObjectives.length > 0 && (
        <div className="bg-white">
          <LearningObjectives objectives={course.learningObjectives} />
        </div>
      )}

      {/* Curriculum modules + leçons */}
      {course.curriculum.length > 0 && (
        <div className="bg-[#f8f9ff]">
          <CourseCurriculum sections={course.curriculum} />
        </div>
      )}

      {/* CTA bas de page */}
      <div className="bg-[#f8f9ff]">
        <CourseDetailCTA
          isAuthenticated={isAuthenticated}
          onEnroll={handleEnroll}
          enrolling={enrolling}
        />
      </div>
    </motion.main>
  );
}
