import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './update.scss'; // Assurez-vous que le fichier CSS est importé

const Update = ({ setOpenUpdate, user }) => {
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name || "",
    city: user.city || "",
    website: user.website || "",
  });

  useEffect(() => {
    console.log("Composant Update monté");
  }, []);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("api/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Erreur lors du téléchargement :", err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation(
    (userData) => {
      return makeRequest.put("api/users", userData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let profileUrl = user.profilePicture;

    if (profile) {
      profileUrl = await upload(profile);
    }

    mutation.mutate({
      ...texts,
      profilePicture: profileUrl,
    });

    setOpenUpdate(false);
  };

  return (
    <Dialog open onClose={() => setOpenUpdate(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        Mettre à jour le profil
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOpenUpdate(false)}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Conteneur du formulaire avec une classe pour la personnalisation du défilement */}
        <div className="custom-scroll">
          <form>
            {/* Champ pour télécharger la photo de profil */}
            <Input
              type="file"
              onChange={(e) => setProfile(e.target.files[0])}
              inputProps={{ accept: 'image/*' }}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="Sélectionner une nouvelle image de profil"
            />
            {/* Champs de texte pour la mise à jour des informations utilisateur */}
            <TextField
              margin="normal"
              fullWidth
              label="Nom"
              name="name"
              value={texts.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Ville"
              name="city"
              value={texts.city}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Site Web"
              name="website"
              value={texts.website}
              onChange={handleChange}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        {/* Bouton pour confirmer la mise à jour */}
        <Button onClick={handleClick} variant="contained" color="primary">
          Mettre à jour
        </Button>
        {/* Bouton pour annuler la mise à jour */}
        <Button onClick={() => setOpenUpdate(false)} color="secondary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Update;
