'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Filters({ onFilterChange }) {
  const [expandedFilter, setExpandedFilter] = useState('level');

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];
  const durations = ['Tous', 'Moins de 3h', '3-6h', '6-12h', 'Plus de 12h'];
  const prices = ['Tous', 'Gratuit', 'Payant'];

  const handleLevelChange = (level) => {
    onFilterChange('level', level);
  };

  const handleDurationChange = (duration) => {
    onFilterChange('duration', duration);
  };

  const handlePriceChange = (price) => {
    onFilterChange('price', price);
  };

  return (
    <div className="space-y-4">
      {/* Level Filter */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedFilter(expandedFilter === 'level' ? null : 'level')}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">Niveau</span>
          <ChevronDown size={20} className={`text-gray-600 transition ${expandedFilter === 'level' ? 'rotate-180' : ''}`} />
        </button>
        {expandedFilter === 'level' && (
          <div className="p-4 space-y-2 border-t border-gray-200">
            {levels.map((level) => (
              <label key={level} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={() => handleLevelChange(level)}
                  className="w-4 h-4 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Duration Filter */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedFilter(expandedFilter === 'duration' ? null : 'duration')}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">Durée</span>
          <ChevronDown size={20} className={`text-gray-600 transition ${expandedFilter === 'duration' ? 'rotate-180' : ''}`} />
        </button>
        {expandedFilter === 'duration' && (
          <div className="p-4 space-y-2 border-t border-gray-200">
            {durations.map((duration) => (
              <label key={duration} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={() => handleDurationChange(duration)}
                  className="w-4 h-4 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">{duration}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setExpandedFilter(expandedFilter === 'price' ? null : 'price')}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
        >
          <span className="font-semibold text-gray-900">Prix</span>
          <ChevronDown size={20} className={`text-gray-600 transition ${expandedFilter === 'price' ? 'rotate-180' : ''}`} />
        </button>
        {expandedFilter === 'price' && (
          <div className="p-4 space-y-2 border-t border-gray-200">
            {prices.map((price) => (
              <label key={price} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={() => handlePriceChange(price)}
                  className="w-4 h-4 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">{price}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
        Réinitialiser les filtres
      </button>
    </div>
  );
}
