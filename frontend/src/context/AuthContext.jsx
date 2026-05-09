import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        _id: 'user_123',
        name: email.split('@')[0],
        email: email,
        role: email === 'admin@salesvision.com' ? 'admin' : 'user',
        token: 'mock_jwt_token',
      };
      setUser(mockUser);
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      setLoading(false);
    }, 800);
    return { success: true };
  };

  const register = async (name, email, password) => {
    // Mock register
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        _id: 'user_456',
        name: name,
        email: email,
        role: 'user',
        token: 'mock_jwt_token',
      };
      setUser(mockUser);
      localStorage.setItem('userInfo', JSON.stringify(mockUser));
      setLoading(false);
    }, 800);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
