// ════════════════════════════════════════
// 📄 src/lib/api/inscriptions.js
// ════════════════════════════════════════

import { api } from './client';

/**
 * S'inscrire à une formation
 * @param {number|string} formationId
 */
export async function enroll(formationId) {
  const data = await api.post(`/formations/${formationId}/enroll`, {});
  return data.data;
}

/**
 * Se désinscrire d'une formation
 * @param {number|string} formationId
 */
export async function unenroll(formationId) {
  const data = await api.delete(`/formations/${formationId}/unenroll`);
  return data;
}

/**
 * Mes formations (apprenant)
 */
export async function getMyFormations() {
  const data = await api.get('/my-formations');
  return data.data;
}

/**
 * Progression dans une formation
 * @param {number|string} formationId
 */
export async function getProgress(formationId) {
  const data = await api.get(`/formations/${formationId}/progress`);
  return data.data;
}
