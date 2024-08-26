import { Link, useNavigate } from "react-router-dom"; // Importation des composants pour la navigation
import { useState, useContext } from "react"; // Importation des hooks React
import { Button, TextField } from "@mui/material"; // Importation des composants Material-UI pour le formulaire
import { AuthContext } from "../../context/authContext.js"; // Importation du contexte d'authentification
import { makeRequest } from "../../axios"; // Importation de l'instance axios configurée
import "./register.scss"; // Importation du fichier de styles

const Register = () => {
  // Déclaration des états locaux
  const [err, setErr] = useState(null); // Pour stocker les erreurs globales
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  }); // Pour stocker les valeurs des champs du formulaire
  const [formErrors, setFormErrors] = useState({}); // Pour stocker les erreurs de validation du formulaire

  // Utilisation du contexte d'authentification
  const { login } = useContext(AuthContext);

  // Hook pour la redirection
  const navigate = useNavigate();

  // Fonction de validation du formulaire
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'email
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Regex pour valider le mot de passe

    // Validation des champs
    if (!inputs.username) errors.username = "Le pseudo est requis.";
    if (!inputs.email) {
      errors.email = "L'email est requis.";
    } else if (!emailRegex.test(inputs.email)) {
      errors.email = "L'email n'est pas valide.";
    }
    if (!inputs.password) {
      errors.password = "Le mot de passe est requis.";
    } else if (!passwordRegex.test(inputs.password)) {
      errors.password = "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.";
    }
    if (!inputs.name) errors.name = "Le nom complet est requis.";

    return errors;
  };

  // Fonction appelée lors du clic sur le bouton d'inscription
  const handleClick = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Validation des entrées
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // Envoi des données d'inscription à l'API avec l'en-tête Content-Type spécifiant que les données sont au format JSON
      await makeRequest.post("auth/register", inputs, {
        headers: {
          'Content-Type': 'application/json', // Définit le type de contenu comme JSON
        },
      });

      // Redirection vers la page de connexion après une inscription réussie
      navigate("/login");
    } catch (err) {
      // Gestion des erreurs en affichant un message d'erreur
      setErr(err.response?.data || "Une erreur est survenue.");
    }
  };

  // Fonction appelée lors des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // Efface l'erreur pour le champ modifié
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Share Vista</h1>
          <p>
            Connectez-vous pour partager vos idées, suivre vos amis et découvrir de nouvelles perspectives.
          </p>
          <span>Vous avez déjà un compte ? Connectez-vous pour accéder à votre espace personnel.</span>
          <Link to="/login">
            <Button variant="outlined" color="primary">Se connecter</Button> {/* Bouton pour la connexion */}
          </Link>
        </div>
        <div className="right">
          <h1>Inscription</h1>
          <form>
            {/* Champ pour le pseudo */}
            <TextField
              label="Pseudo"
              variant="outlined"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
              fullWidth
              margin="normal"
            />
            
            {/* Champ pour l'email */}
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              fullWidth
              margin="normal"
            />
            
            {/* Champ pour le mot de passe */}
            <TextField
              label="Mot de passe"
              variant="outlined"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              fullWidth
              margin="normal"
            />
            
            {/* Champ pour le nom complet */}
            <TextField
              label="Nom complet"
              variant="outlined"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
              margin="normal"
            />

            {/* Affichage des messages d'erreur globaux */}
            {err && <div className="error-message">{err}</div>}

            {/* Bouton d'inscription */}
            <Button 
              onClick={handleClick} 
              variant="contained" 
              color="primary"
              fullWidth
              style={{ marginTop: "16px" }} // Espacement en haut du bouton
            >
              S'inscrire
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
