import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar'; 

const AdminLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
     
      <div style={{ width: '280px', flexShrink: 0 }}>
        <Sidebar />
      </div>

      
      <div className="flex-grow-1 overflow-hidden">
        <main className="p-4">
       
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;