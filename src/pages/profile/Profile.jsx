import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFollowedUsers, followUser, unfollowUser } from "../../services/userService";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import { Avatar, Button, IconButton, Typography, CircularProgress } from "@mui/material";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  // Requête pour récupérer les informations de l'utilisateur sur lequel on clique
  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get(`api/users/find/${userId}`).then((res) => res.data)
  );

  // Utilisation de getFollowedUsers pour récupérer les utilisateurs suivis
  const { isLoading: rIsLoading, data: followedUsers } = useQuery(
    ["followedUsers", currentUser?.id],
    () => getFollowedUsers(currentUser?.id),
    {
      enabled: !!currentUser?.id, // Exécuter la requête seulement si currentUser.id est défini
    }
  );

  // Mutation pour suivre un utilisateur
  const followMutation = useMutation(
    () => followUser(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followedUsers", currentUser?.id]);
      },
      onError: (error) => {
        console.error('Erreur lors du suivi:', error);
      }
    }
  );

  // Mutation pour ne plus suivre un utilisateur
  const unfollowMutation = useMutation(
    () => unfollowUser(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followedUsers", currentUser?.id]);
      },
      onError: (error) => {
        console.error('Erreur lors de la désinscription:', error);
      }
    }
  );

  // Fonction pour gérer le clic sur le bouton de suivi
  const handleFollow = () => {
    const isFollowing = followedUsers?.some(user => user.id === userId);

    if (isFollowing) {
      unfollowMutation.mutate(); // Si déjà suivi, annulez le suivi
    } else {
      followMutation.mutate(); // Sinon, suivez l'utilisateur
    }
  };

  // Nombre d'utilisateurs suivis
  const numberOfFollowedUsers = followedUsers?.length || 0;

  // Vérification si l'utilisateur actuel suit l'utilisateur du profil
  const isFollowingProfileUser = followedUsers?.includes( userId);

  // Débogage
  console.log("Utilisateurs suivis :", followedUsers);
  console.log("ID de l'utilisateur du profil :", userId);
  console.log("Nombre d'utilisateurs suivis :", numberOfFollowedUsers);
  console.log("Utilisateur actuel suit-il l'utilisateur du profil ?", isFollowingProfileUser);

  return (
    <div className="profile">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
       
          <div className="profileHeader">
            <Avatar
              src={data?.profilePicture ? `api/upload/${data.profilePicture}` : "/default-profile.jpg"}
              alt={data?.name}
              sx={{ width: 100, height: 100, margin: "20px",marginTop:16 }}
            />
            <div className="profileDetails">
              <Typography variant="h4">{data?.name}</Typography>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <Typography>{data?.city}</Typography>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <Typography>{data?.username}</Typography>
                </div>
              </div>
              {rIsLoading ? (
                <CircularProgress />
              ) : currentUser ? (
                userId === currentUser.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenUpdate(true)}
                  >
                    Modifier
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color={isFollowingProfileUser ? "secondary" : "primary"}
                    onClick={handleFollow}
                  >
                    {isFollowingProfileUser ? "Suivi" : "Suivre"}
                  </Button>
                )
              ) : null}
            </div>
          </div>
          <div className="socialLinks">
            <IconButton href="http://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookTwoToneIcon fontSize="large" />
            </IconButton>
            <IconButton href="http://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon fontSize="large" />
            </IconButton>
            <IconButton href="http://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon fontSize="large" />
            </IconButton>
            <IconButton href="http://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="large" />
            </IconButton>
            <IconButton href="http://pinterest.com" target="_blank" rel="noopener noreferrer">
              <PinterestIcon fontSize="large" />
            </IconButton>
          </div>
          <Posts userId={userId} />
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
