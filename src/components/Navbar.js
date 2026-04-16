'use client';

import Link from 'next/link';
import { useState } from 'react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EduPlattform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Accueil
            </Link>
            <Link href="/cours" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Formations
            </Link>
            <Link href="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 transition">
              Admin
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/connexion" className="px-4 py-2 text-gray-700 font-medium hover:text-green-600 transition">
              Connexion
            </Link>
            <Link href="/inscription" className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition">
              S'inscrire
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600">
              Accueil
            </Link>
            <Link href="/cours" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600">
              Formations
            </Link>
            <Link href="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600">
              Admin
            </Link>
            <div className="px-3 py-2 space-y-2">
              <Link href="/connexion" className="block px-4 py-2 text-gray-700 font-medium hover:text-green-600">
                Connexion
              </Link>
              <Link href="/inscription" className="block px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 text-center">
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
