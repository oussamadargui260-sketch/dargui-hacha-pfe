// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Typically, there's a getCurrentUser call that verifies the token.
      // If authService doesn't have an API call for me(), we just use the user from localStorage
      // which getCurrentUser does. However, it's safer to verify.
      // Assuming getCurrentUser just reads from local storage for now:
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      } else {
        authService.logout();
      }
      setLoading(false);
    } else { setLoading(false); }
  }, []);

  const login = useCallback(async (email, password) => {
    const userData = await authService.login(email, password);
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (payload) => {
    // Assuming backend returns same structure as login
    const data = await authService.register(payload);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(async () => {
    authService.logout();
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