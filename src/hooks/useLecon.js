// ════════════════════════════════════════
// 📄 src/hooks/useLecon.js
// Hook leçon apprenant avec markComplete
// ════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';
import { getLecon, markLeconComplete } from '@/lib/api/lecons';

export function useLecon(id) {
  const [lecon,     setLecon]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getLecon(id);
        if (!cancelled) setLecon(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [id]);

  const markComplete = useCallback(async () => {
    if (!id || completing) return;
    setCompleting(true);
    try {
      await markLeconComplete(id);
      setLecon(prev => prev ? { ...prev, completed: true } : prev);
    } finally {
      setCompleting(false);
    }
  }, [id, completing]);

  return { lecon, loading, error, markComplete, completing };
}
