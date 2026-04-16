import Link from 'next/link';
import { Star, Clock, Users, Award } from 'lucide-react';

export default function CourseCard({ course }) {
  return (
    <Link href={`/cours/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
        {/* Image */}
        <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300"></div>
          <span className="text-white font-bold text-2xl text-center px-4">{course.title}</span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-gray-600 mb-3">
            Par {course.instructor}
          </p>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({course.rating})</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Meta info */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Award size={14} />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Users size={14} />
              <span>{course.students}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-green-600">
              {course.price === 'Gratuit' ? (
                <span className="text-green-600 font-semibold">{course.price}</span>
              ) : (
                <span className="text-gray-900">{course.price}</span>
              )}
            </div>
            <button className="px-3 py-2 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition">
              Voir
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
