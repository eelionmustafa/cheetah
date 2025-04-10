import React, { useState } from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as ShippingIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Inventory as InventoryIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Import management components
import ProductsManagement from './ProductsManagement';
import UsersManagement from './UsersManagement';
import OrdersManagement from './OrdersManagement';
import Reports from './Reports';
import Settings from './Settings';
import DeliveryDashboard from './DeliveryDashboard';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

// Dashboard Overview Component
const DashboardOverview = () => {
  const { t } = useTranslation();
  const stats = [
    { title: t('dashboard.totalUsers'), value: '1,234', icon: <PeopleIcon /> },
    { title: t('dashboard.totalOrders'), value: '456', icon: <ShoppingCartIcon /> },
    { title: t('dashboard.activeDeliveries'), value: '89', icon: <ShippingIcon /> },
    { title: t('dashboard.totalRevenue'), value: '$12,345', icon: <AssessmentIcon /> },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            elevation={3}
            sx={{ p: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h6">{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Box>
          </MotionPaper>
        </Grid>
      ))}
    </Grid>
  );
};

// Sidebar Navigation Component
const Sidebar = ({ activeItem, setActiveItem, isMobile, isOpen, onClose }) => {
  const { t } = useTranslation();
  const menuItems = [
    { text: t('dashboard.overview'), icon: <DashboardIcon />, path: '' },
    { text: t('dashboard.products'), icon: <InventoryIcon />, path: 'products' },
    { text: t('dashboard.users'), icon: <PeopleIcon />, path: 'users' },
    { text: t('dashboard.orders'), icon: <ShoppingCartIcon />, path: 'orders' },
    { text: t('dashboard.deliveries'), icon: <ShippingIcon />, path: 'deliveries' },
    { text: t('dashboard.reports'), icon: <AssessmentIcon />, path: 'reports' },
    { text: t('dashboard.settings'), icon: <SettingsIcon />, path: 'settings' },
  ];

  const sidebarContent = (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '100%',
        position: isMobile ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        zIndex: 1200,
        width: isMobile ? '240px' : '100%',
        transform: isMobile ? (isOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={activeItem === item.path}
              onClick={() => {
                setActiveItem(item.path);
                if (isMobile) onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return sidebarContent;
};

// Main AdminDashboard Component
const AdminDashboard = () => {
  const [activeItem, setActiveItem] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}>
            <IconButton
              color="primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Sidebar 
            activeItem={activeItem} 
            setActiveItem={setActiveItem}
            isMobile={isMobile}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/products" element={<ProductsManagement />} />
              <Route path="/users" element={<UsersManagement />} />
              <Route path="/orders" element={<OrdersManagement />} />
              <Route path="/deliveries" element={<DeliveryDashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 