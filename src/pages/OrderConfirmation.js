import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as ShippingIcon,
  History as HistoryIcon,
  Support as SupportIcon,
  ShoppingBag as ShoppingBagIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { getOrderById, trackOrder } from '../services/orderService';

const OrderConfirmation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  
  // Get orderId from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log('Fetching order details for orderId:', orderId);
        
        if (orderId) {
          // Fetch order details from the database
          console.log('Attempting to fetch order data from API');
          const orderData = await getOrderById(orderId);
          console.log('Order data fetched:', orderData);
          
          setOrder(orderData);
          setOrderNumber(orderData._id);
          
          // Set estimated delivery date (3-5 days from order date)
          const orderDate = new Date(orderData.createdAt);
          const deliveryDate = new Date(orderDate);
          deliveryDate.setDate(deliveryDate.getDate() + Math.floor(3 + Math.random() * 3));
          setEstimatedDelivery(deliveryDate.toLocaleDateString());
          
          // Fetch tracking information
          try {
            console.log('Attempting to fetch tracking data');
            const trackingData = await trackOrder(orderId);
            console.log('Tracking data fetched:', trackingData);
            setTrackingInfo(trackingData);
          } catch (trackingError) {
            console.error('Error fetching tracking info:', trackingError);
            // Continue without tracking info
          }
        } else {
          console.log('No orderId provided, generating random order number');
          // Generate a random order number if no orderId is provided
          const randomNum = Math.floor(10000 + Math.random() * 90000);
          setOrderNumber(`CHT-${randomNum}`);
          
          // Set estimated delivery date (3-5 days from now)
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + Math.floor(3 + Math.random() * 3));
          setEstimatedDelivery(deliveryDate.toLocaleDateString());
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(t('orderConfirmation.fetchError'));
        setLoading(false);
      }
    };
    
    // Simulate loading for a better user experience
    const timer = setTimeout(() => {
      fetchOrderDetails();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [orderId, t]);
  
  const handleTrackOrder = async () => {
    try {
      if (orderId) {
        // Fetch real-time tracking information
        const trackingData = await trackOrder(orderId);
        setTrackingInfo(trackingData);
        
        // Show tracking information
        alert(t('orderConfirmation.trackingInfo', { 
          orderNumber,
          status: trackingData.status,
          location: trackingData.currentLocation || t('orderConfirmation.processing')
        }));
      } else {
        // Show generic tracking information for demo orders
        alert(t('orderConfirmation.trackingInfo', { orderNumber }));
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      alert(t('orderConfirmation.trackingError'));
    }
  };
  
  const handleContactSupport = (method) => {
    switch (method) {
      case 'email':
        window.location.href = 'mailto:support@cheetah.com';
        break;
      case 'phone':
        window.location.href = 'tel:+355691234567';
        break;
      case 'whatsapp':
        window.open('https://wa.me/355691234567', '_blank');
        break;
      default:
        break;
    }
  };
  
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6">{t('orderConfirmation.loading')}</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            {t('orderConfirmation.error')}
          </Typography>
          <Typography variant="body1" paragraph>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            startIcon={<HomeIcon />}
            sx={{ mt: 2 }}
          >
            {t('orderConfirmation.continueShopping')}
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            {t('orderConfirmation.thankYou')}
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            {t('orderConfirmation.orderPlaced')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('orderConfirmation.orderNumber')}: <strong>{orderNumber}</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            {t('orderConfirmation.estimatedDelivery')}: <strong>{estimatedDelivery}</strong>
          </Typography>
          
          {trackingInfo && (
            <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
              {t('orderConfirmation.currentStatus')}: <strong>{trackingInfo.status}</strong>
              {trackingInfo.currentLocation && (
                <> - {trackingInfo.currentLocation}</>
              )}
            </Alert>
          )}
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            {t('orderConfirmation.continueShopping')}
          </Button>
        </Paper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
          {t('orderConfirmation.whatsNext')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ShippingIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{t('orderConfirmation.trackOrder')}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {t('orderConfirmation.trackOrderDesc')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<ShippingIcon />}
                  onClick={handleTrackOrder}
                >
                  {t('orderConfirmation.trackButton')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HistoryIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{t('orderConfirmation.orderHistory')}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {t('orderConfirmation.orderHistoryDesc')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<HistoryIcon />}
                  component={Link}
                  to="/profile/orders"
                >
                  {t('orderConfirmation.viewOrders')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SupportIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">{t('orderConfirmation.needHelp')}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {t('orderConfirmation.needHelpDesc')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<SupportIcon />}
                  component={Link}
                  to="/contact"
                >
                  {t('orderConfirmation.contactSupport')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {t('orderConfirmation.contactOptions')}
          </Typography>
          <List>
            <ListItem button onClick={() => handleContactSupport('email')}>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={t('orderConfirmation.emailUs')} 
                secondary="support@cheetah.com" 
              />
            </ListItem>
            <ListItem button onClick={() => handleContactSupport('phone')}>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={t('orderConfirmation.callUs')} 
                secondary="+355 69 123 4567" 
              />
            </ListItem>
            <ListItem button onClick={() => handleContactSupport('whatsapp')}>
              <ListItemIcon>
                <WhatsAppIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={t('orderConfirmation.whatsapp')} 
                secondary="+355 69 123 4567" 
              />
            </ListItem>
          </List>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default OrderConfirmation; 