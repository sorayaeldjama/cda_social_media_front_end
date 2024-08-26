import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { Avatar, IconButton, Button, Tooltip } from "@mui/material";
import share from "../../assets/share_vista.png";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Extraction de la première lettre du nom d'utilisateur pour l'avatar
  const avatarLetter = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "";

  return (
    <div className="navbar">
      <div className="left">
      <Link to="/" style={{ textDecoration: "none" }}>
  <div style={{ backgroundColor: "#673ab7", padding: "10px", borderRadius: "8px",size:24 }}>
    <img src={share} alt="Share" style={{ display: "block" }} />
  </div>
</Link>

        <IconButton onClick={toggle} color="inherit">
          {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
      </div>
      <div className="right">
        <Link to="/about" style={{ textDecoration: "none", marginRight: 16 }}>
          <Button variant="text" color="inherit">
            About
          </Button>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none", marginRight: 16 }}>
          <Button variant="text" color="inherit">
            Contact
          </Button>
        </Link>
        <Button variant="contained" onClick={handleLogout}>
          Se déconnecter
        </Button>
        <Tooltip style={{ marginLeft: 24,marginRight:24 }} title={currentUser.name} placement="bottom">
          <Avatar>{avatarLetter}</Avatar>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
