import React, { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, addComment } from "../../services/commentService"; // Importer les services
import moment from "moment";
import { Avatar } from "@mui/material";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext); // Contexte pour obtenir les informations de l'utilisateur actuel
  const [description, setDesc] = useState(""); // État local pour stocker la description du commentaire

  // Utilisation de useQuery pour récupérer les commentaires pour un post spécifique
  const { isLoading, error, data } = useQuery(
    ["comments", postId], // Clé de la requête, unique pour chaque post
    () => getComments(postId) // Appel du service pour récupérer les commentaires
  );

  const queryClient = useQueryClient(); // Client pour gérer les requêtes et mutations

  // Utilisation de useMutation pour ajouter un nouveau commentaire
  const mutation = useMutation(
    (newComment) => addComment(newComment), // Appel du service pour ajouter un commentaire
    {
      onSuccess: () => {
        // Lorsque l'ajout du commentaire réussit, invalider les requêtes de commentaires pour le post
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );

  // Fonction pour gérer le clic sur le bouton d'envoi
  const handleClick = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    mutation.mutate({ description, postId }); // Appeler la mutation pour ajouter le commentaire
    setDesc(""); // Réinitialiser la description du commentaire après l'envoi
  };

  // Fonction pour obtenir la première lettre du nom
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : ""; // Retourner la première lettre du nom
  };

  return (
    <div className="comments">
      {/* Affichage des commentaires */}
      {error
        ? "Something went wrong" // Message d'erreur si quelque chose se passe mal
        : isLoading
        ? "Loading..." // Message de chargement pendant la récupération des données
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="avatar">
                {/* Afficher une icône avec les initiales de l'auteur du commentaire */}
                <Avatar className="avatar">
                  {getInitials(comment.name)}
                </Avatar>
              </div>
              <div className="info">
                {/* Description du commentaire */}
                <p>{comment.description}</p>
              </div>
              <span className="date">
                {moment(comment.created_at).fromNow()} {/* Date du commentaire relative au moment présent */}
              </span>
            </div>
          ))}

      {/* Conteneur pour écrire un nouveau commentaire */}
      <div className="write">
        <Avatar className="avatar">
          {currentUser ? getInitials(currentUser.name) : ""}
        </Avatar>
        <input
          type="text"
          placeholder="Write a comment"
          value={description}
          onChange={(e) => setDesc(e.target.value)} // Mettre à jour l'état de la description
        />
        <button onClick={handleClick} disabled={mutation.isLoading}>
          {mutation.isLoading ? "Sending..." : "Send"} {/* Afficher un texte différent selon l'état de chargement */}
        </button>
      </div>
    </div>
  );
};

export default Comments;
