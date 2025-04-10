import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart } from '../utils/cartUtils';

const MotionCard = motion(Card);

const Products = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    productName: ''
  });

  // Sample products data
  const products = [
    {
      id: 1,
      name: t('products.laptop'),
      image: 'https://via.placeholder.com/300x200?text=Laptop',
      description: t('products.laptopDesc'),
      price: '999.99',
    },
    {
      id: 2,
      name: t('products.smartphone'),
      image: 'https://via.placeholder.com/300x200?text=Smartphone',
      description: t('products.smartphoneDesc'),
      price: '599.99',
    },
    {
      id: 3,
      name: t('products.headphones'),
      image: 'https://via.placeholder.com/300x200?text=Headphones',
      description: t('products.headphonesDesc'),
      price: '149.99',
    },
    {
      id: 4,
      name: t('products.smartwatch'),
      image: 'https://via.placeholder.com/300x200?text=Smartwatch',
      description: t('products.smartwatchDesc'),
      price: '299.99',
    },
    {
      id: 5,
      name: t('products.tablet'),
      image: 'https://via.placeholder.com/300x200?text=Tablet',
      description: t('products.tabletDesc'),
      price: '449.99',
    },
    {
      id: 6,
      name: t('products.camera'),
      image: 'https://via.placeholder.com/300x200?text=Camera',
      description: t('products.cameraDesc'),
      price: '799.99',
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

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'price') {
        return parseFloat(a.price) - parseFloat(b.price);
      }
      return 0;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h1"
          color="primary"
          gutterBottom
          align="center"
          sx={{ fontFamily: 'Tangerine', mb: 4 }}
        >
          {t('products.title')}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t('products.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t('products.sortBy')}</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label={t('products.sortBy')}
              >
                <MenuItem value="name">{t('products.sortByName')}</MenuItem>
                <MenuItem value="price">{t('products.sortByPrice')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <MotionCard
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardActionArea>
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
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
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
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </motion.div>

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
    </Container>
  );
};

export default Products;
