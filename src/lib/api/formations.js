// ════════════════════════════════════════
// 📄 src/lib/api/formations.js
// ════════════════════════════════════════

import { api } from './client';

/**
 * Catalogue public paginé
 * @param {{ page?, search?, categorie_id?, niveau? }} params
 */
export async function getCatalog(params = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v != null && v !== '')
  ).toString();
  const data = await api.get(`/formations${query ? `?${query}` : ''}`);
  return data;
}

/**
 * Détail d'une formation (avec modules + leçons)
 * @param {number|string} id
 */
export async function getFormation(id) {
  const data = await api.get(`/formations/${id}`);
  return data.data;
}

/**
 * Formations en vedette (homepage)
 */
export async function getFeatured() {
  const data = await api.get('/formations/featured');
  return data.data;
}

/**
 * Recherche formations
 * @param {string} query
 */
export async function searchFormations(query) {
  const data = await api.get(`/formations/search?q=${encodeURIComponent(query)}`);
  return data.data;
}
