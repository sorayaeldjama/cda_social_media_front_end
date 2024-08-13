import { useContext ,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")
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
          <button>S'inscrire</button>
        </Link>
      </div>
      <div className="right">
        <h1>Connexion</h1>
        <form>
          <input
            type="text"
            placeholder="Pseudo"
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={handleChange}
          />
          {err && err}
          <button onClick={handleLogin} style={{ width: "200px" }}>Se connecter</button>
          </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
