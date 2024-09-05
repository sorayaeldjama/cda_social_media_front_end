import "./profile.scss";
import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import Update from "../../components/update/Update";
import { Avatar, Button, IconButton, Typography } from "@mui/material";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get(`/users/find/${userId}`).then((res) => res.data)
  );

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete(`/relationships?userId=${userId}`);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => res.data)
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData?.includes(currentUser?.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <div className="profileHeader">
            <Avatar
              src={data?.profilePicture ? `/upload/${data.profilePicture}` : "/default-profile.jpg"}
              alt={data?.name}
              sx={{ width: 100, height: 100, margin: "20px" }}
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
                <Typography>Loading...</Typography>
              ) : currentUser ? (
                userId === currentUser.id ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenUpdate(true)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleFollow}
                  >
                    {relationshipData?.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
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
