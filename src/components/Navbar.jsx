import React from 'react';
import { Search, Bell, Settings, User, Command } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand bg-white px-4 py-2 sticky-top border-bottom" 
         style={{ marginLeft: '280px', height: '70px', borderColor: '#f1f5f9 !important' }}>
      <div className="container-fluid">
        
        {/* Global Search Bar - Command Style */}
        <div className="d-flex align-items-center bg-light rounded-3 px-3 py-1 border border-light-subtle" 
             style={{ width: '400px', transition: 'all 0.3s ease' }}>
          <Search size={18} className="text-secondary" />
          <input 
            type="text" 
            className="form-control bg-transparent border-0 shadow-none ps-3 fw-medium" 
            placeholder="Rechercher un livre, un membre..." 
            style={{ fontSize: '14px' }}
          />
          <div className="d-flex align-items-center gap-1 bg-white border rounded-2 px-2 py-1 shadow-sm opacity-75">
             <Command size={12} className="text-muted" />
             <span className="text-muted fw-bold" style={{ fontSize: '10px' }}>K</span>
          </div>
        </div>
        
        {/* Right Section: Actions & Profile */}
        <div className="d-flex align-items-center ms-auto gap-4">
          
          {/* Notifications & Settings Quick Links */}
          <div className="d-flex align-items-center gap-2 border-end pe-4 me-2 border-light-subtle">
            <button className="btn btn-link text-secondary p-2 rounded-circle hover-bg-light position-relative border-0 shadow-none">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>
            <button className="btn btn-link text-secondary p-2 rounded-circle hover-bg-light border-0 shadow-none">
              <Settings size={20} />
            </button>
          </div>

          {/* Profile Section */}
          <div className="d-flex align-items-center gap-3 pe-2" style={{ cursor: 'pointer' }}>
            <div className="text-end d-none d-md-block">
              <div className="fw-bold text-slate-800 lh-1 mb-1" style={{ fontSize: '14px' }}>Oussama Dargui</div>
              <span className="badge bg-indigo-soft text-indigo fw-bold text-uppercase" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>
                Administrateur
              </span>
            </div>
            
            {/* Avatar with Gradient */}
            <div className="position-relative">
               <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm border border-2 border-white" 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                      color: 'white'
                    }}>
                 <User size={20} />
               </div>
               <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-white border-2 rounded-circle"></span>
            </div>
          </div>

        </div>
      </div>

      <style>
        {`
          .bg-indigo-soft { background-color: rgba(99, 102, 241, 0.1); }
          .text-indigo { color: #6366f1; }
          .text-slate-800 { color: #1e293b; }
          .hover-bg-light:hover { background-color: #f8fafc; color: #6366f1 !important; }
          
          /* Custom focus effect for search */
          .bg-light:focus-within {
            background-color: white !important;
            border-color: #6366f1 !important;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1) !important;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;