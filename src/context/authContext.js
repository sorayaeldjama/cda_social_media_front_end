import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, verifyToken } from '../services/authService';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Provider du contexte d'authentification
export const AuthContextProvider = ({ children }) => {
  // État pour stocker l'utilisateur actuellement connecté, récupéré du localStorage ou initialisé à null
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  
  // État pour vérifier la validité du token
  const [isTokenValid, setIsTokenValid] = useState(true);

  // Fonction pour se connecter
  const login = async (inputs) => {
    try {
      // Appelle le service de connexion pour obtenir les données utilisateur
      const userData = await loginService(inputs);
      
      // Met à jour l'état avec les données utilisateur
      setCurrentUser(userData);
      
      // Stocke les données utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      // Gestion des erreurs en cas d'échec de connexion
      console.error('Erreur lors de la connexion:', error);
    }
  };

  // Fonction pour se déconnecter
  const logout = async () => {
    try {
      // Appelle le service de déconnexion
      await logoutService();
      
      // Réinitialise l'état utilisateur à null
      setCurrentUser(null);
      
      // Supprime les données utilisateur du localStorage
      localStorage.removeItem('user');
      
      // Redirection vers la page de connexion
      window.location.href = '/login'; 
    } catch (error) {
      // Gestion des erreurs en cas d'échec de déconnexion
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Fournit les valeurs du contexte aux composants enfants
  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};
