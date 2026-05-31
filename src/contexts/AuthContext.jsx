// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockAuth } from '../mock/mockApi';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('lms_token');
    if (token) {
      mockAuth.getUser(token)
        .then(u => setUser(u))
        .catch(() => { localStorage.removeItem('lms_token'); localStorage.removeItem('lms_user_id'); })
        .finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await mockAuth.login(email, password);
    localStorage.setItem('lms_token', data.token);
    localStorage.setItem('lms_user_id', String(data.user.id));
    setUser(data.user); return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await mockAuth.register(payload);
    localStorage.setItem('lms_token', data.token);
    localStorage.setItem('lms_user_id', String(data.user.id));
    setUser(data.user); return data.user;
  }, []);

  const logout = useCallback(async () => {
    await mockAuth.logout();
    localStorage.removeItem('lms_token'); localStorage.removeItem('lms_user_id');
    setUser(null);
  }, []);

  const updateUser = useCallback(patch => setUser(p => ({ ...p, ...patch })), []);

  return <Ctx.Provider value={{ user, loading, login, logout, register, updateUser }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}