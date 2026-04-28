'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CatalogHero }  from '@/components/common/CatalogHero';
import { CatalogGrid }  from '@/components/common/CatalogGrid';
import { SpinnerPage }  from '@/components/ui/Spinner';
import { ErrorBlock }   from '@/components/ui/ErrorBlock';
import { useFormations } from '@/hooks/useFormations';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Normalise un objet API → format attendu par CatalogCourseCard ──
function normalizeFormation(f) {
  return {
    id:          f.id,
    title:       f.titre        ?? f.title       ?? 'Sans titre',
    description: f.description  ?? '',
    image:       f.image        ?? f.image_url   ?? 'https://placehold.co/400x250/eff4ff/006e2f?text=Formation',
    level:       f.niveau       ?? f.level       ?? '',
    duration:    f.duree        ?? f.duration    ?? '',
    price:       f.prix != null ? (f.prix === 0 ? 'FREE' : `${f.prix} FCFA`) : 'FREE',
    badge:       f.badge        ?? (f.prix === 0 ? 'FREE' : 'PREMIUM'),
  };
}

export default function FormationsPage() {
  const [search, setSearch]   = useState('');
  const [niveau, setNiveau]   = useState('');
  const [inputVal, setInputVal] = useState('');

  const { formations, pagination, loading, error, setFilter, setPage, refetch } = useFormations();

  // ── Appliquer les filtres ────────────────────────────────────
  const applyFilters = useCallback(() => {
    setSearch(inputVal);
    setFilter('search', inputVal || undefined);
    setFilter('niveau', niveau   || undefined);
  }, [inputVal, niveau, setFilter]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') applyFilters();
  };

  const courses = formations.map(normalizeFormation);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">

        {/* Hero */}
        <CatalogHero />

        {/* Barre de recherche + filtres */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="bg-[#eff4ff] p-6 rounded-[2rem] space-y-6 md:space-y-0 md:flex md:items-center md:space-x-4 shadow-sm">
            {/* Input search */}
            <div className="flex-grow relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7b6c] w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une formation, un skill..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-[#006e2f]/20 transition-all text-[#121c2a] placeholder:text-[#bccbb9]"
              />
            </div>

            {/* Filtre niveau */}
            <div className="relative min-w-[150px]">
              <select
                value={niveau}
                onChange={e => setNiveau(e.target.value)}
                className="w-full appearance-none bg-white py-4 pl-4 pr-10 rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-[#006e2f]/20 text-[#121c2a]"
              >
                <option value="">Tous les niveaux</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7b6c] text-sm">▼</div>
            </div>

            {/* Bouton appliquer */}
            <button
              onClick={applyFilters}
              className="bg-[#121c2a] text-white py-4 px-8 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >
              Appliquer
            </button>
          </div>
        </motion.div>

        {/* États loading / erreur / grille */}
        {loading ? (
          <SpinnerPage />
        ) : error ? (
          <ErrorBlock message={error} onRetry={refetch} />
        ) : courses.length === 0 ? (
          <div className="text-center py-24 text-[#121c2a]/50 font-medium">
            Aucune formation trouvée.
          </div>
        ) : (
          <CatalogGrid courses={courses} />
        )}

        {/* Pagination */}
        {!loading && !error && pagination && pagination.last_page > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 flex items-center justify-center gap-3"
          >
            <button
              onClick={() => setPage(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#eff4ff] font-semibold text-sm text-[#121c2a] hover:bg-[#dee9fc] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} /> Précédent
            </button>

            <span className="text-sm font-semibold text-[#121c2a]/60">
              Page {pagination.current_page} / {pagination.last_page}
            </span>

            <button
              onClick={() => setPage(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[#eff4ff] font-semibold text-sm text-[#121c2a] hover:bg-[#dee9fc] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Suivant <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

      </main>
    </motion.div>
  );
}
