// services.js
import { makeRequest } from '../axios';

// Service pour récupérer les suggestions d'utilisateurs
// userService.js

// Service pour récupérer les suggestions d'utilisateurs
export const getUserSuggestions = async () => {
  try {
    const response = await makeRequest.get('api/allUsers');
    return response.data;
  } catch (err) {
    console.error('Erreur lors de la récupération des suggestions d\'utilisateurs:', err.response ? err.response.data : err.message);
    throw new Error(err.message);
  }
};


// Service pour récupérer les utilisateurs suivis
// Service pour récupérer les utilisateurs suivis
export const getFollowedUsers = async (userId) => {
    try {
      const response = await makeRequest.get(`api/relationships?userId=${userId}`);
      console.log("Réponse brute de l'API pour les utilisateurs suivis :", response.data);
      return Array.from(response.data); // Convertir en tableau
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs suivis:', err.response ? err.response.data : err.message);
      throw new Error(err.message);
    }
  };
  
// Service pour suivre un utilisateur
export const followUser = async (userId) => {
  try {
    await makeRequest.post('api/relationships', { userId });
    console.log("Utilisateur suivi:", userId);
  } catch (err) {
    console.error('Erreur lors du suivi de l\'utilisateur:', err.response ? err.response.data : err.message);
    throw new Error(err.message);
  }
};

// Service pour ne plus suivre un utilisateur
export const unfollowUser = async (userId) => {
  try {
    await makeRequest.delete(`api/relationships?userId=${userId}`);
  } catch (err) {
    console.error('Erreur lors de la désinscription de l\'utilisateur:', err.response ? err.response.data : err.message);
    throw new Error(err.message);
  }
};
