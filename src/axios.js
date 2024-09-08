import axios from 'axios';

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});



// Ajouter un intercepteur pour gérer les erreurs
makeRequest.interceptors.response.use(
  // Cette fonction est appelée pour les réponses réussies
  (response) => response, // Si tout se passe bien, renvoyer la réponse telle quelle
  (error) => { // Cette fonction est appelée en cas d'erreur de réponse
    // Vérifie si l'erreur est due à une authentification non autorisée
    if (error.response.status === 401 || error.response.status === 403) {
      // Supprimer le token d'accès (cookie) si l'utilisateur n'est plus autorisé
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Rediriger l'utilisateur vers la page de connexion
      window.location.href = "/login"; // Rediriger vers la page de connexion pour que l'utilisateur se reconnecte
    }
    
    // Rejeter l'erreur pour qu'elle puisse être gérée ailleurs dans le code
    return Promise.reject(error); // Rejeter l'erreur pour permettre à d'autres parties du code de la gérer ou l'afficher
  }
);
