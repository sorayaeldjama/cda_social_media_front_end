// src/services/authService.js
import { makeRequest } from "../../src/axios.js";

// Fonction pour gérer la connexion de l'utilisateur
export const login = async (credentials) => {
  try {
    const response = await makeRequest.post("api/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

// Fonction pour gérer la déconnexion de l'utilisateur
export const logout = async () => {
  try {
    const response = await makeRequest.post("api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};
// frontend/services/authService.js

export const verifyToken = async () => {
  try {
    await makeRequest.get('/api/verifytoken');
    return true;
  } catch (error) {
    console.error('Token invalide ou expiré', error);
    return false;
  }
};

