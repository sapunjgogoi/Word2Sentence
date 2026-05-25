import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await API.get('/auth/me');
        if (response.data?.success) {
          setUser(response.data.data.user);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Failed to load user profile:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  // Register
  const register = async (username, email, password, level) => {
    try {
      const response = await API.post('/auth/register', {
        username,
        email,
        password,
        level,
      });
      if (response.data?.success) {
        const { token, user: newUser } = response.data.data;
        localStorage.setItem('token', token);
        setUser(newUser);
        return { success: true };
      }
      return { success: false, message: response.data?.message || 'Registration failed' };
    } catch (err) {
      console.error('Registration failed:', err);
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Registration error',
      };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      if (response.data?.success) {
        const { token, user: loggedUser } = response.data.data;
        localStorage.setItem('token', token);
        setUser(loggedUser);
        return { success: true };
      }
      return { success: false, message: response.data?.message || 'Login failed' };
    } catch (err) {
      console.error('Login failed:', err);
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Login error',
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Social Login (Google, Apple, GitHub)
  const socialLogin = async (email, username, provider, providerId) => {
    try {
      const response = await API.post('/auth/social-login', {
        email,
        username,
        provider,
        providerId,
      });
      if (response.data?.success) {
        const { token, user: newUser } = response.data.data;
        localStorage.setItem('token', token);
        setUser(newUser);
        return { success: true };
      }
      return { success: false, message: response.data?.message || 'Social login failed' };
    } catch (err) {
      console.error('Social login failed:', err);
      return {
        success: false,
        message: err.response?.data?.message || err.message || 'Social login error',
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, socialLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
