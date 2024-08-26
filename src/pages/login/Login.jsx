import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Button, TextField } from "@mui/material"; // Importation des composants Material-UI
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    const errors = {};
    if (!inputs.username) errors.username = "Le pseudo est requis.";
    if (!inputs.password) errors.password = "Le mot de passe est requis.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field being edited
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
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
            <Button variant="outlined" color="primary">S'inscrire</Button> {/* Bouton Material-UI */}
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
              error={!!formErrors.username} // Gestion de l'affichage de l'erreur
              helperText={formErrors.username} // Message d'erreur affiché sous l'input
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
              error={!!formErrors.password}
              helperText={formErrors.password}
              fullWidth
              margin="normal"
            />

            {err && <div className="error-message">{err}</div>}
            <Button 
              onClick={handleLogin} 
              variant="contained" 
              color="primary" 
              style={{ width: "200px" }}
            >
              Se connecter
            </Button> {/* Bouton Material-UI */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
