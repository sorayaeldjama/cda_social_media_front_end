import React from 'react'
import  { useState, useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import {
  getUserSuggestions,
  getFollowedUsers,
  followUser,
  unfollowUser,
} from "../../services/userService";
const Right = () => {
    const [suggestions, setSuggestions] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [error, setError] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      const fetchSuggestions = async () => {
        try {
          const users = await getUserSuggestions();
          setSuggestions(users);
        } catch (err) {
          setError("Erreur lors de la récupération des suggestions d'utilisateurs.");
          console.error(err);
        }
      };

      const fetchFollowedUsers = async (currentUserId) => {
        try {
          const followedUserIds = await getFollowedUsers(currentUserId);
          console.log("followedUserIds:", followedUserIds);
          if (Array.isArray(followedUserIds)) {
            setFollowedUsers(followedUserIds);
          } else {
            setError("Les utilisateurs suivis sont mal formatés.");
          }
        } catch (err) {
          setError("Erreur lors de la récupération des utilisateurs suivis.");
          console.error(err);
        }
      };

      fetchSuggestions();
      // fetchFollowedUsers(currentUser.id);
    } else {
      console.error('currentUser or currentUser.id is not defined');
    }
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
    } catch (err) {
      setError("Erreur lors de la désinscription de l'utilisateur.");
      console.error(err);
    }
  };
  return (
    <div>Right

    </div>
  )
}

export default Right