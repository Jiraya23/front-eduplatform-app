'use client';

import { adminFormations } from '@/lib/data';
import Link from 'next/link';
import { Trash2, Edit, Plus } from 'lucide-react';
import { useState } from 'react';

export default function FormationsManagePage() {
  const [formations, setFormations] = useState(adminFormations);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleDelete = (id) => {
    setFormations(formations.filter(f => f.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Formations</h1>
          <p className="text-gray-600 mt-2">Gérez toutes vos formations</p>
        </div>
        <Link
          href="/admin/formations/nouveau"
          className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
        >
          <Plus size={20} />
          <span>Nouvelle formation</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {formations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 mb-4">Aucune formation pour le moment</p>
            <Link
              href="/admin/formations/nouveau"
              className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
            >
              Créer une formation
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Titre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Niveau</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durée</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Apprenants</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {formations.map((formation) => (
                  <tr key={formation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{formation.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formation.level}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formation.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formation.studentsCount}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        {formation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/admin/formations/${formation.id}`}
                          className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          <Edit size={16} />
                          <span>Éditer</span>
                        </Link>
                        <button
                          onClick={() => setShowDeleteConfirm(formation.id)}
                          className="inline-flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          <Trash2 size={16} />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Confirmer la suppression</h2>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette formation ? Cette action est irréversible.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
