'use client';

import Link from 'next/link';
import { useState, use } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { adminFormations } from '@/lib/data';

export default function EditFormationPage({ params }) {
  const { id } = use(params);
  const formation = adminFormations.find(f => f.id === parseInt(id));

  const [formData, setFormData] = useState(formation || {
    title: '',
    description: '',
    level: 'Débutant',
    duration: '',
    price: 'Gratuit'
  });

  const [modules, setModules] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  if (!formation) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Formation non trouvée</p>
        <Link href="/admin/formations" className="text-green-600 hover:text-green-700">
          Retour aux formations
        </Link>
      </div>
    );
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Éditer la formation</h1>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">✓ Formation mise à jour avec succès!</p>
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
                Titre de la formation
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

        {/* Modules Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Modules et leçons</h2>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800">
              <strong>Note:</strong> Les modules et leçons peuvent être gérés depuis l'interface dédiée.
            </p>
            <Link
              href={`/admin/formations/${id}/modules`}
              className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Gérer les modules
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Enregistrer les modifications
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
