'use client';

// ════════════════════════════════════════
// 📄 src/context/AuthContext.jsx
// Provider global d'authentification
// ════════════════════════════════════════

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, logout as apiLogout, register as apiRegister, getMe } from '@/lib/api/auth';
import { getToken, getStoredUser, setStoredUser, removeToken } from '@/lib/api/token';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // ── Initialisation — recharger l'utilisateur depuis le token ──
  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      // Essayer de récupérer l'user depuis localStorage d'abord (rapide)
      const stored = getStoredUser();
      if (stored) setUser(stored);

      try {
        const freshUser = await getMe();
        setUser(freshUser);
        setStoredUser(freshUser);
      } catch {
        // Token invalide ou expiré
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // ── Écouter l'événement auth:logout (déclenché par client.js sur 401) ──
  useEffect(() => {
    const handleLogout = () => {
      // Ne rediriger que si l'utilisateur était connecté (token expiré côté serveur)
      const token = getToken();
      if (!token) return;
      removeToken();
      setUser(null);
      router.push('/login');
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, [router]);

  // ── Register ───────────────────────────────
  const register = useCallback(async (payload) => {
    setError(null)
    setLoading(true)
    try {
      const data = await apiRegister(payload)
      setUser(data.user)
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Login ──────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Logout ─────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  const isAuthenticated = !!user && !!getToken()

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext doit être utilisé dans AuthProvider');
  return ctx;
}
