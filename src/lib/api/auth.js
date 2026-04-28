// ════════════════════════════════════════
// 📄 src/lib/api/auth.js
// ════════════════════════════════════════

import { api } from './client';
import { setToken, removeToken, setStoredUser } from './token';

/**
 * Connexion — retourne { user, token }
 */
export async function login(email, password) {
  const data = await api.post('/login', { email, password });
  setToken(data.data.token);
  setStoredUser(data.data.user ?? null);
  return data.data;
}

/**
 * Inscription — retourne { user, token }
 */
export async function register(payload) {
  const data = await api.post('/register', payload);
  setToken(data.data.token);
  setStoredUser(data.data.user ?? null);
  return data.data;
}

/**
 * Déconnexion
 */
export async function logout() {
  try {
    await api.post('/logout', {});
  } finally {
    removeToken();
  }
}

/**
 * Récupérer l'utilisateur connecté
 */
export async function getMe() {
  const data = await api.get('/me');
  return data.data;
}
