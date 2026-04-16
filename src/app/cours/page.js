'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/lib/data';

export default function CoursesPage() {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    level: [],
    duration: [],
    price: []
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterCourses(term, filters);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    } else {
      newFilters[filterType] = [...newFilters[filterType], value];
    }
    setFilters(newFilters);
    filterCourses(searchTerm, newFilters);
  };

  const filterCourses = (search, filterSettings) => {
    let result = courses;

    // Filter by search term
    if (search) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by level
    if (filterSettings.level.length > 0 && !filterSettings.level.includes('Tous')) {
      result = result.filter(course => filterSettings.level.includes(course.level));
    }

    // Filter by price
    if (filterSettings.price.length > 0 && !filterSettings.price.includes('Tous')) {
      result = result.filter(course => {
        if (filterSettings.price.includes('Gratuit'))  {
          return course.price === 'Gratuit';
        }
        if (filterSettings.price.includes('Payant')) {
          return course.price !== 'Gratuit';
        }
        return true;
      });
    }

    setFilteredCourses(result);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catalogue des Formations</h1>
          <p className="text-lg text-gray-600">
            Trouvez la formation parfaite pour développer vos compétences
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidesidebar with Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <Filters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Aucune formation ne correspond à votre recherche.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">
                    {filteredCourses.length} formation{filteredCourses.length !== 1 ? 's' : ''} trouvée{filteredCourses.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
