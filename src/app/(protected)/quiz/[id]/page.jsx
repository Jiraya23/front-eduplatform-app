'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2, Trophy, Lightbulb, RotateCcw, BookOpen, GraduationCap, Medal, Star } from 'lucide-react';
import { useQuiz }    from '@/hooks/useQuiz';
import { SpinnerPage } from '@/components/ui/Spinner';
import { ErrorBlock }  from '@/components/ui/ErrorBlock';
import { Spinner }     from '@/components/ui/Spinner';

export default function QuizDetailPage({ params }) {
  const { id }  = use(params);
  // Le quiz est chargé par leçon ID (l'URL /quiz/[id] utilise l'ID de leçon)
  const { quiz, loading, error, submit, submitting, result, nextLecon } = useQuiz(id);

  // Réponses locales : { [questionId]: reponseId }
  const [answers,     setAnswers]     = useState({});
  const [currentIdx,  setCurrentIdx]  = useState(0);
  const [showResult,  setShowResult]  = useState(false);

  if (loading) return <SpinnerPage />;
  if (error)   return <ErrorBlock message={error} />;
  if (!quiz)   return (
    <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="rounded-[2rem] border border-black/5 bg-white p-10 text-center">
        <p className="text-lg font-semibold text-on-surface">Quiz introuvable.</p>
      </div>
    </div>
  );

  const questions    = quiz.questions ?? [];
  const total        = questions.length;
  const current      = questions[currentIdx];
  const selectedId   = answers[current?.id] ?? null;
  const progress     = total > 0 ? Math.round(((currentIdx + 1) / total) * 100) : 0;
  const allAnswered  = questions.every(q => answers[q.id] != null);

  const handleSelect = (reponseId) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [current.id]: reponseId }));
  };

  const handleSubmit = async () => {
    // Backend attend: { answers: { question_id: reponse_id, ... } }
    const payload = {
      answers: Object.fromEntries(
        Object.entries(answers).map(([qId, rId]) => [Number(qId), Number(rId)])
      ),
    };
    await submit(payload);
    setShowResult(true);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  // ── Écran de résultat ─────────────────────────────────────
  if (showResult && result) {
    const res              = result.resultat ?? result;
    const score            = res.percentage ?? 0;
    const passed           = res.passed ?? false;
    const leconId          = result.lecon_id ?? quiz.lecon_id ?? null;
    const isFinal          = quiz.est_final ?? result.est_final ?? false;
    const formationReussie = result.formation_reussie ?? false;

    // ── Écran spécial : Quiz Final réussi ───────────────────
    if (isFinal && passed) {
      return (
        <motion.main
          className="min-h-screen bg-surface pt-28 pb-16 px-4 flex items-center justify-center overflow-hidden relative"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          {/* Particules décoratives */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: (i % 2 === 0 ? 1 : -1) * (80 + i * 30), y: -(100 + i * 40) }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
              style={{ left: '50%', top: '40%' }}
            />
          ))}

          <div className="max-w-lg w-full text-center space-y-8 z-10">
            {/* Icône diplôme animée */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
              className="w-28 h-28 mx-auto rounded-full flex items-center justify-center shadow-2xl shadow-primary/30"
              style={{ background: 'linear-gradient(135deg, #006e2f, #22c55e)' }}
            >
              <GraduationCap className="w-14 h-14 text-white" />
            </motion.div>

            {/* Badge certificat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest"
            >
              <Medal size={13} /> Certificat délivré
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <h1 className="text-4xl font-bold text-on-surface mb-3">
                Félicitations !
              </h1>
              <p className="text-on-surface/60 leading-relaxed">
                Vous avez brillamment réussi le test final et complété cette formation avec succès.
              </p>
            </motion.div>

            {/* Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
              className="rounded-3xl p-8 bg-primary/5 border border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-3 right-4 flex gap-1">
                {[...Array(3)].map((_, i) => <Star key={i} size={14} className="text-primary fill-primary" />)}
              </div>
              <p className="text-6xl font-extrabold text-primary mb-2">{score}%</p>
              <p className="text-sm text-on-surface/60 font-medium">Score final — Test de formation</p>
            </motion.div>

            {/* Corrigé */}
            <div className="text-left space-y-4 w-full">
              <h2 className="text-lg font-bold text-on-surface">Corrigé</h2>
              {(result.questions ?? quiz.questions)?.map((q, idx) => {
                const bonneReponse  = q.reponses?.find(r => r.est_correcte);
                const userReponseId = answers[q.id];
                const isCorrect     = bonneReponse?.id === userReponseId;
                return (
                  <div key={q.id} className={`rounded-2xl p-5 border ${isCorrect ? 'border-primary/30 bg-primary/5' : 'border-red-200 bg-red-50'}`}>
                    <p className="font-semibold text-on-surface mb-2 text-sm">Q{idx + 1}. {q.texte}</p>
                    <p className={`text-sm font-medium ${isCorrect ? 'text-primary' : 'text-red-500'}`}>
                      {isCorrect ? '✓ Bonne réponse' : '✗ Mauvaise réponse'}
                      {!isCorrect && bonneReponse && (
                        <span className="text-on-surface/60 font-normal"> — Réponse correcte : <strong>{bonneReponse.texte}</strong></span>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Link
                href="/formations"
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20"
                style={{ background: 'linear-gradient(135deg, #006e2f, #22c55e)' }}
              >
                <GraduationCap size={16} /> Mes formations
              </Link>
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold hover:bg-surface-container-high transition-colors"
              >
                <RotateCcw size={16} /> Recommencer
              </button>
            </motion.div>
          </div>
        </motion.main>
      );
    }

    // ── Écran standard quiz intermédiaire ───────────────────
    return (
      <motion.main
        className="min-h-screen bg-surface pt-28 pb-16 px-4 flex items-center justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <div className="max-w-lg w-full text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-xl ${passed ? 'bg-gradient-to-br from-primary to-primary-container' : 'bg-gradient-to-br from-red-400 to-red-600'}`}
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>

          <div>
            <h1 className="text-4xl font-bold text-on-surface mb-2">
              {passed ? 'Bravo !' : 'Continuez vos efforts !'}
            </h1>
            <p className="text-on-surface/60">
              {passed ? 'Vous avez réussi ce quiz.' : 'Vous pouvez réessayer pour améliorer votre score.'}
            </p>
          </div>

          <div className={`rounded-3xl p-8 ${passed ? 'bg-primary/5 border border-primary/20' : 'bg-red-50 border border-red-100'}`}>
            <p className={`text-6xl font-extrabold mb-2 ${passed ? 'text-primary' : 'text-red-500'}`}>
              {score}%
            </p>
            <p className="text-sm text-on-surface/60 font-medium">Score final</p>
          </div>

          {/* Corrigé */}
          <div className="text-left space-y-4 w-full">
            <h2 className="text-lg font-bold text-on-surface">Corrigé</h2>
            {(result.questions ?? quiz.questions)?.map((q, idx) => {
              const bonneReponse  = q.reponses?.find(r => r.est_correcte);
              const userReponseId = answers[q.id];
              const isCorrect     = bonneReponse?.id === userReponseId;
              return (
                <div key={q.id} className={`rounded-2xl p-5 border ${isCorrect ? 'border-primary/30 bg-primary/5' : 'border-red-200 bg-red-50'}`}>
                  <p className="font-semibold text-on-surface mb-2 text-sm">Q{idx + 1}. {q.texte}</p>
                  <p className={`text-sm font-medium ${isCorrect ? 'text-primary' : 'text-red-500'}`}>
                    {isCorrect ? '✓ Bonne réponse' : '✗ Mauvaise réponse'}
                    {!isCorrect && bonneReponse && (
                      <span className="text-on-surface/60 font-normal"> — Réponse correcte : <strong>{bonneReponse.texte}</strong></span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {passed ? (
              <>
                {nextLecon ? (
                  <Link
                    href={`/lecons/${nextLecon.id}`}
                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20"
                  >
                    Continuer <ArrowRight size={16} />
                  </Link>
                ) : (
                  leconId && (
                    <Link
                      href="/formations"
                      className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20"
                    >
                      <Trophy size={16} /> Mes formations
                    </Link>
                  )
                )}
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold hover:bg-surface-container-high transition-colors"
                >
                  <RotateCcw size={16} /> Recommencer
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:-translate-y-0.5 transition-all shadow-lg shadow-red-500/20"
                >
                  <RotateCcw size={16} /> Recommencer
                </button>
                {leconId && (
                  <Link
                    href={`/lecons/${leconId}`}
                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-surface-container-low text-on-surface font-semibold hover:bg-surface-container-high transition-colors"
                  >
                    <BookOpen size={16} /> Retour à la leçon
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </motion.main>
    );
  }

  if (!current) return null;

  const reponses = current.reponses ?? current.options ?? [];

  return (
    <motion.main
      className="min-h-screen bg-surface pt-28 pb-16 px-4 md:px-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-5xl">

        {/* En-tête + barre de progression */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-4 flex items-end justify-between gap-6">
            <div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-primary">
                {quiz.titre ?? quiz.title ?? 'Quiz'}
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                {current.texte ?? current.enonce ?? current.question ?? current.text}
              </h1>
            </div>
            <div className="text-right shrink-0">
              <span className="font-bold text-on-surface">Question {currentIdx + 1}</span>
              <span className="text-sm text-on-surface/50"> / {total}</span>
            </div>
          </div>

          <div className="relative h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <motion.div
              className="relative h-full rounded-full bg-gradient-to-r from-primary to-primary-container"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

          {/* Zone question + options */}
          <motion.section className="space-y-8 lg:col-span-7" initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_32px_64px_-12px_rgba(18,28,42,0.04)] md:p-10"
              >
                <div className="space-y-4">
                  {reponses.map((rep) => {
                    const repId     = rep.id;
                    const isSelected = selectedId === repId;

                    return (
                      <button
                        key={repId}
                        type="button"
                        onClick={() => handleSelect(repId)}
                        className={[
                          'flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all duration-300',
                          isSelected
                            ? 'border-primary bg-surface-container-low shadow-lg shadow-primary/5'
                            : 'border-transparent bg-surface-container-lowest hover:bg-surface-container-low',
                        ].join(' ')}
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${isSelected ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface/70'}`}>
                          {String.fromCharCode(65 + reponses.indexOf(rep))}
                        </span>
                        <span className={`font-medium ${isSelected ? 'text-on-surface' : 'text-on-surface/80'}`}>
                          {rep.texte ?? rep.text ?? rep.contenu ?? rep.label}
                        </span>
                        {isSelected && <CheckCircle2 className="ml-auto h-5 w-5 text-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation question + submit */}
                <div className="mt-10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
                    disabled={currentIdx === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low font-semibold text-sm text-on-surface hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft size={15} /> Précédent
                  </button>

                  {currentIdx < total - 1 ? (
                    <button
                      onClick={() => setCurrentIdx(i => i + 1)}
                      disabled={!selectedId}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-low font-semibold text-sm text-on-surface hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Suivant <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!allAnswered || submitting}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary-container px-8 py-3 font-bold text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? <><Spinner size="sm" /> Envoi...</> : 'Soumettre le quiz'}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.section>

          {/* Sidebar conseil */}
          <motion.aside className="space-y-6 lg:col-span-5" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.16 }}>
            <div className="rounded-[2rem] p-8 border border-black/5 bg-white">
              <div className="mb-4 flex items-center gap-3 text-on-surface">
                <Lightbulb className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-tight">Conseil</span>
              </div>
              <p className="text-[0.9375rem] leading-relaxed text-on-surface/75">
                Lis attentivement chaque proposition avant de répondre. Tu peux revenir aux questions précédentes avant de soumettre.
              </p>
            </div>

            {/* Compteur réponses */}
            <div className="rounded-[2rem] bg-surface-container-low p-8 text-center">
              <p className="text-4xl font-extrabold text-primary mb-1">
                {Object.keys(answers).length} / {total}
              </p>
              <p className="text-sm text-on-surface/60 font-medium">questions répondues</p>
              {allAnswered && (
                <p className="mt-3 text-xs font-bold text-primary uppercase tracking-wider">
                  Prêt à soumettre !
                </p>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.main>
  );
}
