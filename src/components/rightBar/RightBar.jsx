import React, { useState, useContext, useEffect } from "react";
import { Button, Typography, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../context/authContext";
import {
  getUserSuggestions,
  getFollowedUsers,
  followUser,
  unfollowUser,
} from "../../services/userService";
import "./rightBar.scss";

const RightBar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchSuggestionsAndFollowedUsers = async () => {
      try {
        if (currentUser && currentUser.id) {
          const users = await getUserSuggestions();
          setSuggestions(users);

          const followedUserIds = await getFollowedUsers(currentUser.id);
          if (Array.isArray(followedUserIds)) {
            setFollowedUsers(followedUserIds);
          } else {
            setError("Les utilisateurs suivis sont mal formatés.");
          }
        } else {
          console.error('currentUser or currentUser.id is not defined');
        }
      } catch (err) {
        setError("Erreur lors de la récupération des suggestions d'utilisateurs ou des utilisateurs suivis.");
        console.error(err);
      }
    };

    fetchSuggestionsAndFollowedUsers();
  }, [currentUser]);

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      setFollowedUsers((prev) => [...prev, userId]);
    } catch (err) {
      setError("Erreur lors du suivi de l'utilisateur.");
      console.error(err);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId);
      setFollowedUsers((prev) => prev.filter((id) => id !== userId));
    } catch (err) {
      setError("Erreur lors de la désinscription de l'utilisateur.");
      console.error(err);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Afficher le bouton menu burger uniquement sur les petits écrans */}
      <IconButton 
        edge="start" 
        color="inherit" 
        aria-label="menu" 
        onClick={toggleDrawer} 
        className="menuButton"
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer pour le menu burger */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        className="drawer"
      >
        <div className="rightBar">
          <div className="container">
            <div className="item">
              <Typography variant="h6" style={{ marginBottom: 24 }}>Suggestions Pour Vous:</Typography>
              {error && <Typography color="error">{error}</Typography>}
              {suggestions.map((user) => (
                <div className="user" key={user.id}>
                  <div className="userInfo">
                    <div className="profile-icon">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <Typography variant="body1">{user.name}</Typography>
                  </div>
                  <div className="buttons">
                    {followedUsers.includes(user.id) ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleUnfollow(user.id)}
                      >
                        Se désabonner
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleFollow(user.id)}
                      >
                        S'abonner
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>

      {/* Afficher la RightBar en pleine largeur sur les grands écrans */}
      <div className={`rightBar ${open ? 'hidden' : ''}`}>
        <div className="container">
          <div className="item">
            <Typography variant="h6" style={{ marginBottom: 24 }}>Suggestions Pour Vous:</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {suggestions.map((user) => (
              <div className="user" key={user.id}>
                <div className="userInfo">
                  <div className="profile-icon">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <Typography variant="body1">{user.name}</Typography>
                </div>
                <div className="buttons">
                  {followedUsers.includes(user.id) ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleUnfollow(user.id)}
                    >
                      Se désabonner
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleFollow(user.id)}
                    >
                      S'abonner
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
