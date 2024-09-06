// src/services/commentService.js
import { makeRequest } from "../../src/axios";

// Fonction pour récupérer les commentaires d'un post spécifique
export const getComments = async (postId) => {
  try {
    const response = await makeRequest.get(`api/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    throw error;
  }
};

// Fonction pour ajouter un nouveau commentaire
export const addComment = async (newComment) => {
  try {
    const response = await makeRequest.post("api/comments", newComment);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire :", error);
    throw error;
  }
};
