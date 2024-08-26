// src/pages/contact/Contact.js

import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Contact = () => {
  return (

    <Container  maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
          marginTop:16
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Us
        </Typography>
        
        <TextField
          label="Name"
          variant="outlined"
          required
          fullWidth
        />
        
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          fullWidth
        />
        
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          required
          fullWidth
        />
        
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </Container>
    
  );
};

export default Contact;
