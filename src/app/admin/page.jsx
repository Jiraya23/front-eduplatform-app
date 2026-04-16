import Link from 'next/link';
import { BarChart3, Users, BookOpen, TrendingUp, BarChart3Icon } from 'lucide-react';


export default function AdminPage() {
  const stats = [
    {
      label: 'Total Formations',
      value: '6',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Total Apprenants',
      value: '5,283',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Formations Publiées',
      value: '6',
      icon: TrendingUp,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      label: 'Revenus',
      value: '149,999 FCFA',
      icon: BarChart3,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-600 mt-2">Bienvenue dans l'interface d'administration</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="space-y-3">
            <Link
              href="/admin/formations/nouveau"
              className="block px-4 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition text-center"
            >
              Créer une nouvelle formation
            </Link>
            <Link
              href="/admin/formations"
              className="block px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition text-center"
            >
              Gérer les formations
            </Link>
            <button className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
              Voir les statistiques
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Nouveaux inscrits</h2>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {[
              { name: 'Marie Nkomo', formation: 'JavaScript' },
              { name: 'Jean Kameni', formation: 'React' },
              { name: 'Sophie Toing', formation: 'Tailwind CSS' },
              { name: 'Paul Essomba', formation: 'JavaScript' }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.formation}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Nouveau</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Formations */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Formations récentes</h2>
          <Link href="/admin/formations" className="text-green-600 hover:text-green-700 text-sm font-medium">
            Voir tout
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Titre</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Niveau</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Apprenants</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                { title: 'Introduction à JavaScript', level: 'Débutant', students: 1250, status: 'Publiée' },
                { title: 'Web Design avec Tailwind CSS', level: 'Intermédiaire', students: 890, status: 'Publiée' },
                { title: 'React pour les débutants', level: 'Intermédiaire', students: 2100, status: 'Publiée' }
              ].map((formation, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{formation.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formation.level}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formation.students}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {formation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Éditer</button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
