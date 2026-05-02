// ════════════════════════════════════════
// 📄 src/hooks/useQuiz.js
// Hook quiz apprenant + soumission
// ════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';
import { getQuizByLecon, submitQuiz, getNextLecon } from '@/lib/api/quiz';

export function useQuiz(leconId) {
  const [quiz,       setQuiz]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result,     setResult]     = useState(null);
  const [nextLecon,  setNextLecon]  = useState(null);

  useEffect(() => {
    if (!leconId) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getQuizByLecon(leconId);
        if (!cancelled) setQuiz(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => { cancelled = true; };
  }, [leconId]);

  const submit = useCallback(async (answers) => {
    if (!quiz?.id || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitQuiz(quiz.id, answers);
      setResult(res);
      // Si réussi (>= score_minimal), charger la leçon suivante
      const passed = res?.resultat?.passed ?? false;
      if (passed && leconId) {
        try {
          const next = await getNextLecon(leconId);
          setNextLecon(next);
        } catch {
          setNextLecon(null);
        }
      }
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [quiz?.id, submitting, leconId]);

  return { quiz, loading, error, submit, submitting, result, nextLecon };
}
