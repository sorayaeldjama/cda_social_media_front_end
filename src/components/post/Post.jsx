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
  Share,
  MoreVert
} from "@mui/icons-material";
import Comments from "../comments/Comments";
import { getLikes, toggleLike, deletePost } from "../../services/postService";
import "./post.scss";
import { DarkModeContext } from "../../context/darkModeContext.js";

const Post = ({ post }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const menuRef = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(["likes", post.id], () =>
    getLikes(post.id),
    {
      enabled: !!post.id,
    }
  );

  const isLiked = data && data.includes(currentUser.id);

  const mutation = useMutation(
    () => toggleLike(post.id, currentUser.id, isLiked),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes", post.id]);
      },
    }
  );

  const deleteMutation = useMutation(
    () => deletePost(post.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate();
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (confirm) => {
    setDialogOpen(false);
    if (confirm) {
      deleteMutation.mutate();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const avatarLetter = post.name ? post.name.charAt(0).toUpperCase() : "";

  return (
    <Card className="post">
      <CardContent>
        <div className="post-header">
          <div className="user-info">
          <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>

            <Avatar className="avatar" sx={{ bgcolor: "primary.main" }}>
              {avatarLetter}
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
              {post.userId === currentUser.id && (
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
              "Loading..."
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
        <IconButton>
          <Share />
        </IconButton>
      </CardActions>
      {commentOpen && <Comments postId={post.id} />}

      <Dialog
        open={dialogOpen}
        onClose={() => handleCloseDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleCloseDialog(true)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Post;
