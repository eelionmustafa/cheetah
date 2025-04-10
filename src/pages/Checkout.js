import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { getCartItems, getCartTotal, clearCart } from '../utils/cartUtils';
import { saveOrder } from '../services/orderService';

const steps = ['shipping', 'payment', 'review'];

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Albania',
    phone: '',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    paymentMethod: 'credit',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await getCartItems();
        if (items.length === 0) {
          navigate('/cart');
          return;
        }
        
        setCartItems(items);
        setTotal(getCartTotal(items));
      } catch (error) {
        console.error('Error loading cart items:', error);
        setSnackbar({
          open: true,
          message: t('checkout.errorLoadingCart'),
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [navigate, t]);

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (activeStep === 0) {
      // Validate shipping info
      if (!shippingInfo.firstName) newErrors.firstName = t('checkout.required');
      if (!shippingInfo.lastName) newErrors.lastName = t('checkout.required');
      if (!shippingInfo.address) newErrors.address = t('checkout.required');
      if (!shippingInfo.city) newErrors.city = t('checkout.required');
      if (!shippingInfo.zipCode) newErrors.zipCode = t('checkout.required');
      if (!shippingInfo.phone) newErrors.phone = t('checkout.required');
    } else if (activeStep === 1) {
      // Validate payment info
      if (!paymentInfo.cardName) newErrors.cardName = t('checkout.required');
      if (!paymentInfo.cardNumber) newErrors.cardNumber = t('checkout.required');
      if (!paymentInfo.expDate) newErrors.expDate = t('checkout.required');
      if (!paymentInfo.cvv) newErrors.cvv = t('checkout.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      // Validate required fields
      if (!validateStep()) {
        setLoading(false);
        return;
      }

      // Prepare order data
      const orderData = {
        items: cartItems,
        total: total,
        shipping: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
          phone: shippingInfo.phone
        },
        payment: {
          method: paymentInfo.paymentMethod,
          cardName: paymentInfo.cardName,
          lastFour: paymentInfo.cardNumber.slice(-4)
        }
      };

      // Save order
      const savedOrder = await saveOrder(orderData);
      
      // Clear cart
      clearCart();
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Order placed successfully!',
        severity: 'success'
      });

      // Redirect to order confirmation after a short delay
      setTimeout(() => {
        navigate(`/order-confirmation?orderId=${savedOrder.id}`);
      }, 1500);
    } catch (error) {
      console.error('Error placing order:', error);
      setSnackbar({
        open: true,
        message: 'Error placing order. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
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

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" gutterBottom>
              {t('checkout.shippingInfo')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.firstName')}
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleShippingChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.lastName')}
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleShippingChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.address')}
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.city')}
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('checkout.state')}
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.zipCode')}
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  error={!!errors.zipCode}
                  helperText={errors.zipCode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="country-label">{t('checkout.country')}</InputLabel>
                  <Select
                    labelId="country-label"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingChange}
                    label={t('checkout.country')}
                  >
                    <MenuItem value="Albania">Albania</MenuItem>
                    <MenuItem value="Kosovo">Kosovo</MenuItem>
                    <MenuItem value="North Macedonia">North Macedonia</MenuItem>
                    <MenuItem value="Montenegro">Montenegro</MenuItem>
                    <MenuItem value="Serbia">Serbia</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.phone')}
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleShippingChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
            </Grid>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" gutterBottom>
              {t('checkout.paymentInfo')}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.cardName')}
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.cardNumber')}
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.expDate')}
                  name="expDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expDate}
                  onChange={handlePaymentChange}
                  error={!!errors.expDate}
                  helperText={errors.expDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label={t('checkout.cvv')}
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                />
              </Grid>
            </Grid>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" gutterBottom>
              {t('checkout.orderReview')}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {t('checkout.shippingDetails')}
                  </Typography>
                  <Typography variant="body1">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                  </Typography>
                  <Typography variant="body1">
                    {shippingInfo.address}
                  </Typography>
                  <Typography variant="body1">
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                  </Typography>
                  <Typography variant="body1">
                    {shippingInfo.country}
                  </Typography>
                  <Typography variant="body1">
                    {shippingInfo.phone}
                  </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {t('checkout.paymentDetails')}
                  </Typography>
                  <Typography variant="body1">
                    {t('checkout.paymentMethod')}: {t('checkout.creditCard')}
                  </Typography>
                  <Typography variant="body1">
                    {t('checkout.cardName')}: {paymentInfo.cardName}
                  </Typography>
                  <Typography variant="body1">
                    {t('checkout.cardNumber')}: **** **** **** {paymentInfo.cardNumber.slice(-4)}
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {t('checkout.orderItems')}
                  </Typography>
                  <List>
                    {cartItems.map((item) => (
                      <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                        <ListItemAvatar>
                          <Avatar alt={item.name} src={item.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={`${t('checkout.quantity')}: ${item.quantity}`}
                        />
                        <Typography variant="body2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{t('checkout.subtotal')}</Typography>
                    <Typography>${total.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>{t('checkout.shipping')}</Typography>
                    <Typography>{t('checkout.free')}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{t('checkout.total')}</Typography>
                    <Typography variant="h6" color="primary">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('checkout.title')}
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
          <Step>
            <StepLabel icon={<ShippingIcon />}>{t('checkout.shipping')}</StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<PaymentIcon />}>{t('checkout.payment')}</StepLabel>
          </Step>
          <Step>
            <StepLabel icon={<CheckCircleIcon />}>{t('checkout.review')}</StepLabel>
          </Step>
        </Stepper>
        
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              {t('checkout.thankYou')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('checkout.orderConfirmation')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
            >
              {t('checkout.continueShopping')}
            </Button>
          </Box>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                {t('checkout.back')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
              >
                {activeStep === steps.length - 1 ? t('checkout.placeOrder') : t('checkout.next')}
              </Button>
            </Box>
          </>
        )}
      </Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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

export default Checkout; 