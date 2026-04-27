'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [level, setLevel] = useState('all');
  const [duration, setDuration] = useState('all');

  return (
    <div className="bg-[#eff4ff] p-6 rounded-[2rem] space-y-6 md:space-y-0 md:flex md:items-center md:space-x-4 shadow-sm">
      {/* Search Input */}
      <div className="flex-grow relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7b6c] w-5 h-5" />
        <input
          type="text"
          placeholder="Search for courses, skills, or mentors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-[#006e2f]/20 transition-all text-[#121c2a] placeholder:text-[#bccbb9]"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Level Dropdown */}
        <div className="relative min-w-[140px]">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full appearance-none bg-white py-4 pl-4 pr-10 rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-[#006e2f]/20 text-[#121c2a]"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7b6c] text-sm">▼</div>
        </div>

        {/* Duration Dropdown */}
        <div className="relative min-w-[140px]">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full appearance-none bg-white py-4 pl-4 pr-10 rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-[#006e2f]/20 text-[#121c2a]"
          >
            <option value="all">Duration</option>
            <option value="4weeks">0-4 Weeks</option>
            <option value="3months">1-3 Months</option>
            <option value="6months">6+ Months</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7b6c] text-sm">▼</div>
        </div>

        {/* Apply Button */}
        <button className="bg-[#121c2a] text-white py-4 px-8 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
