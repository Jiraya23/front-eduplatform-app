'use client';

import Link from 'next/link';
import { Menu, X, BookOpen, LogOut, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

const NAV_LINKS = [
  { label: 'Accueil',    href: '/' },
  { label: 'Formations', href: '/formations' },
  { label: 'Communauté', href: '/communaute' },
  { label: 'Contact',    href: '/contact' },
];

// ── Avatar initiales ─────────────────────────────────────────
function Avatar({ user }) {
  const initials = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .map(n => n[0].toUpperCase())
    .join('') || user?.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold select-none">
      {initials}
    </div>
  );
}

// ── Dropdown apprenant ────────────────────────────────────────
function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 rounded-2xl px-3 py-1.5 hover:bg-[#eff4ff] transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Avatar user={user} />
        <span className="hidden sm:block text-sm font-semibold text-[#121c2a] max-w-[120px] truncate">
          {fullName}
        </span>
        <ChevronDown
          size={15}
          strokeWidth={2.5}
          className={`text-[#121c2a]/50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-[0_12px_40px_-8px_rgba(18,28,42,0.15)] border border-[#dee9fc] py-2 z-50">
          {/* Infos user */}
          <div className="px-4 py-3 border-b border-[#eff4ff]">
            <p className="text-xs font-bold text-[#121c2a] truncate">{fullName}</p>
            <p className="text-[11px] text-[#121c2a]/50 truncate">{user?.email}</p>
          </div>

          <Link
            href="/mon-espace"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#121c2a] hover:bg-[#eff4ff] transition-colors"
          >
            <User size={15} strokeWidth={2} />
            Mon espace
          </Link>

          <Link
            href="/formations"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#121c2a] hover:bg-[#eff4ff] transition-colors"
          >
            <BookOpen size={15} strokeWidth={2} />
            Mes formations
          </Link>

          <div className="border-t border-[#eff4ff] mt-1 pt-1">
            <button
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} strokeWidth={2} />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Navbar principale ─────────────────────────────────────────
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthContext();

  return (
    <nav className="fixed top-0 w-full z-50 glass-header">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">

        {/* Logo */}
        <Link href="/formations" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
              <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 011 1v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6zm11 4a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight font-headline text-on-surface">EduPlattform</span>
        </Link>

        {/* Desktop Nav links */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="text-sm font-semibold hover:text-primary transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* CTA — visiteur ou apprenant */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold hover:opacity-70 transition-opacity">
                Connexion
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-primary hover:shadow-hover text-white px-7 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-surface-container-highest">
          <div className="px-6 py-4 space-y-4">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setIsOpen(false)}
                className="block text-sm font-semibold hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#eff4ff] space-y-3">
              {isAuthenticated ? (
                <>
                  <Link href="/mon-espace" onClick={() => setIsOpen(false)}
                    className="block text-sm font-semibold hover:text-primary transition-colors">
                    Mon espace
                  </Link>
                  <button onClick={() => { setIsOpen(false); logout(); }}
                    className="block w-full text-left text-sm font-semibold text-red-500 hover:opacity-70 transition-opacity">
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}
                    className="block text-sm font-semibold hover:text-primary transition-colors">
                    Connexion
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}
                    className="block text-sm font-semibold text-primary hover:opacity-70 transition-opacity">
                    S&apos;inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
