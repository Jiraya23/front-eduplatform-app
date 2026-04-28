// ════════════════════════════════════════
// 📄 src/lib/api/token.js
// Gestion du token Bearer (localStorage)
// ════════════════════════════════════════

const TOKEN_KEY = 'eduplatform_token';
const USER_KEY  = 'eduplatform_user';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (!token || token === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  // Stocker aussi dans un cookie pour que le middleware (serveur) puisse le lire
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 48}; SameSite=Lax`;
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  // Supprimer aussi le cookie
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function isAuthenticated() {
  return !!getToken();
}
