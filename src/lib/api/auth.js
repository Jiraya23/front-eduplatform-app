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
  // Le backend ne retourne pas l'user dans /login — on le récupère via /me
  const meData = await api.get('/me');
  const user = meData.data ?? null;
  setStoredUser(user);
  return { token: data.data.token, user };
}

/**
 * Inscription — retourne { user, token }
 */
export async function register(payload) {
  const data = await api.post('/register', payload);
  // Le backend retourne l'user mais pas de token à l'inscription
  // On enchaîne avec un login pour obtenir le token
  const loginData = await api.post('/login', { email: payload.email, password: payload.password });
  setToken(loginData.data.token);
  const user = data.data ?? null;
  setStoredUser(user);
  return { token: loginData.data.token, user };
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
