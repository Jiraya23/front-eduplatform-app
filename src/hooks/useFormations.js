// ════════════════════════════════════════
// 📄 src/hooks/useFormations.js
// Hook catalogue formations avec pagination,
// filtres, loading et gestion d'erreurs
// ════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';
import { getCatalog } from '@/lib/api/formations';

export function useFormations(initialParams = {}) {
  const [formations, setFormations] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [params,     setParams]     = useState(initialParams);

  const fetch = useCallback(async (fetchParams = params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCatalog(fetchParams);
      setFormations(res.data?.data ?? res.data ?? []);
      if (res.data?.meta) setPagination(res.data.meta);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetch(params);
  }, [JSON.stringify(params)]);

  const setFilter = useCallback((key, value) => {
    setParams(prev => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setParams(prev => ({ ...prev, page }));
  }, []);

  const refetch = useCallback(() => fetch(params), [fetch, params]);

  return { formations, pagination, loading, error, params, setFilter, setPage, refetch };
}
