import React from 'react';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-white bg-white shadow-sm px-4 py-3 sticky-top">
      <div className="container-fluid">
        <div className="input-group bg-light rounded-pill px-3 py-1 w-25 border">
          <span className="input-group-text bg-transparent border-0"><Search size={18} className="text-muted" /></span>
          <input type="text" className="form-control bg-transparent border-0 shadow-none" placeholder="Rechercher..." />
        </div>
        
        <div className="d-flex align-items-center ms-auto gap-3">
          <div className="text-end d-none d-md-block">
            <div className="fw-bold text-dark lh-1">Admin User</div>
            <small className="text-muted">Administrator</small>
          </div>
          <div className="bg-primary rounded-circle shadow-sm" style={{ width: '40px', height: '40px' }}></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;