// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

const PATHS = {
  dashboard:
    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  books:
    'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  loans:
    'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  users:
    'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  library:
    'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
  myloans:
    'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
  profile:
    'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  add: 'M12 4v16m8-8H4',
  logout:
    'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
};

const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/books': 'Livres',
  '/admin/books/create': 'Ajouter un livre',
  '/admin/loans': 'Emprunts',
  '/admin/users': 'Utilisateurs',
  '/admin/users/create': 'Créer un utilisateur',
  '/library': 'Bibliothèque',
  '/my-loans': 'Mes Prêts',
  '/profile': 'Profil',
};

function getTitle(pathname) {
  if (pathname.startsWith('/admin/books/create')) return 'Ajouter un livre';
  if (pathname.startsWith('/admin/books/') && pathname.endsWith('/edit')) return 'Modifier un livre';
  if (pathname.startsWith('/admin/users/create')) return 'Créer un utilisateur';
  return PAGE_TITLES[pathname] ?? 'Librarium';
}

function getSection(pathname) {
  return pathname.startsWith('/admin') ? 'Admin' : 'User View';
}

function Icon({ name }) {
  return (
    <svg className="w-[18px] h-[18px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={PATHS[name]} />
    </svg>
  );
}

function NavItem({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
          isActive
            ? 'bg-blue-600/20 text-blue-400'
            : 'text-slate-400 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      <Icon name={icon} />
      {!collapsed && <span className="flex-1 whitespace-nowrap">{label}</span>}
    </NavLink>
  );
}

function SectionLabel({ text, collapsed }) {
  if (collapsed) return <div className="h-3" />;

  return (
    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 pt-4 pb-1.5">
      {text}
    </p>
  );
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const doLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside
        className={`flex flex-col bg-slate-900 h-screen shrink-0 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-56'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 text-white">
              <Icon name="books" />
            </div>

            {!collapsed && (
              <span className="text-white font-semibold text-sm whitespace-nowrap">
                Librarium
              </span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(current => !current)}
            className="text-slate-500 hover:text-white p-1 rounded shrink-0 text-base leading-none transition-colors"
            title={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
          >
            {collapsed ? '»' : '«'}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-0.5">
          <SectionLabel text="Admin" collapsed={collapsed} />

          <NavItem to="/admin/dashboard" icon="dashboard" label="Dashboard" collapsed={collapsed} />
          <NavItem to="/admin/books" icon="books" label="Livres" collapsed={collapsed} />
          <NavItem to="/admin/loans" icon="loans" label="Emprunts" collapsed={collapsed} />
          <NavItem to="/admin/users" icon="users" label="Utilisateurs" collapsed={collapsed} />

          <SectionLabel text="User View" collapsed={collapsed} />

          <NavItem to="/library" icon="library" label="Bibliothèque" collapsed={collapsed} />
          <NavItem to="/my-loans" icon="myloans" label="Mes Prêts" collapsed={collapsed} />
          <NavItem to="/profile" icon="profile" label="Profil" collapsed={collapsed} />

          <div className="mx-3 my-2 border-t border-white/10" />

          {pathname.startsWith('/admin') ? (
            <button
              onClick={() => navigate('/library')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <Icon name="library" />
              {!collapsed && <span>Voir côté User</span>}
            </button>
          ) : (
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <Icon name="dashboard" />
              {!collapsed && <span>Retour Admin</span>}
            </button>
          )}

          <button
            onClick={() => navigate('/admin/books/create')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <Icon name="add" />
            {!collapsed && <span>Ajouter un livre</span>}
          </button>

          <ThemeToggle collapsed={collapsed} />

          <button
            onClick={doLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all w-full text-red-400 hover:bg-red-500/10"
          >
            <Icon name="logout" />
            {!collapsed && <span>Déconnexion</span>}
          </button>
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{user?.name}</p>
                <p className="text-slate-500 text-[10px] truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-14 flex items-center px-5 gap-4 shrink-0">
          <button
            onClick={() => setCollapsed(current => !current)}
            className="p-2 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            title={collapsed ? 'Ouvrir le menu' : 'Réduire le menu'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2 text-sm flex-1">
            <span className="text-gray-400">{getSection(pathname)}</span>
            <span className="text-gray-300">›</span>
            <span className="font-semibold text-gray-900">{getTitle(pathname)}</span>
          </div>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}