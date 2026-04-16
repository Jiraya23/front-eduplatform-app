'use client';

import { courses } from '@/lib/data';
import Link from 'next/link';
import { CheckCircle, Clock, Users, Award, BookOpen } from 'lucide-react';
import { use } from 'react';

export default function CourseDetailPage({ params }) {
  const { id } = use(params);
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Formation non trouvée</h1>
          <Link href="/cours" className="text-green-600 hover:text-green-700">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl mb-8">Par {course.instructor}</p>
          <Link href={`/cours/${id}/lecon/1`} className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            S'inscrire à cette formation
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Durée</span>
                </div>
                <p className="font-semibold text-gray-900">{course.duration}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Award size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Niveau</span>
                </div>
                <p className="font-semibold text-gray-900">{course.level}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Étudiants</span>
                </div>
                <p className="font-semibold text-gray-900">{course.students}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen size={20} className="text-green-600" />
                  <span className="text-sm text-gray-600">Modules</span>
                </div>
                <p className="font-semibold text-gray-900">{course.modules.length}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos de cette formation</h2>
              <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            {/* Objectives */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Objectifs d'apprentissage</h2>
              <ul className="space-y-2">
                {course.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Program */}
            {course.modules.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Programme de la formation</h2>
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b">
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      </div>
                      <ul className="divide-y">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="px-4 py-3 flex items-center justify-between hover:bg-green-50 transition">
                            <span className="text-gray-700">{lesson.title}</span>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Prix</p>
                <p className="text-3xl font-bold text-gray-900">
                  {course.price === 'Gratuit' ? (
                    <span className="text-green-600">{course.price}</span>
                  ) : (
                    course.price
                  )}
                </p>
              </div>

              <Link href={`/cours/${id}/lecon/1`} className="w-full block text-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition mb-4">
                S'inscrire maintenant
              </Link>

              <div className="space-y-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600" />
                  <span>Accès illimité</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600" />
                  <span>Certificat à la fin</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-600" />
                  <span>Ressources téléchargeables</span>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-lg font-semibold text-gray-900 mb-2">⭐ {course.rating}/5</p>
                <p className="text-sm text-gray-600">{course.students} étudiants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
