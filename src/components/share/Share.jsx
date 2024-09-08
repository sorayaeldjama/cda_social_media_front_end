// Importation des styles et des dépendances nécessaires
import "./share.scss"; // Importation des styles spécifiques au composant
import { useContext, useState, useRef, useEffect } from "react"; // Hooks React pour gérer l'état et le cycle de vie
import { AuthContext } from "../../context/authContext"; // Contexte pour accéder aux informations de l'utilisateur connecté
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Hooks pour gérer les mutations et les requêtes
import { makeRequest } from "../../axios"; // Fonction pour faire des requêtes HTTP
import { Button, Typography, IconButton, Avatar } from "@mui/material"; // Composants Material-UI
import { PhotoCamera } from "@mui/icons-material"; // Icône pour le bouton d'upload
import { Link } from "react-router-dom"; // Composant pour les liens de navigation

const Share = () => {
  // État pour stocker le fichier image sélectionné
  const [file, setFile] = useState(null);
  // État pour stocker la description du post
  const [description, setDesc] = useState("");
  // Contexte pour obtenir les informations de l'utilisateur connecté
  const { currentUser } = useContext(AuthContext);
  // Hook pour gérer les mutations des données
  const queryClient = useQueryClient();
  // Référence au textarea pour ajuster sa hauteur automatiquement
  const textAreaRef = useRef(null);

  // Fonction pour télécharger l'image sur le serveur
  const upload = async () => {
    try {
      console.log("Téléchargement de l'image...");
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("api/upload", formData); // Requête pour uploader l'image
      return res.data; // Retourne l'URL de l'image téléchargée
    } catch (err) {
      console.error("Échec du téléchargement :", err); // Gestion des erreurs
    }
  };

  // Mutation pour créer un nouveau post
  const mutation = useMutation(
    (newPost) => {
      console.log("Création du post...", newPost);
      return makeRequest.post("api/posts", newPost); // Requête pour créer un post
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]); // Invalide les requêtes de posts pour rafraîchir la liste
      },
    }
  );

  // Fonction appelée lorsque l'utilisateur clique sur le bouton de partage
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";

    if (file) {
      imgUrl = await upload(); // Télécharge l'image si un fichier est sélectionné
    }

    mutation.mutate({ description, image: imgUrl }); // Crée le post avec la description et l'image
    setDesc(""); // Réinitialise la description
    setFile(null); // Réinitialise le fichier
  };

  useEffect(() => {
    // Ajuste la hauteur du textarea en fonction de son contenu
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [description]); // Réexécute l'effet lorsque la description change

  // Construit l'URL de la photo de profil de l'utilisateur
  const profilePicUrl = currentUser.profilePicture
    ? `/upload/${currentUser.profilePicture}`
    : "/default-profile-pic.png"; // URL de l'image par défaut si aucune photo n'est définie

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {/* Lien vers le profil de l'utilisateur */}
            <Link to={`/profile/${currentUser.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Avatar
                className="profile-icon"
                src={profilePicUrl} // URL de la photo de profil
                sx={{ width: 50, height: 50 }} // Taille de l'avatar
                onError={(e) => {
                  e.target.src = "/default-profile-pic.png"; // Remplace l'image par défaut en cas d'erreur
                }}
              >
                {!currentUser.profilePicture && currentUser.name.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
            <Typography variant="h6" className="placeholder">
              {`Quoi de neuf, ${currentUser.name}?`} {/* Texte du placeholder */}
            </Typography>
            {/* Zone de saisie pour la description du post */}
            <textarea
              placeholder={`Quoi de neuf, ${currentUser.name}?`} // Texte du placeholder
              onChange={(e) => setDesc(e.target.value)} // Met à jour la description
              value={description} // Valeur actuelle de la description
              ref={textAreaRef} // Référence au textarea
              className="description-input"
            />
          </div>
          <div className="right">
            {/* Prévisualisation de l'image si un fichier est sélectionné */}
            {file && (
              <img
                className="preview-image"
                alt="Aperçu"
                src={URL.createObjectURL(file)} // URL de l'image en local
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            {/* Input pour sélectionner un fichier */}
            <input
              type="file"
              id="file"
              style={{ display: "none" }} // Cache l'input de fichier
              onChange={(e) => setFile(e.target.files[0])} // Met à jour le fichier sélectionné
            />
            <label htmlFor="file">
              <IconButton component="span" color="secondary">
                <PhotoCamera /> {/* Icône de la caméra */}
              </IconButton>
            </label>
          </div>
          <div className="right">
            {/* Bouton pour partager le post */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick} // Appelle la fonction handleClick
              disabled={mutation.isLoading} // Désactive le bouton pendant le chargement
            >
              {mutation.isLoading ? "En cours de partage..." : "Partager"} {/* Texte du bouton */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
