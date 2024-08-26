import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            À propos de Share Vista
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Bienvenue sur Share Vista, votre plateforme sociale innovante dédiée au partage d'idées et de contenus.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Notre Vision
          </Typography>
          <Typography variant="body1" paragraph>
            Chez Share Vista, nous croyons que chacun a une histoire à raconter, une idée à partager, ou un talent à montrer.
            Notre mission est de créer un espace où la créativité, l'authenticité et l'interaction se rencontrent pour former une
            communauté dynamique et inspirante.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Notre Histoire
          </Typography>
          <Typography variant="body1" paragraph>
            L'idée de Share Vista est née de la passion de ses fondateurs pour la technologie et la communication. Voyant un manque
            d'espaces en ligne où les gens pouvaient réellement se connecter et échanger des idées de manière authentique, nous avons
            décidé de créer une plateforme qui met l'accent sur la qualité des interactions plutôt que sur la quantité.
          </Typography>
          <Typography variant="body1" paragraph>
            Depuis notre lancement, Share Vista a grandi pour devenir un lieu où les utilisateurs peuvent découvrir de nouvelles
            perspectives, s'inspirer des autres, et partager leurs propres expériences avec une audience mondiale.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ce Que Nous Faisons
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Connecter les gens:</strong> Share Vista est conçu pour faciliter les connexions significatives entre les utilisateurs.
            Que vous souhaitiez partager une réflexion profonde, un projet créatif, ou simplement vous connecter avec d'autres personnes
            partageant les mêmes intérêts, Share Vista est l'endroit pour vous.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Encourager la créativité:</strong> Nous croyons en l'importance de l'expression personnelle. Sur Share Vista, chaque
            utilisateur a la possibilité de créer et de partager du contenu unique qui reflète ses passions et ses intérêts.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Favoriser les échanges:</strong> Notre plateforme est conçue pour encourager le dialogue et l'interaction. Que ce soit à
            travers des commentaires, des partages ou des collaborations, nous voulons que Share Vista soit un espace d'échange et de
            croissance collective.
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Nos Valeurs
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Authenticité:</strong> Nous encourageons nos utilisateurs à être eux-mêmes et à partager leurs idées de manière honnête
            et ouverte.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Communauté:</strong> Nous croyons en la puissance des connexions humaines et cherchons à créer un environnement où tout
            le monde se sent le bienvenu.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Innovation:</strong> Nous nous efforçons constamment d'améliorer notre plateforme et d'innover pour offrir la meilleure
            expérience possible à nos utilisateurs.
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" component="h2">
            Rejoignez-Nous
          </Typography>
          <Typography variant="body1" paragraph>
            Nous sommes ravis de vous avoir ici et nous vous invitons à explorer tout ce que Share Vista a à offrir. Que vous soyez ici pour
            découvrir de nouveaux contenus, partager vos propres créations, ou simplement vous connecter avec des gens formidables, nous
            espérons que vous vous sentirez chez vous sur Share Vista.
          </Typography>
          <Typography variant="h6" component="h2">
            Merci de faire partie de notre aventure !
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
            L'équipe Share Vista
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AboutUs;
