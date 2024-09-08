import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Button, TextField } from "@mui/material"; // Importation des composants Material-UI
import "./login.scss";

const Login = () => {
  // État pour gérer les données du formulaire (pseudo et mot de passe)
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // État pour gérer les erreurs de validation du formulaire
  const [formErrors, setFormErrors] = useState({});

  // État pour gérer les erreurs de connexion (message d'erreur global)
  const [err, setErr] = useState(null);

  // Hook pour la navigation (rediriger l'utilisateur après connexion réussie)
  const navigate = useNavigate();

  // Context pour les fonctions d'authentification (login)
  const { login } = useContext(AuthContext);

  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    const errors = {};
    if (!inputs.username) errors.username = "Le pseudo est requis."; // Validation pour le pseudo
    if (!inputs.password) errors.password = "Le mot de passe est requis."; // Validation pour le mot de passe
    return errors;
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value })); // Mise à jour des valeurs des champs
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // Effacement des erreurs pour le champ modifié
  };

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)

    // Validation du formulaire avant envoi
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Appel à la fonction login du contexte pour tenter la connexion
      await login(inputs);
      navigate("/"); // Redirection vers la page d'accueil après une connexion réussie
    } catch (err) {
      // Gestion des erreurs de connexion (affichage du message d'erreur)
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Share Vista</h1>
          <p>
            Connectez-vous pour partager vos idées, suivre vos amis et découvrir de nouvelles perspectives.
          </p>
          <span>Pas encore inscrit ? Créez un compte pour commencer à explorer.</span>
          <Link to="/register">
            <Button variant="outlined" color="primary">S'inscrire</Button> {/* Bouton pour accéder à la page d'inscription */}
          </Link>
        </div>
        <div className="right">
          <h1>Connexion</h1>
          <form>
            <TextField
              label="Pseudo" // Label affiché au-dessus de l'input
              variant="outlined" // Variante du TextField (outline, filled, standard)
              name="username"
              value={inputs.username}
              onChange={handleChange}
              error={!!formErrors.username} // Gestion de l'affichage de l'erreur pour le pseudo
              helperText={formErrors.username} // Message d'erreur affiché sous l'input du pseudo
              fullWidth // Le TextField prend toute la largeur disponible
              margin="normal" // Espacement vertical standard
            />
            
            <TextField
              label="Mot de passe"
              type="password" // Type password pour cacher le texte
              variant="outlined"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              error={!!formErrors.password} // Gestion de l'affichage de l'erreur pour le mot de passe
              helperText={formErrors.password} // Message d'erreur affiché sous l'input du mot de passe
              fullWidth
              margin="normal"
            />

            {err && <div className="error-message">{err}</div>} {/* Affichage des messages d'erreur globaux */}
            <Button 
              onClick={handleLogin} 
              variant="contained" 
              color="primary" 
              style={{ width: "200px" }} // Largeur fixe pour le bouton
            >
              Se connecter
            </Button> {/* Bouton de connexion */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
