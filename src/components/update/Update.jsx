import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Update = ({ setOpenUpdate, user }) => {
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState(null);
  const [cover, setCover] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name || "",
    city: user.city || "",
    website: user.website || "",
  });

  useEffect(() => {
    console.log("Update component mounted");
  }, []);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation(
    (userData) => {
      return makeRequest.put("/users", userData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = user.coverPicture;
    let profileUrl = user.profilePicture;

    if (cover) {
      coverUrl = await upload(cover);
    }
    if (profile) {
      profileUrl = await upload(profile);
    }

    mutation.mutate({
      ...texts,
      coverPicture: coverUrl,
      profilePicture: profileUrl,
    });

    setOpenUpdate(false);
  };

  return (
    <Dialog open onClose={() => setOpenUpdate(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        Update Profile
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
        <form>
          <Input
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
            inputProps={{ accept: 'image/*' }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Input
            type="file"
            onChange={(e) => setProfile(e.target.files[0])}
            inputProps={{ accept: 'image/*' }}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            value={texts.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="City"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Website"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} variant="contained" color="primary">
          Update
        </Button>
        <Button onClick={() => setOpenUpdate(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Update;
