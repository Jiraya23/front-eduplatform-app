'use client';

import { quizzes } from '@/lib/data';
import QuizQuestion from '@/components/QuizQuestion';
import Link from 'next/link';
import { useState, use } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function QuizPage({ params }) {
  const { quizId } = use(params);
  const quiz = quizzes.find(q => q.id === parseInt(quizId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Quiz non trouvé</p>
          <Link href="/cours" className="text-green-600 hover:text-green-700">
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const newAnswers = [...answers, { questionIndex: currentQuestionIndex, isCorrect }];
    setAnswers(newAnswers);

    // Move to next question or show results
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 2000);
    } else {
      setShowResults(true);
    }
  };

  const percentage = Math.round((score / quiz.questions.length) * 100);
  const isPassed = percentage >= 70;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            {isPassed ? (
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            ) : (
              <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz terminé!</h1>
          <p className="text-gray-600 mb-6">
            Voici votre résultat
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-5xl font-bold text-green-600 mb-2">{percentage}%</p>
            <p className="text-gray-600">
              {score} sur {quiz.questions.length} réponses correctes
            </p>
          </div>

          <div className={`mb-6 p-4 rounded-lg ${
            isPassed
              ? 'bg-green-50 border border-green-200'
              : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <p className={`font-semibold ${
              isPassed
                ? 'text-green-900'
                : 'text-yellow-900'
            }`}>
              {isPassed
                ? '🎉 Félicitations ! Vous avez réussi le quiz !'
                : 'Continuez vos efforts pour réussir au prochain essai!'}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setAnswers([]);
                setShowResults(false);
              }}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Recommencer le quiz
            </button>
            <Link
              href="/cours"
              className="block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Retour aux formations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cours" className="text-green-600 hover:text-green-700 font-medium mb-4 block">
            ← Retour
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          <p className="text-gray-600">
            Question {currentQuestionIndex + 1} sur {quiz.questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-right">{Math.round(progress)}%</p>
        </div>

        {/* Question */}
        <QuizQuestion question={currentQuestion} onAnswerSubmit={handleAnswerSubmit} />

        {/* Score Indicator */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Réponses correctes: <span className="font-bold text-green-600">{score}/{quiz.questions.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
