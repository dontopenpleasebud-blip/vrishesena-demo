import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin as apiLogin } from '../services/api';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('vrishasena_admin_user') || localStorage.getItem('thaagam_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      localStorage.setItem('vrishasena_admin_token', data.token);
      localStorage.setItem('vrishasena_admin_user', JSON.stringify(data));
      setAdmin(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('vrishasena_admin_token');
    localStorage.removeItem('vrishasena_admin_user');
    localStorage.removeItem('thaagam_admin_token');
    localStorage.removeItem('thaagam_admin_user');
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, isAuthenticated: !!admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
