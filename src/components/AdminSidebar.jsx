'use client';

import Link from 'next/link';
import { LayoutDashboardIcon, BookOpenIcon, SettingsIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: 'Tableau de bord',
      href: '/admin',
      icon: LayoutDashboardIcon,
    },
    {
      label: 'Formations',
      href: '/admin/formations',
      icon: BookOpenIcon,
    },
    {
      label: 'Paramètres',
      href: '/admin/parametres',
      icon: SettingsIcon,
    },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-green-500 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white pt-16 md:pt-0 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:relative z-30`}>
        <div className="p-6 flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="font-bold text-lg">Admin</span>
        </div>

        <nav className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-green-500 transition"
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-red-500 transition">
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
        ></div>
      )}
    </>
  );
}
