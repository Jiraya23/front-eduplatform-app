// ════════════════════════════════════════
// 📄 src/hooks/useQuiz.js
// Hook quiz apprenant + soumission
// ════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';
import { getQuizByLecon, submitQuiz } from '@/lib/api/quiz';

export function useQuiz(leconId) {
  const [quiz,       setQuiz]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [result,     setResult]     = useState(null);

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
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, [quiz?.id, submitting]);

  return { quiz, loading, error, submit, submitting, result };
}
