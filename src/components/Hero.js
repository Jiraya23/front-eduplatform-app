import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Apprenez à votre rythme, gratuitement ou à petit prix
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Découvrez des milliers de formations de qualité enseignées par des experts du Cameroun et d'ailleurs. En programmation, design, marketing et bien d'autres domaines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/cours" className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition transform hover:scale-105">
                <span>Explorez les formations</span>
                <ArrowRight size={20} />
              </Link>
              <button className="px-6 py-3 border-2 border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition">
                En savoir plus
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <p className="text-3xl font-bold text-green-600">6</p>
                <p className="text-gray-600">Formations</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">5K+</p>
                <p className="text-gray-600">Apprenants</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">4.7★</p>
                <p className="text-gray-600">Note moyenne</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-4">
                  <div className="h-12 bg-green-100 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="flex space-x-2 pt-4">
                    <div className="flex-1 h-8 bg-green-500 rounded flex items-center justify-center text-white text-sm font-medium">
                      Commencer
                    </div>
                    <div className="flex-1 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
