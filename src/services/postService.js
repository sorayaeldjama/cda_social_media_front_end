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
    console.log(`Fetching posts for userId: ${userId}`);
    try {
      const response = await makeRequest.get("/posts", {
        params: { userId },
      });
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };
  
