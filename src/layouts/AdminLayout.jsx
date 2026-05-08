import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      
      {/* Sidebar Container: Fixed width to prevent jumping */}
      <div style={{ width: '280px', flexShrink: 0, position: 'relative' }}>
        <Sidebar />
      </div>

      {/* Main Content Area: Fills the remaining space */}
      <div className="flex-grow-1 d-flex flex-column min-w-0">
        
        {/* Global Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="p-4" style={{ backgroundColor: '#f8fafc', flexGrow: 1 }}>
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;