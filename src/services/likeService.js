import { makeRequest } from "../axios";

// Service pour obtenir les likes d'un post
export const getLikes = (postId) => {
  return makeRequest.get(`/likes?likePostsId=${postId}`).then((res) => res.data);
};

// Service pour liker ou disliker un post
export const toggleLike = (postId, userId, isLiked) => {
  if (isLiked) {
    return makeRequest.delete(`/likes?likePostsId=${postId}`);
  }
  return makeRequest.post("/likes", { postId });
};
