import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

function formatApiError(detail) {
  if (detail == null) return 'Something went wrong. Please try again.';
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === 'string' ? e.msg : JSON.stringify(e))).filter(Boolean).join(' ');
  if (detail && typeof detail.msg === 'string') return detail.msg;
  return String(detail);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // CRITICAL: If returning from OAuth callback, skip the /me check.
    // AuthCallback will exchange the session_id and establish the session first.
    if (window.location.hash?.includes('session_id=')) {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    setUser(data);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    }
    setUser(null);
  };

  const loginWithGoogle = () => {
    // MOCK: Simulate Google login as admin for UI testing
    setUser({ user_id: 'mock_google_admin', email: 'admin@operoo.com', name: 'Admin', role: 'admin' });
  };

  const mockLogin = (role) => {
    const profiles = {
      admin: { user_id: 'mock_admin', email: 'admin@operoo.com', name: 'Admin', role: 'admin' },
      manager: { user_id: 'mock_manager', email: 'manager@operoo.com', name: 'Maria Rossi', role: 'manager' },
      staff: { user_id: 'mock_staff', email: 'staff@operoo.com', name: 'Luca Bianchi', role: 'staff' },
    };
    setUser(profiles[role]);
  };

  const processGoogleCallback = async (sessionId) => {
    const { data } = await api.post('/auth/google/callback', { session_id: sessionId });
    setUser(data);
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, loginWithGoogle, mockLogin, processGoogleCallback, checkAuth, formatApiError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
