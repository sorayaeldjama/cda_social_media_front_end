// Importation des composants nécessaires
import Posts from "../../components/posts/Posts"; // Composant pour afficher les posts de l'utilisateur
import Share from "../../components/share/Share"; // Composant pour permettre à l'utilisateur de partager du contenu
import "./home.scss"; // Importation des styles spécifiques au composant Home

import { Link, useNavigate } from "react-router-dom"; // Importation des hooks pour la navigation et les liens
import { useContext } from "react"; // Importation du hook useContext pour accéder au contexte d'authentification

import { AuthContext } from "../../context/authContext"; // Importation du contexte d'authentification

const Home = () => {
  // Extraction des données du contexte d'authentification
  const { currentUser, isTokenValid } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook pour la navigation programmatique

  // Vérifie si l'utilisateur est connecté et si le token est valide
  // Si ce n'est pas le cas, redirige l'utilisateur vers la page de connexion
  // if (!currentUser || !isTokenValid) {
  //   navigate("/login");
  // }

  return (
    <div className="home">
      <Share/> {/* Composant pour permettre le partage de contenu */}
      <Posts/> {/* Composant pour afficher les posts */}
    </div>
  );
}

export default Home;
