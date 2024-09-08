import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import {
  IconButton,
  Button,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Badge
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  Comment,
  Share as ShareIcon,
  MoreVert
} from "@mui/icons-material";
import Comments from "../comments/Comments";
import { getLikes, toggleLike, deletePost } from "../../services/postService";
import "./post.scss";
import { DarkModeContext } from "../../context/darkModeContext.js";

const Post = ({ post }) => {
  // Contexte pour le mode sombre
  const { darkMode } = useContext(DarkModeContext);
  
  // États locaux pour gérer l'ouverture des commentaires, du menu et du dialogue de confirmation
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const menuRef = useRef(null);

  // Contexte pour obtenir l'utilisateur actuellement connecté
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Requête pour obtenir les likes du post
  const { isLoading, data } = useQuery(["likes", post.id], () =>
    getLikes(post.id),
    {
      enabled: !!post.id,
    }
  );

  // Vérifie si l'utilisateur actuel a aimé le post
  const isLiked = data && data.includes(currentUser.id);

  // Mutation pour liker ou disliker le post
  const mutation = useMutation(
    () => toggleLike(post.id, currentUser.id, isLiked),
    {
      onSuccess: () => {
        // Invalide le cache des likes pour refléter les changements
        queryClient.invalidateQueries(["likes", post.id]);
      },
    }
  );

  // Mutation pour supprimer le post
  const deleteMutation = useMutation(
    () => deletePost(post.id),
    {
      onSuccess: () => {
        // Invalide le cache des posts pour refléter les changements
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  // Fonction pour gérer le clic sur le bouton de like
  const handleLike = () => {
    mutation.mutate();
  };

  // Fonction pour ouvrir le dialogue de confirmation de suppression
  const handleDelete = () => {
    setDialogOpen(true);
  };

  // Fonction pour fermer le dialogue de confirmation
  const handleCloseDialog = (confirm) => {
    setDialogOpen(false);
    if (confirm) {
      deleteMutation.mutate();
    }
  };

  useEffect(() => {
    // Fonction pour fermer le menu lorsqu'on clique en dehors
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [post]);

  // Lettre de l'avatar si l'image de profil n'est pas disponible
  const avatarLetter = post.name ? post.name.charAt(0).toUpperCase() : "";

  return (
    <Card className="post" style={{ backgroundColor: darkMode ? "#333" : "#fff" }}>
      <CardContent>
        <div className="post-header">
          <div className="user-info">
            <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
              <Avatar
                className="avatar"
                src={post.profilePicture ? `/upload/${post.profilePicture}` : ""}
                sx={{ bgcolor: post.profilePicture ? "transparent" : "primary.main" }}
              >
                {!post.profilePicture && avatarLetter}
              </Avatar>
            </Link>
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="h6" className="username">{post.name}</Typography>
              </Link>
              <Typography variant="caption" color="textSecondary">{moment(post.created_at).fromNow()}</Typography>
            </div>
          </div>
          <div ref={menuRef}>
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuRef.current}
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              PaperProps={{ style: { width: '150px' } }}
            >
              {/* Affiche l'option de suppression uniquement si le post appartient à l'utilisateur actuel */}
              {post.userId === currentUser.id && (
                <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
              )}
            </Menu>
          </div>
        </div>
        <Typography variant="body1" className="post-content">{post.description}</Typography>
        {post.image && <img src={`/upload/${post.image}`} alt="Post" className="post-image" />}
      </CardContent>
      <CardActions>
        <Badge
          badgeContent={data?.length || 0}
          color="primary"
        >
          <IconButton
            onClick={handleLike}
            className={`like-button ${isLiked ? 'liked' : ''}`}
            disabled={isLoading}
            color={isLiked ? 'error' : 'default'}
          >
            {isLoading ? (
              "Chargement..."
            ) : isLiked ? (
              <Favorite />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Badge>
        <IconButton onClick={() => setCommentOpen(!commentOpen)}>
          <Comment />
        </IconButton>
        {/* <IconButton>
          <ShareIcon />
        </IconButton> */}
      </CardActions>
      {commentOpen && <Comments postId={post.id} />}
      <Dialog
        open={dialogOpen}
        onClose={() => handleCloseDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer la suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Post;
