import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import React, { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
const Posts = ({ userId }) => {
  const { darkMode } = useContext(DarkModeContext);

  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => res.data)
  );

  if (error) return <div>Something went wrong</div>;
  if (isLoading) return <div>Loading...</div>;

  // Vérification des clés dupliquées
  const ids = data?.map(post => post.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    console.error("Des clés dupliquées ont été détectées:", ids);
  }

  return (
    <div className="posts">
      {data?.map((post, index) => (
        <Post post={post} key={`${post.id}-${index}`} />
      ))}
    </div>
  );
};

export default Posts;
