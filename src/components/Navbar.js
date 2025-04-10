import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem } from '@mui/material';
import { ShoppingCart, Language, AccountCircle, ExitToApp } from '@mui/icons-material';
import { getCartItemCount } from '../utils/cartUtils';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  // Update cart count when component mounts and when cart is updated
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };

    // Initial cart count
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    handleUserMenuClose();
  };

  const handleDashboardClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else if (user?.role === 'delivery') {
      navigate('/delivery');
    }
    handleUserMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Cheetah
        </Typography>
        
        <Button color="inherit" component={Link} to="/">
          {t('nav.home')}
        </Button>
        <Button color="inherit" component={Link} to="/our-story">
          {t('nav.ourStory')}
        </Button>
        <Button color="inherit" component={Link} to="/categories">
          {t('nav.categories')}
        </Button>
        <Button color="inherit" component={Link} to="/products">
          {t('nav.products')}
        </Button>
        
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
        
        <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Language />
        </IconButton>
        
        {isAuthenticated ? (
          <>
            <IconButton color="inherit" onClick={handleUserMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              {(user?.role === 'admin' || user?.role === 'delivery') && (
                <MenuItem onClick={handleDashboardClick}>
                  {user?.role === 'admin' ? 'Admin Dashboard' : 'Delivery Dashboard'}
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>
                <ExitToApp fontSize="small" sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('al')}>Shqip</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 