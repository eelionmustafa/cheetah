import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { addToCart } from '../utils/cartUtils';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

const MotionBox = motion(Box);

const Home = () => {
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = React.useState({ 
    open: false, 
    message: '', 
    severity: 'success',
    productName: ''
  });

  const featuredProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      image: 'https://via.placeholder.com/300',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 149.99,
      image: 'https://via.placeholder.com/300',
      category: 'Fashion',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 199.99,
      image: 'https://via.placeholder.com/300',
      category: 'Home & Living',
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    setSnackbar({
      open: true,
      message: t('home.addedToCart'),
      severity: 'success',
      productName: product.name
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              component="h1"
              variant="h1"
              color="primary"
              gutterBottom
              align="center"
            >
              {t('home.welcome')}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              paragraph
              align="center"
              sx={{ mb: 4 }}
            >
              {t('home.tagline')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                component={RouterLink}
                to="/categories"
                variant="contained"
                size="large"
              >
                {t('home.shopNow')}
              </Button>
              <Button
                component={RouterLink}
                to="/our-story"
                variant="outlined"
                size="large"
              >
                {t('home.learnMore')}
              </Button>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          color="primary"
          gutterBottom
          align="center"
          sx={{ mb: 6 }}
        >
          {t('home.featuredProducts')}
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.category}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    sx={{ 
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 4,
                      }
                    }}
                  >
                    {t('home.addToCart')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            boxShadow: 3,
            '& .MuiAlert-icon': {
              fontSize: 28,
            },
            '& .MuiAlert-message': {
              fontSize: 16,
              fontWeight: 'bold',
            }
          }}
          icon={<ShoppingCartIcon fontSize="large" />}
        >
          {snackbar.productName && `${snackbar.productName} - `}{snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home; 