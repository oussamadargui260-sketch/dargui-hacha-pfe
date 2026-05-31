// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/* ── Admin topbar ── */
export function AdminTopbar({ title, onMenuClick }) {
  const { user } = useAuth();
  return (
    <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-4 shrink-0 sticky top-0 z-10">
      <button
        onClick={onMenuClick}
        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <div className="flex-1">
        <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-56
                      focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"/>
        </svg>
        <input placeholder="Rechercher…" className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"/>
      </div>

      {/* Notif + Avatar */}
      <div className="flex items-center gap-2">
        <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          {user?.name?.[0]?.toUpperCase() ?? 'A'}
        </div>
      </div>
    </header>
  );
}

/* ── User topbar/navbar ── */
export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen]  = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: '/library',  label: 'Bibliothèque' },
    { to: '/my-loans', label: 'Mes Prêts'    },
    { to: '/profile',  label: 'Profil'        },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </div>
          <span className="font-semibold text-gray-900 text-sm">Librarium</span>
        </div>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {links.map(l => (
            <NavLink
              key={l.to} to={l.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Avatar + logout */}
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden md:block text-xs text-gray-500">{user?.name}</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <button onClick={handleLogout}
            className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50">
            Déconnexion
          </button>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 py-2 px-4 flex flex-col gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
              {l.label}
            </NavLink>
          ))}
          <button onClick={handleLogout} className="text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50">
            Déconnexion
          </button>
        </div>
      )}
    </header>
  );
}