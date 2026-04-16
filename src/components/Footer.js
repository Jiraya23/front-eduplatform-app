import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-lg font-bold">EduPlattform</span>
            </div>
            <p className="text-gray-400 text-sm">
              La plateforme d'apprentissage moderne du Cameroun. Apprenez à votre rythme, gratuitement ou à petit prix.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-green-500 transition">Accueil</Link></li>
              <li><Link href="/cours" className="hover:text-green-500 transition">Formations</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition">À propos</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-green-500 transition">Programmation</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition">Design</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition">Marketing</Link></li>
              <li><Link href="#" className="hover:text-green-500 transition">Affaires</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+237 650 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@eduplatform.cm</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Yaoundé, Cameroun</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 EduPlattform. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-green-500 transition">Conditions d'utilisation</Link>
              <Link href="#" className="hover:text-green-500 transition">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
