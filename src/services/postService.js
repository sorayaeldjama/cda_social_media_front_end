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

// Service pour supprimer un post
export const deletePost = (postId) => {
  return makeRequest.delete(`/posts/${postId}`);
};



// Fonction pour obtenir les posts

export const getPosts = async (userId) => {
  try {
    const response = await makeRequest.get("/posts", {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    throw error;
  }
};
