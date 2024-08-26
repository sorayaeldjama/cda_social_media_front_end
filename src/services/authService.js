// src/services/authService.js
import { makeRequest } from "../../src/axios";

// Fonction pour gérer la connexion de l'utilisateur
export const login = async (credentials) => {
  try {
    const response = await makeRequest.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

// Fonction pour gérer la déconnexion de l'utilisateur
export const logout = async () => {
  try {
    const response = await makeRequest.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};
