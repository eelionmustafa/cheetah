import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' Cheetah. All rights reserved.'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link component={RouterLink} to="/our-story" color="inherit" underline="hover">
            Our Story
          </Link>
          {' | '}
          <Link component={RouterLink} to="/categories" color="inherit" underline="hover">
            Categories
          </Link>
          {' | '}
          <Link component={RouterLink} to="/products" color="inherit" underline="hover">
            Products
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 