import React, { useState, useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";
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

  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (currentUser && currentUser.id) {
  //     const fetchSuggestions = async () => {
  //       try {
  //         const users = await getUserSuggestions();
  //         setSuggestions(users);
  //       } catch (err) {
  //         setError("Erreur lors de la récupération des suggestions d'utilisateurs.");
  //         console.error(err);
  //       }
  //     };

  //     const fetchFollowedUsers = async (currentUserId) => {
  //       try {
  //         const followedUserIds = await getFollowedUsers(currentUserId);
  //         console.log("followedUserIds:", followedUserIds);
  //         if (Array.isArray(followedUserIds)) {
  //           setFollowedUsers(followedUserIds);
  //         } else {
  //           setError("Les utilisateurs suivis sont mal formatés.");
  //         }
  //       } catch (err) {
  //         setError("Erreur lors de la récupération des utilisateurs suivis.");
  //         console.error(err);
  //       }
  //     };

  //     fetchSuggestions();
  //     // fetchFollowedUsers(currentUser.id);
  //   } else {
  //     console.error('currentUser or currentUser.id is not defined');
  //   }
  // }, [currentUser]);
  useEffect(() => {
    const fetchSuggestionsAndFollowedUsers = async () => {
      try {
        if (currentUser && currentUser.id) {
          const users = await getUserSuggestions();
          setSuggestions(users);
  
          const followedUserIds = await getFollowedUsers(currentUser.id);
          console.log("je suis dans followeduserId",followedUserIds)
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
  
  console.log("followedUserIds cccc:", followedUsers);

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      setFollowedUsers((prev) => [...prev, userId]); // Ajouter à un tableau
    } catch (err) {
      setError("Erreur lors du suivi de l'utilisateur.");
      console.error(err);
    }
  };
  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId);
      setFollowedUsers((prev) => prev.filter((id) => id !== userId)); // Supprimer l'utilisateur désabonné de la liste
    } catch (err) {
      setError("Erreur lors de la désinscription de l'utilisateur.");
      console.error(err);
    }
  };
  

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <Typography variant="h6" style={{marginBottom:24}}>Suggestions Pour Vous:</Typography>
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
                {console.log("followedUsers:", followedUsers)}
                {followedUsers.includes(user.id) ? ( // Vérifier la présence avec includes
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
  );
};

export default RightBar;
