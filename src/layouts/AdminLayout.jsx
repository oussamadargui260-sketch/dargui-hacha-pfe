import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Users, ArrowLeftRight,
  Bell, Settings, LogOut, Plus, Search, Menu, X
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Tableau de Bord' },
  { to: '/admin/books',     icon: BookOpen,        label: 'Gestion Livres' },
  { to: '/admin/users',     icon: Users,           label: 'Utilisateurs' },
  { to: '/admin/loans',     icon: ArrowLeftRight,  label: 'Prêts & Retours' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div style={styles.wrap}>
      {/* SIDEBAR */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? 220 : 64 }}>
        <div style={styles.logoArea}>
          <div style={styles.logoMark}>
            <div style={styles.logoIcon}>
              <BookOpen size={18} color="#0D0D0F" strokeWidth={2} />
            </div>
            {sidebarOpen && (
              <span style={styles.logoName}>BiblioTech</span>
            )}
          </div>
          {sidebarOpen && (
            <div style={styles.logoSub}>Admin Dashboard</div>
          )}
        </div>

        <nav style={styles.navSection}>
          {sidebarOpen && <div style={styles.navLabel}>Principal</div>}
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                padding: sidebarOpen ? '9px 10px' : '10px',
              })}
            >
              <Icon size={17} strokeWidth={1.8} />
              {sidebarOpen && <span style={{ marginLeft: 10 }}>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.userBlock}>
            <div style={styles.avatar}>OD</div>
            {sidebarOpen && (
              <div style={styles.userInfo}>
                <div style={styles.userName}>Oussama Dargui</div>
                <div style={styles.userRole}>Administrateur</div>
              </div>
            )}
          </div>
          <button
            style={styles.logoutBtn}
            onClick={() => navigate('/login')}
            title="Quitter la session"
          >
            <LogOut size={15} />
            {sidebarOpen && <span style={{ marginLeft: 8 }}>Quitter la session</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={styles.main}>
        {/* TOPBAR */}
        <header style={styles.topbar}>
          <button
            style={styles.menuBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={styles.searchBox}>
            <Search size={14} color="var(--text3)" />
            <input
              style={styles.searchInput}
              type="text"
              placeholder="Rechercher un livre, membre..."
            />
            <span style={styles.searchKbd}>⌘K</span>
          </div>

          <div style={styles.topbarActions}>
            <button style={styles.iconBtn} aria-label="Notifications">
              <Bell size={16} />
              <span style={styles.notifDot} />
            </button>
            <button style={styles.iconBtn} aria-label="Paramètres">
              <Settings size={16} />
            </button>
            <button style={styles.addBtn} onClick={() => navigate('/admin/books/new')}>
              <Plus size={14} />
              Ajouter un livre
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--surface)',
  },
  sidebar: {
    background: 'var(--ink)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.2s ease',
    flexShrink: 0,
    overflow: 'hidden',
  },
  logoArea: {
    padding: '28px 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  logoMark: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  logoIcon: {
    width: 34,
    height: 34,
    background: 'var(--gold)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoName: {
    fontFamily: 'Syne, sans-serif',
    fontSize: 15,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
  },
  logoSub: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginLeft: 44,
    whiteSpace: 'nowrap',
  },
  navSection: {
    padding: '20px 12px 8px',
    flex: 1,
  },
  navLabel: {
    fontSize: 9,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.25)',
    padding: '0 10px',
    marginBottom: 8,
    whiteSpace: 'nowrap',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 2,
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    textDecoration: 'none',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  navItemActive: {
    background: 'var(--gold)',
    color: 'var(--ink)',
    fontWeight: 500,
  },
  sidebarFooter: {
    padding: '16px 12px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  userBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 8px',
    borderRadius: 8,
    marginBottom: 4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: 'var(--gold)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--ink)',
    flexShrink: 0,
  },
  userInfo: {
    overflow: 'hidden',
  },
  userName: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  userRole: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 8px',
    borderRadius: 8,
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    width: '100%',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topbar: {
    background: '#fff',
    borderBottom: '1px solid var(--border)',
    padding: '0 28px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0,
  },
  menuBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    border: '1px solid var(--border2)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text2)',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'var(--surface)',
    border: '1px solid var(--border2)',
    borderRadius: 8,
    padding: '7px 12px',
    flex: 1,
    maxWidth: 260,
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    fontSize: 13,
    color: 'var(--text)',
    outline: 'none',
    flex: 1,
  },
  searchKbd: {
    fontSize: 11,
    color: 'var(--text3)',
    background: 'var(--surface2)',
    borderRadius: 4,
    padding: '2px 5px',
  },
  topbarActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    border: '1px solid var(--border2)',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text2)',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--rose)',
    border: '1.5px solid #fff',
  },
  addBtn: {
    background: 'var(--ink)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    fontSize: 12,
    fontFamily: 'Syne, sans-serif',
    fontWeight: 600,
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: 28,
  },
};