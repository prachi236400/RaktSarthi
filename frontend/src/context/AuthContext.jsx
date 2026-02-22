import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Wrapper for setUser to also update localStorage
  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    if (token) {
      // Load cached user immediately for fast render
      const userData = localStorage.getItem('user');
      if (userData) {
        setUserState(JSON.parse(userData));
      }
      // Then fetch fresh profile from server
      userAPI.getProfile().then(res => {
        const freshUser = { ...res.data, id: res.data._id || res.data.id };
        setUser(freshUser);
      }).catch(err => {
        console.error('Failed to fetch profile:', err);
        // If token is invalid, clear auth state
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUserState(null);
        }
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const loginWithGoogle = async () => {
    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      
      // Send Google user info to backend for verification and user creation
      const response = await authAPI.googleLogin({
        email: googleUser.email,
        name: googleUser.displayName,
        googleId: googleUser.uid,
        photoURL: googleUser.photoURL,
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      console.error('Google login error:', error);
      return {
        success: false,
        message: error.message || 'Google login failed',
      };
    }
  };

  const value = {
    user,
    setUser,
    token,
    setToken,
    login,
    register,
    logout,
    loginWithGoogle,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
