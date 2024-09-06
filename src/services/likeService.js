import { makeRequest } from "../axios";

// Service pour obtenir les likes d'un post
export const getLikes = (postId) => {
  return makeRequest.get(`api/likes?likePostsId=${postId}`).then((res) => res.data);
};

// Service pour liker ou disliker un post
export const toggleLike = (postId, userId, isLiked) => {
  if (isLiked) {
    return makeRequest.delete(`api/likes?likePostsId=${postId}`);
  }
  return makeRequest.post("api/likes", { postId });
};
