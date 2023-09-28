/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('login') === 'true' || false
  );

  let userId;
  const login = (id, role) => {
    setIsLoggedIn(true);
    userId = id;
    localStorage.setItem('login', 'true');
    localStorage.setItem('user_id', userId);
    if (role === 'admin') localStorage.setItem('admin', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    // setIsAdmin(false);
    userId = null;
    localStorage.setItem('login', 'false');
    localStorage.setItem('user_id', userId);
    localStorage.setItem('admin', 'false');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
