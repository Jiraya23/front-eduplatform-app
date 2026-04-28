// ════════════════════════════════════════
// 📄 src/lib/api/lecons.js
// ════════════════════════════════════════

import { api } from './client';

/**
 * Récupérer une leçon par ID (apprenant — vérifie inscription)
 * @param {number|string} id
 */
export async function getLecon(id) {
  const data = await api.get(`/lecons/${id}`);
  return data.data;
}

/**
 * Leçon suivante
 * @param {number|string} id
 */
export async function getNextLecon(id) {
  const data = await api.get(`/lecons/${id}/next`);
  return data.data;
}

/**
 * Leçon précédente
 * @param {number|string} id
 */
export async function getPrevLecon(id) {
  const data = await api.get(`/lecons/${id}/previous`);
  return data.data;
}

/**
 * Marquer une leçon comme complétée
 * @param {number|string} id
 */
export async function markLeconComplete(id) {
  const data = await api.post(`/lecons/${id}/complete`, {});
  return data.data;
}
