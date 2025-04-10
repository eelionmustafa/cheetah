import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const OurStory = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const sections = [
    {
      title: t('ourStory.beginning.title'),
      text: t('ourStory.beginning.text'),
    },
    {
      title: t('ourStory.mission.title'),
      text: t('ourStory.mission.text'),
    },
    {
      title: t('ourStory.values.title'),
      text: t('ourStory.values.text'),
    },
    {
      title: t('ourStory.future.title'),
      text: t('ourStory.future.text'),
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 50% 50%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 30% 30%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 70% 70%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 20% 80%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 80% 20%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 40% 60%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 60% 40%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 10% 90%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 90% 10%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 25% 75%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 75% 25%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 15% 85%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 85% 15%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 35% 65%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 65% 35%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 5% 95%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 95% 5%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 45% 55%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          radial-gradient(circle at 55% 45%, #f5d76e 0%, #f5d76e 2%, transparent 2.5%),
          #e6c35c
        `,
        backgroundSize: '100px 100px',
        backgroundPosition: '0 0, 50px 50px',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{ 
              mb: 2,
              color: '#8B4513',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              fontWeight: 'bold',
            }}
          >
            {t('ourStory.title')}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            align="center"
            sx={{ 
              mb: 6,
              color: '#8B4513',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {t('ourStory.subtitle')}
          </Typography>

          <Grid container spacing={4}>
            {sections.map((section, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Paper
                    elevation={5}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '2px solid #8B4513',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        color: '#8B4513',
                        fontWeight: 'bold',
                      }}
                    >
                      {section.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#5D4037',
                        lineHeight: 1.8,
                      }}
                    >
                      {section.text}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OurStory; 