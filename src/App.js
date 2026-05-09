import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard   from './pages/admin/Dashboard';
import Books       from './pages/admin/Books';
import Users       from './pages/admin/Users';
import Loans       from './pages/admin/Loans';
import Login       from './pages/auth/Login';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books"     element={<Books />} />
          <Route path="users"     element={<Users />} />
          <Route path="loans"     element={<Loans />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}