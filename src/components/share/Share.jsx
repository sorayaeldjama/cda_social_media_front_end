import "./share.scss";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Button, Typography, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

const Share = () => {
  const [file, setFile] = useState(null);
  const [description, setDesc] = useState("");

  const upload = async () => {
    try {
      console.log("Téléchargement de l'image...");
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Échec du téléchargement :", err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const textAreaRef = useRef(null);

  const mutation = useMutation(
    (newPost) => {
      console.log("Création du post...", newPost);
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";

    if (file) {
      imgUrl = await upload();
    }

    mutation.mutate({ description, image: imgUrl });
    setDesc("");
    setFile(null);
  };

  useEffect(() => {
    // Ajuste la hauteur du textarea en fonction de son contenu
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [description]);

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <div className="profile-icon">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <Typography variant="h6" className="placeholder">
              {`Quoi de neuf, ${currentUser.name}?`}
            </Typography>
            <textarea
              placeholder={`Quoi de neuf, ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={description}
              ref={textAreaRef}
              className="description-input"
            />
          </div>
          <div className="right">
            {file && (
              <img
                className="preview-image"
                alt="Aperçu"
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <IconButton component="span" color="secondary">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <div className="right">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "En cours de partage..." : "Partager"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
