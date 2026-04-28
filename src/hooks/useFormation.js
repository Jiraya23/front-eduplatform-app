// ════════════════════════════════════════
// 📄 src/hooks/useFormation.js
// Hook détail d'une formation
// ════════════════════════════════════════

import { useState, useEffect } from 'react';
import { getFormation } from '@/lib/api/formations';

export function useFormation(id) {
  const [formation, setFormation] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFormation(id);
        if (!cancelled) setFormation(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [id]);

  return { formation, loading, error };
}
