'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

export default function NewFormationPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'Débutant',
    duration: '',
    category: '',
    price: 'Gratuit'
  });

  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState({ title: '', lessons: [] });
  const [currentLesson, setCurrentLesson] = useState({ title: '', duration: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLesson = () => {
    if (currentLesson.title && currentLesson.duration) {
      setCurrentModule(prev => ({
        ...prev,
        lessons: [...prev.lessons, { ...currentLesson, id: Date.now() }]
      }));
      setCurrentLesson({ title: '', duration: '' });
    }
  };

  const handleRemoveLesson = (lessonId) => {
    setCurrentModule(prev => ({
      ...prev,
      lessons: prev.lessons.filter(l => l.id !== lessonId)
    }));
  };

  const handleAddModule = () => {
    if (currentModule.title && currentModule.lessons.length > 0) {
      setModules(prev => [...prev, { ...currentModule, id: Date.now() }]);
      setCurrentModule({ title: '', lessons: [] });
    }
  };

  const handleRemoveModule = (moduleId) => {
    setModules(modules.filter(m => m.id !== moduleId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          title: '',
          description: '',
          level: 'Débutant',
          duration: '',
          category: '',
          price: 'Gratuit'
        });
        setModules([]);
      }, 3000);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/formations"
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium mb-4"
        >
          <ArrowLeft size={20} />
          <span>Retour</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Créer une nouvelle formation</h1>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">✓ Formation créée avec succès!</p>
          <p className="text-sm text-green-700 mt-1">Redirection en cours...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de base</h2>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la formation *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: Introduction à React"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Décrivez votre formation..."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Débutant</option>
                  <option>Intermédiaire</option>
                  <option>Avancé</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durée
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: 4 heures"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix
                </label>
                <select
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Gratuit</option>
                  <option>4 999 FCFA</option>
                  <option>9 999 FCFA</option>
                  <option>24 999 FCFA</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Modules & Lessons */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Modules et leçons</h2>

          {/* Add Lesson */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Ajouter une leçon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={currentLesson.title}
                onChange={(e) => setCurrentLesson(prev => ({ ...prev, title: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Titre de la leçon"
              />
              <input
                type="text"
                value={currentLesson.duration}
                onChange={(e) => setCurrentLesson(prev => ({ ...prev, duration: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Durée (ex: 15 min)"
              />
            </div>
            <button
              type="button"
              onClick={handleAddLesson}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              <Plus size={20} />
              <span>Ajouter cette leçon</span>
            </button>
          </div>

          {/* Current Module Lessons */}
          {currentModule.lessons.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Leçons du module en cours:</h3>
              <ul className="space-y-2">
                {currentModule.lessons.map(lesson => (
                  <li key={lesson.id} className="flex items-center justify-between p-3 bg-white rounded border border-gray-200">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(lesson.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add Module */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              value={currentModule.title}
              onChange={(e) => setCurrentModule(prev => ({ ...prev, title: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Titre du module"
            />
            <button
              type="button"
              onClick={handleAddModule}
              disabled={!currentModule.title || currentModule.lessons.length === 0}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition"
            >
              Ajouter le module
            </button>
          </div>

          {/* Modules List */}
          {modules.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Modules créés ({modules.length}):</h3>
              {modules.map(module => (
                <div key={module.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-gray-900">{module.title}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveModule(module.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {module.lessons.map(lesson => (
                      <li key={lesson.id} className="text-sm text-gray-600 pl-4">
                        • {lesson.title} ({lesson.duration})
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Créer la formation
          </button>
          <Link
            href="/admin/formations"
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
