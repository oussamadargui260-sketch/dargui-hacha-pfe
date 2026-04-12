import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  Users, 
  ClipboardList, 
  LogOut, 
  Library 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); 
    
 
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('userRole');

    console.log("Logout success");
    
  
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/books', icon: <Book size={20} />, label: 'Livres' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Utilisateurs' },
    { path: '/admin/loans', icon: <ClipboardList size={20} />, label: 'Emprunts' },
  ];

  return (
    <div className="d-flex flex-column vh-100 bg-dark text-white p-3 shadow-lg" style={{ width: '280px', position: 'fixed' }}>
     
      <div className="d-flex align-items-center gap-2 px-3 mb-5 py-2">
        <div className="bg-primary p-2 rounded-3">
          <Library size={24} className="text-white" />
        </div>
        <h4 className="fw-bold m-0 tracking-tight">AdminPanel</h4>
      </div>

      <div className="nav flex-column gap-2 flex-grow-1">
        {menuItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`nav-link d-flex align-items-center gap-3 p-3 rounded-3 transition-all ${
              location.pathname === item.path 
                ? 'bg-primary text-white shadow-sm' 
                : 'text-secondary hover-bg-dark-light'
            }`}
            style={{ textDecoration: 'none' }}
          >
            {item.icon}
            <span className="fw-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <hr className="text-secondary opacity-25 my-4" />

      <button 
        onClick={handleLogout}
        className="btn btn-link text-danger text-decoration-none d-flex align-items-center gap-3 p-3 rounded-3 w-100 border-0 outline-none shadow-none mt-auto"
        style={{ transition: 'all 0.3s ease' }}
      >
        <LogOut size={20} />
        <span className="fw-bold text-uppercase small tracking-wider">Déconnexion</span>
      </button>

    </div>
  );
};

export default Sidebar;