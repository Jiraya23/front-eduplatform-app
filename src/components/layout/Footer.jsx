import Link from 'next/link';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-container border-t border-surface-container-highest py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight font-headline">EduPlattform</span>
            </div>
            <p className="text-on-surface leading-relaxed">
              La plateforme d'apprentissage qui élève les talents et connecte les ambitions au succès à travers toute l'Afrique.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full border border-surface-container-highest flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-surface-container-highest flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full border border-surface-container-highest flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Platform Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs">Plateforme</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">À propos</Link></li>
              <li><Link href="#" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">Programmes</Link></li>
              <li><Link href="#" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">Aide & Support</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs">Légal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link href="#" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">Conditions d'utilisation</Link></li>
              <li><Link href="#" className="text-sm font-medium text-on-surface hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-bold text-on-surface uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-sm text-on-surface leading-relaxed">
              Recevez nos nouveaux cours et les opportunités de bourses directement dans votre boîte mail.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="bg-white rounded-xl text-sm px-4 py-3 w-full focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              />
              <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-surface-container-highest flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-on-surface">
            © 2024 EduPlattform. Fièrement construit pour les leaders de demain.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-xs font-bold text-on-surface tracking-widest uppercase">Douala • Abidjan • Dakar • Paris</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
