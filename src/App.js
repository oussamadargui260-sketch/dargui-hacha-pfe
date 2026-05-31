import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Landing from './pages/user/Landing';
import BookDetails from './pages/user/BookDetails';

import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Dashboard from './pages/admin/Dashboard';
import Books from './pages/admin/Books';
import CreateBook from './pages/admin/CreateBook';
import EditBook from './pages/admin/EditBook';
import Loans from './pages/admin/Loans';
import Users from './pages/admin/Users';
import CreateUser from './pages/admin/CreateUser';

import Library from './pages/user/Library';
import MyLoans from './pages/user/Myloans';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';

import './styles/globals.css';

function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  );
}

function PublicHome() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Landing />;

  return (
    <Navigate
      to={user.role === 'admin' ? '/admin/dashboard' : '/library'}
      replace
    />
  );
}

function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === 'admin' ? '/admin/dashboard' : '/library'}
        replace
      />
    );
  }

  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicHome />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <PrivateRoute role="admin">
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="books/create" element={<CreateBook />} />
              <Route path="books/:id/edit" element={<EditBook />} />
              <Route path="loans" element={<Loans />} />
              <Route path="users" element={<Users />} />
              <Route path="users/create" element={<CreateUser />} />
            </Route>

            <Route
              element={
                <PrivateRoute>
                  <UserLayout />
                </PrivateRoute>
              }
            >
              <Route path="/library" element={<Library />} />
              <Route path="/library/:id" element={<BookDetails />} />
              <Route path="/my-loans" element={<MyLoans />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}