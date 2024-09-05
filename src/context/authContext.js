import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, verifyToken } from '../services/authService';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const [isTokenValid, setIsTokenValid] = useState(true);

  // Fonction pour se connecter
  const login = async (inputs) => {
    try {
      const userData = await loginService(inputs);
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  // Fonction pour se déconnecter
  const logout = async () => {
    try {
      await logoutService();
      setCurrentUser(null);
      localStorage.removeItem('user');
      
      window.location.href = '/login'; // Redirection vers la page de connexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Fonction pour vérifier la validité du token
  const checkTokenValidity = async () => {
    try {
      const response = await verifyToken();
      if (response.data.isValid) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
        await logout();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      setIsTokenValid(false);
      await logout();
    }
  };

  // Vérifier la validité du token lorsque le composant se monte
  // useEffect(() => {
  //   if (currentUser) {
  //     checkTokenValidity();
  //   }
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};
