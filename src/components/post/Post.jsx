import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?likePostsId=" + post.id).then((res) => {
      return res.data;
    })
  );
  const { currentUser } = useContext(AuthContext);
  console.log("data",data)
  //TEMPORARY
  const liked = true;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {/* {liked ? <FavoriteOutlinedIcon style={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon />} */}

           {/* { data.includes(currentUser.id)?
           <FavoriteOutlinedIcon style={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon />
           
           } */}
likes          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
