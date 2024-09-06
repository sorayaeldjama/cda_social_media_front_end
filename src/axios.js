import axios from 'axios';

export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});


// import axios from "axios";

// export const makeRequest = axios.create({
//   baseURL: ["https://cda-social-media-back-end.onrender.com/api",'https://cda-social-media-front-end.vercel.app'],
//   withCredentials: true,
// });
// Ajouter un intercepteur pour gérer les erreurs
makeRequest.interceptors.response.use(
  (response) => response, // Si tout se passe bien, renvoyer la réponse
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Supprimer le token si nécessaire
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Rediriger vers la page de login
      window.location.href = "/login"; // Utilise router.push("/login") si tu utilises Next.js
    }
    return Promise.reject(error); // Rejeter l'erreur pour la gestion ailleurs
  }
);