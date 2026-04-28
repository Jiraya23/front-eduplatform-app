// ════════════════════════════════════════
// 📄 src/lib/api/client.js
// Client HTTP centralisé
// - Injecte le token Bearer automatiquement
// - Gestion unifiée des erreurs (401, 422, 500)
// - Toutes les fonctions API passent par ici
// ════════════════════════════════════════

import { getToken, removeToken } from './token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ── Classe d'erreur API enrichie ─────────────────────
export class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.name    = 'ApiError';
    this.status  = status;
    this.errors  = errors; // Erreurs de validation Laravel (422)
  }
}

// ── Fonction centrale ─────────────────────────────────
export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // ── Réponse vide (204 No Content) ─────────────────
  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  // ── Gestion des erreurs HTTP ───────────────────────
  if (!response.ok) {
    switch (response.status) {
      case 401:
        // Token expiré ou invalide → déconnexion propre
        removeToken();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('auth:logout'));
        }
        throw new ApiError('Session expirée. Veuillez vous reconnecter.', 401);

      case 403:
        throw new ApiError('Accès refusé.', 403);

      case 404:
        throw new ApiError(data.message || 'Ressource introuvable.', 404);

      case 422:
        // Erreurs de validation Laravel
        throw new ApiError(
          data.message || 'Données invalides.',
          422,
          data.errors || null
        );

      case 429:
        throw new ApiError('Trop de requêtes. Réessayez dans un moment.', 429);

      case 500:
      default:
        throw new ApiError(
          data.message || 'Une erreur serveur est survenue.',
          response.status
        );
    }
  }

  return data;
}

// ── Helpers par méthode ───────────────────────────────
export const api = {
  get:    (endpoint, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'GET' }),

  post:   (endpoint, body, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put:    (endpoint, body, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  patch:  (endpoint, body = {}, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

  delete: (endpoint, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'DELETE' }),
};
