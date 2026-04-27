'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 011 1v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6zm11 4a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path>
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight font-headline text-on-surface">EduPlattform</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/formations" className="text-sm font-semibold hover:text-primary transition-colors">Cours</Link>
          <Link href="#" className="text-sm font-semibold hover:text-primary transition-colors">Bourses</Link>
          <Link href="#" className="text-sm font-semibold hover:text-primary transition-colors">Mentors</Link>
          <Link href="#" className="text-sm font-semibold hover:text-primary transition-colors">Communauté</Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="hidden sm:block text-sm font-bold hover:opacity-70 transition-opacity">Connexion</Link>
          <Link href="/signup" className="bg-gradient-primary hover:shadow-hover text-white px-7 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
            S&apos;inscrire
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-surface-container-highest">
          <div className="px-6 py-4 space-y-4">
            <Link href="#" className="block text-sm font-semibold hover:text-primary transition-colors">Cours</Link>
            <Link href="#" className="block text-sm font-semibold hover:text-primary transition-colors">Bourses</Link>
            <Link href="#" className="block text-sm font-semibold hover:text-primary transition-colors">Mentors</Link>
            <Link href="#" className="block text-sm font-semibold hover:text-primary transition-colors">Communauté</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
