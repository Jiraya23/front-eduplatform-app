'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function QuizQuestion({ question, onAnswerSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      setFeedback({
        isCorrect,
        message: isCorrect
          ? 'Bravo! C\'est la bonne réponse.'
          : `La bonne réponse est: ${question.options[question.correctAnswer]}`,
        explanation: question.explanation,
      });
      setSubmitted(true);
      onAnswerSubmit(isCorrect);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Question */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !submitted && setSelectedAnswer(index)}
            disabled={submitted}
            className={`w-full p-4 text-left rounded-lg border-2 transition ${
              selectedAnswer === index
                ? submitted
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-green-500 bg-green-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            } ${submitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === index
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className={`font-medium ${
                selectedAnswer === index
                  ? submitted
                    ? index === question.correctAnswer
                      ? 'text-green-700'
                      : 'text-red-700'
                    : 'text-green-700'
                  : 'text-gray-900'
              }`}>
                {option}
              </span>
              {submitted && index === question.correctAnswer && (
                <CheckCircle className="text-green-500 ml-auto" size={20} />
              )}
              {submitted && selectedAnswer === index && index !== question.correctAnswer && (
                <XCircle className="text-red-500 ml-auto" size={20} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`mb-8 p-4 rounded-lg ${
          feedback.isCorrect
            ? 'bg-green-50 border border-green-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start space-x-3">
            {feedback.isCorrect ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={24} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
            )}
            <div>
              <p className={`font-semibold mb-2 ${
                feedback.isCorrect ? 'text-green-900' : 'text-red-900'
              }`}>
                {feedback.message}
              </p>
              <p className={`text-sm ${
                feedback.isCorrect ? 'text-green-800' : 'text-red-800'
              }`}>
                {feedback.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
            selectedAnswer === null
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          Valider la réponse
        </button>
      ) : (
        <button
          onClick={() => {
            setSelectedAnswer(null);
            setSubmitted(false);
            setFeedback(null);
          }}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Nouvelle question
        </button>
      )}
    </div>
  );
}
