export default function LessonProgress({ currentLesson, totalLessons }) {
  const progress = (currentLesson / totalLessons) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900">Progression de la leçon</span>
        <span className="text-sm text-gray-600">{currentLesson}/{totalLessons}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
