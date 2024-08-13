import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [err, setErr] = useState(null);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });  
  
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8900/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Share Vista</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Se connecter</button>
          </Link>
        </div>
        <div className="right">
          <h1>Inscription</h1>
          <form>
          <input
              type="text"
              placeholder="Pseudo"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Nom complet"
              name="name"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
