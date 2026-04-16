'use client';

import { courses } from '@/lib/data';
import VideoPlayer from '@/components/VideoPlayer';
import LessonProgress from '@/components/LessonProgress';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useState, use } from 'react';

export default function LessonPage({ params }) {
  const { id, lessonId } = use(params);
  const course = courses.find(c => c.id === parseInt(id));
  const [isCompleted, setIsCompleted] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Formation non trouvée</p>
          <Link href="/cours" className="text-green-600 hover:text-green-700">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  // Get all lessons in order
  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLessonIndex = parseInt(lessonId) - 1;
  const currentLesson = allLessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === allLessons.length - 1;
  const isFirstLesson = currentLessonIndex === 0;

  const nextLessonId = currentLessonIndex + 2;
  const prevLessonId = currentLessonIndex;

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Leçon non trouvée</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link href={`/cours/${id}`} className="text-green-600 hover:text-green-700 font-medium">
            ← Retour à la formation
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />

            {/* Progress */}
            <LessonProgress currentLesson={currentLessonIndex + 1} totalLessons={allLessons.length} />

            {/* Completed Status */}
            {isCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                <CheckCircle2 className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-green-900">Leçon terminée !</p>
                  <p className="text-sm text-green-800">Vous pouvez passer à la leçon suivante qu'elle soit disponible</p>
                </div>
              </div>
            )}

            {/* Lesson Content */}
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentLesson.title}</h1>
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4">
              {!isFirstLesson && (
                <Link
                  href={`/cours/${id}/lecon/${prevLessonId}`}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  <ChevronLeft size={20} />
                  <span>Leçon précédente</span>
                </Link>
              )}

              <button
                onClick={() => setIsCompleted(!isCompleted)}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition ${
                  isCompleted
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                {isCompleted ? '✓ Marquée comme terminée' : 'Marquer comme terminée'}
              </button>

              {!isLastLesson && (
                <Link
                  href={`/cours/${id}/lecon/${nextLessonId}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                >
                  <span>Leçon suivante</span>
                  <ChevronRight size={20} />
                </Link>
              )}

              {isLastLesson && (
                <Link
                  href={`/cours/${id}`}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  <span>Retour à la formation</span>
                  <ChevronRight size={20} />
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Info */}
            <div className="bg-white rounded-lg shadow p-4 sticky top-20 mb-4">
              <h3 className="font-bold text-gray-900 mb-4">{course.title}</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Instructeur</p>
                  <p className="font-semibold text-gray-900">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-bold text-gray-900">Leçons de ce chapitre</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {allLessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`/cours/${id}/lecon/${index + 1}`}
                    className={`block px-4 py-3 border-b last:border-b-0 transition ${
                      index === currentLessonIndex
                        ? 'bg-green-50 border-l-4 border-l-green-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <p className={`text-sm font-medium ${
                      index === currentLessonIndex
                        ? 'text-green-700'
                        : 'text-gray-700'
                    }`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
