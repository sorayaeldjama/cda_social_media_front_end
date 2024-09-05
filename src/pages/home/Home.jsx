// import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/authContext";

const Home = () => {
  const { currentUser, isTokenValid } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirection si le token est invalide ou non présent
  // if (!currentUser || !isTokenValid) {
  //   navigate("/login") 
  // }
  return (
    <div className="home">
      {/* <Stories/> */}
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home