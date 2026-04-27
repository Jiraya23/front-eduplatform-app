'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Flame, Lightbulb, ShieldCheck } from 'lucide-react';
import { mockQuizzes } from '@/lib/mockData';

export default function QuizDetailPage({ params }) {
  const resolvedParams = use(params);
  const quiz = mockQuizzes[resolvedParams.id];

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const correctOption = useMemo(
    () => quiz?.options.find((option) => option.id === quiz.correctOption),
    [quiz]
  );

  const selectedIsCorrect = selectedOption === quiz?.correctOption;

  if (!quiz) {
    return (
      <div className="pt-28 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="rounded-[2rem] border border-black/5 bg-white p-10 text-center shadow-[0_32px_64px_-12px_rgba(18,28,42,0.06)]">
          <p className="text-lg font-semibold text-on-surface">Quiz introuvable.</p>
          <p className="mt-2 text-on-surface/60">
            Le quiz demandé n’existe pas ou n’est pas encore disponible.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);
  };

  return (
    <motion.main
      className="min-h-screen bg-surface pt-28 pb-16 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-4 flex items-end justify-between gap-6">
            <div>
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.28em] text-primary">
                {quiz.module}
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                {quiz.title}
              </h1>
            </div>

            <div className="text-right">
              <span className="font-bold text-on-surface">
                Question {quiz.questionNumber}
              </span>
              <span className="text-sm text-on-surface/50"> / {quiz.totalQuestions}</span>
            </div>
          </div>

          <div className="relative h-3 w-full overflow-hidden rounded-full bg-surface-container-highest">
            <motion.div
              className="relative h-full rounded-full bg-gradient-to-r from-primary to-primary-container"
              initial={{ width: 0 }}
              animate={{ width: `${quiz.progress}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="absolute right-0 top-0 h-full w-3 bg-primary-fixed blur-sm" />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <motion.section
            className="space-y-8 lg:col-span-7"
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_32px_64px_-12px_rgba(18,28,42,0.04)] md:p-10">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

              <h2 className="mb-8 max-w-2xl text-xl font-semibold leading-snug text-on-surface md:text-2xl">
                {quiz.question}
              </h2>

              <div className="space-y-4">
                {quiz.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrect = option.id === quiz.correctOption;
                  const showCorrect = isSubmitted && isCorrect;
                  const showWrong = isSubmitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedOption(option.id)}
                      className={[
                        'flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all duration-300',
                        isSelected
                          ? 'border-primary bg-surface-container-low shadow-lg shadow-primary/5'
                          : 'border-transparent bg-surface-container-lowest hover:bg-surface-container-low',
                        showWrong ? 'border-red-300 bg-red-50' : '',
                        showCorrect ? 'border-primary bg-surface-container-low' : ''
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'flex h-10 w-10 items-center justify-center rounded-lg font-bold',
                          isSelected || showCorrect
                            ? 'bg-primary text-white'
                            : 'bg-surface-container-high text-on-surface/70'
                        ].join(' ')}
                      >
                        {option.id}
                      </span>

                      <span
                        className={[
                          'font-medium',
                          isSelected || showCorrect ? 'text-on-surface' : 'text-on-surface/80'
                        ].join(' ')}
                      >
                        {option.text}
                      </span>

                      {showCorrect ? (
                        <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
                      ) : null}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!selectedOption || isSubmitted}
                  className="rounded-xl bg-gradient-to-br from-primary to-primary-container px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {isSubmitted ? 'Réponse validée' : 'Valider'}
                </button>
              </div>
            </div>
          </motion.section>

          <motion.aside
            className="space-y-6 lg:col-span-5"
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <div
              className={[
                'rounded-[2rem] p-8',
                isSubmitted
                  ? selectedIsCorrect
                    ? 'border-l-4 border-primary bg-primary-container/10'
                    : 'border-l-4 border-red-400 bg-red-50'
                  : 'border border-black/5 bg-white'
              ].join(' ')}
            >
              <div
                className={[
                  'mb-4 flex items-center gap-3',
                  isSubmitted
                    ? selectedIsCorrect
                      ? 'text-primary'
                      : 'text-red-500'
                    : 'text-on-surface'
                ].join(' ')}
              >
                {isSubmitted ? (
                  selectedIsCorrect ? (
                    <ShieldCheck className="h-5 w-5" />
                  ) : (
                    <Lightbulb className="h-5 w-5" />
                  )
                ) : (
                  <Lightbulb className="h-5 w-5" />
                )}

                <span className="text-sm font-bold uppercase tracking-tight">
                  {isSubmitted
                    ? selectedIsCorrect
                      ? 'Bonne réponse'
                      : 'Retour pédagogique'
                    : 'Conseil'}
                </span>
              </div>

              {isSubmitted ? (
                <>
                  <p className="text-[0.9375rem] leading-relaxed text-on-surface">
                    {quiz.explanation}
                  </p>

                  {!selectedIsCorrect && correctOption ? (
                    <p className="mt-4 text-sm font-medium text-on-surface/75">
                      Réponse attendue : <span className="font-bold">{correctOption.text}</span>
                    </p>
                  ) : null}

                  <div className="mt-6 border-t border-primary/10 pt-6">
                    <h4 className="mb-2 text-sm font-bold text-on-surface">
                      Pedagogical Insight
                    </h4>
                    <p className="text-sm italic text-on-surface/70">{quiz.insight}</p>
                  </div>
                </>
              ) : (
                <p className="text-[0.9375rem] leading-relaxed text-on-surface/75">
                  Sélectionne une proposition puis valide pour afficher l’explication détaillée et
                  le point pédagogique clé.
                </p>
              )}
            </div>

            <div className="flex flex-col items-center rounded-[2rem] bg-surface-container-low p-8 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20">
                <Flame className="h-9 w-9" />
              </div>

              <h3 className="mb-1 text-xl font-bold text-on-surface">{quiz.streakTitle}</h3>
              <p className="mb-6 text-sm text-on-surface/60">{quiz.streakDescription}</p>

              {quiz.nextQuizId ? (
                <Link
                  href={`/quiz/${quiz.nextQuizId}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-on-surface px-5 py-3 font-bold text-surface transition-colors hover:bg-on-surface/90"
                >
                  Question suivante
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <div className="w-full rounded-xl bg-white/70 px-5 py-3 font-bold text-on-surface/60">
                  Dernière question disponible
                </div>
              )}

              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-on-surface/40">
                Série active : {quiz.streakDays} jours
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.main>
  );
}
