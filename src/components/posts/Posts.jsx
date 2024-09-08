// Importation des composants et des bibliothèques nécessaires
import Post from "../post/Post"; // Importation du composant Post
import "./posts.scss"; // Importation des styles associés au composant Posts
import { useQuery } from "@tanstack/react-query"; // Importation du hook useQuery pour la gestion des requêtes
import { makeRequest } from "../../axios"; // Importation de la configuration Axios personnalisée
import React, { useContext } from "react"; // Importation de React et du hook useContext
import { DarkModeContext } from "../../context/darkModeContext"; // Importation du contexte DarkMode
import CircularProgress from '@mui/material/CircularProgress';

// Définition du composant Posts
const Posts = ({ userId }) => {
  // Accès au mode sombre à partir du contexte
  const { darkMode } = useContext(DarkModeContext);

  // Utilisation du hook useQuery pour récupérer les posts depuis l'API
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("api/posts?userId=" + userId).then((res) => res.data)
  );

  // Gestion des états de chargement et d'erreur
  if (error) return <div>Quelque chose s'est mal passé</div>; // Affiche un message en cas d'erreur
  if (isLoading) return <div>      <CircularProgress /></div>; // Affiche un loader pendant le chargement des données

  // Vérification des clés dupliquées dans les posts
  const ids = data?.map(post => post.id); // Récupère les IDs des posts
  const uniqueIds = new Set(ids); // Crée un Set pour vérifier les IDs uniques
  if (uniqueIds.size !== ids.length) { // Si le nombre d'IDs uniques est différent du nombre total d'IDs
    console.error("Des clés dupliquées ont été détectées:", ids); // Affiche un message d'erreur dans la console
  }

  // Rendu du composant Posts
  return (
    <div className="posts">
      {data?.map((post, index) => (
        // Affiche chaque post en utilisant le composant Post
        // La clé est composée de l'ID du post et de l'index pour éviter les conflits de clés
        <Post post={post} key={`${post.id}-${index}`} />
      ))}
    </div>
  );
};

export default Posts; // Exportation du composant pour l'utiliser ailleurs dans l'application
