// ════════════════════════════════════════
// 📄 src/lib/api/quiz.js
// ════════════════════════════════════════

import { api } from './client';

/**
 * Récupérer le quiz d'une leçon
 * @param {number|string} leconId
 */
export async function getQuizByLecon(leconId) {
  const data = await api.get(`/lecons/${leconId}/quiz`);
  return data.data;
}

/**
 * Soumettre les réponses d'un quiz
 * @param {number|string} quizId
 * @param {{ reponses: { question_id: number, reponse_id: number }[] }} answers
 */
export async function submitQuiz(quizId, answers) {
  const data = await api.post(`/quizzes/${quizId}/submit`, answers);
  return data.data;
}

/**
 * Récupérer la leçon suivante après un quiz réussi
 * @param {number|string} leconId
 */
export async function getNextLecon(leconId) {
  const data = await api.get(`/lecons/${leconId}/next`);
  return data.data;
}
