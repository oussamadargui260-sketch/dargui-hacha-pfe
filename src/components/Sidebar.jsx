import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  ClipboardList, 
  LogOut, 
  Library,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); 
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Tableau de Bord' },
    { path: '/admin/books', icon: <Book size={20} />, label: 'Gestion Livres' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Utilisateurs' },
    { path: '/admin/loans', icon: <ClipboardList size={20} />, label: 'Prêts & Retours' },
  ];

  // Styles custom bach mat-7tajch t-zid dossier CSS kher
  const sidebarStyle = {
    width: '280px',
    position: 'fixed',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', // Deep Navy gradient
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    zIndex: 1000
  };

  return (
    <div className="d-flex flex-column vh-100 text-white p-3 shadow-lg" style={sidebarStyle}>
      
      {/* Brand Logo Area */}
      <div className="d-flex align-items-center gap-3 px-3 mb-5 py-3">
        <div className="shadow-sm d-flex align-items-center justify-content-center" 
             style={{ 
               background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)', 
               width: '42px', 
               height: '42px', 
               borderRadius: '12px' 
             }}>
          <Library size={24} className="text-white" />
        </div>
        <div>
          <h5 className="fw-bold m-0 tracking-tight" style={{ letterSpacing: '-0.5px' }}>BiblioTech</h5>
          <span className="text-secondary" style={{ fontSize: '10px', textTransform: 'uppercase' }}>Admin Dashboard</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="nav flex-column gap-2 flex-grow-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-link d-flex align-items-center justify-content-between p-3 rounded-3 transition-all ${
                isActive 
                  ? 'text-white shadow-sm' 
                  : 'text-secondary opacity-75 hover-link'
              }`}
              style={{ 
                textDecoration: 'none',
                background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                borderLeft: isActive ? '4px solid #6366f1' : '4px solid transparent',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <span style={{ color: isActive ? '#818cf8' : 'inherit' }}>{item.icon}</span>
                <span className="fw-medium" style={{ fontSize: '14.5px' }}>{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} className="opacity-50" />}
            </Link>
          );
        })}
      </div>

      {/* Footer / Logout */}
      <div className="mt-auto pt-4 border-top border-secondary border-opacity-10">
        <button 
          onClick={handleLogout}
          className="btn btn-link text-decoration-none d-flex align-items-center gap-3 p-3 rounded-3 w-100 border-0 logout-btn"
          style={{ 
            color: '#f87171',
            transition: 'all 0.3s ease'
          }}
        >
          <LogOut size={20} />
          <span className="fw-bold text-uppercase" style={{ fontSize: '12px', letterSpacing: '1px' }}>Quitter la Session</span>
        </button>
      </div>

      {/* Add this small CSS block to your App.css or index.css for the hover effects */}
      <style>
        {`
          .hover-link:hover {
            background: rgba(255, 255, 255, 0.03) !important;
            color: white !important;
            opacity: 1 !important;
          }
          .logout-btn:hover {
            background: rgba(239, 68, 68, 0.1) !important;
            transform: translateX(5px);
          }
          .transition-all { transition: all 0.2s ease-in-out; }
        `}
      </style>
    </div>
  );
};

export default Sidebar;