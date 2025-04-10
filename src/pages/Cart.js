import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  getCartTotal,
} from '../utils/cartUtils';

const Cart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error('Error loading cart items:', error);
        setSnackbar({
          open: true,
          message: t('cart.errorLoading'),
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [t]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      updateCartItemQuantity(itemId, newQuantity);
      const updatedItems = await getCartItems();
      setCartItems(updatedItems);
      setSnackbar({
        open: true,
        message: t('cart.quantityUpdated'),
        severity: 'success',
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      setSnackbar({
        open: true,
        message: t('cart.errorUpdating'),
        severity: 'error',
      });
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      removeFromCart(itemId);
      const updatedItems = await getCartItems();
      setCartItems(updatedItems);
      setSnackbar({
        open: true,
        message: t('cart.itemRemoved'),
        severity: 'info',
      });
    } catch (error) {
      console.error('Error removing item:', error);
      setSnackbar({
        open: true,
        message: t('cart.errorRemoving'),
        severity: 'error',
      });
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <ShoppingCartIcon sx={{ fontSize: 40 }} />
        </motion.div>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t('cart.title')}
        </Typography>

        {cartItems.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              mt: 4,
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              {t('cart.empty')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate('/products')}
            >
              {t('cart.continueShopping')}
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3}>
                          <CardMedia
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.name}
                            sx={{ objectFit: 'cover', borderRadius: 1 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="h6" component="h2">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.category}
                              </Typography>
                              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                ${item.price}
                              </Typography>
                            </Box>
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveItem(item.id)}
                              sx={{ ml: 2 }}
                              aria-label={t('cart.remove')}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              aria-label={t('cart.decreaseQuantity')}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                              type="number"
                              size="small"
                              sx={{ width: 60, mx: 1 }}
                              inputProps={{ min: 1 }}
                              aria-label={t('cart.quantity')}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              aria-label={t('cart.increaseQuantity')}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
                <Typography variant="h6" gutterBottom>
                  {t('cart.orderSummary')}
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{t('cart.subtotal')}</Typography>
                    <Typography>${getCartTotal().toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{t('cart.shipping')}</Typography>
                    <Typography>{t('cart.free')}</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{t('cart.total')}</Typography>
                    <Typography variant="h6" color="primary">
                      ${getCartTotal().toFixed(2)}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleCheckout}
                  >
                    {t('cart.checkout')}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </motion.div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart; 