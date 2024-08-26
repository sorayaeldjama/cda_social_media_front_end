import { createContext, useEffect, useState } from "react";
import { login as loginService, logout as logoutService } from "../services/authService"; // Importer les services d'authentification

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const userData = await loginService(inputs); // Utiliser le service login
      setCurrentUser(userData);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const logout = async () => {
    try {
      await logoutService(); // Utiliser le service logout
      setCurrentUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
