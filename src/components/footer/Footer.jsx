import React from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="footer-title">
              Share Vista
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Rue notre Dame
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: sorayaeldjama@gmail.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: +333 771788804
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="footer-title">
            Liens rapides            </Typography>
            <ul className="footer-links">
              <li>
                <Link to="/about-us">À propos de nous</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/privacy">politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/terms">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="/legal">Mentions légales</Link> {/* Nouveau lien pour les mentions légales */}
              </li>
            </ul>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className="footer-title">
            Suivez-nous            </Typography>
            <div className="social-icons">
              <IconButton color="inherit" href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
            </div>
          </Grid>
        </Grid>

        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} Share Vista. Tous droits réservés.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '10px' }}>
          <Link to="/legal" style={{ color: '#ddd', textDecoration: 'none' }}>
          Mentions légales          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
