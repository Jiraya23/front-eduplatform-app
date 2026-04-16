import CourseCard from './CourseCard';

export default function FeaturedCourses({ courses }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Formations Populaires</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les formations les plus suivies par la communauté EduPlattform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/cours" className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition transform hover:scale-105">
            Voir toutes les formations
          </a>
        </div>
      </div>
    </section>
  );
}
