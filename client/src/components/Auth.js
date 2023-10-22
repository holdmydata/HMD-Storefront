import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthState({ isAuthenticated: true, token });

  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState(null);

  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: You should also validate if the token is still valid
      setAuthState({ isAuthenticated: true, token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};