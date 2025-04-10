import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
  FormControlLabel,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Language,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { getCartItemCount } from '../../utils/cartUtils';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [cartItemCount, setCartItemCount] = useState(0);

  // Function to update cart count
  const updateCartCount = () => {
    try {
      const count = getCartItemCount();
      setCartItemCount(count);
    } catch (error) {
      console.error('Error updating cart count:', error);
      setCartItemCount(0);
    }
  };

  // Update cart count on component mount
  useEffect(() => {
    updateCartCount();
  }, []);

  // Listen for storage events to update cart count when it changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        updateCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event that can be dispatched from other components
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenu = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    handleLanguageClose();
  };

  const menuItems = [
    { text: t('nav.ourStory'), path: '/our-story' },
    { text: t('nav.categories'), path: '/categories' },
    { text: t('nav.products'), path: '/products' },
    { text: t('nav.profile'), path: '/profile' },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h1"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontFamily: 'Tangerine',
          }}
        >
          Cheetah
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleClose}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            aria-label={t('nav.cart')}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleLanguageMenu}
          >
            <Language />
          </IconButton>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={handleLanguageClose}
          >
            <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageChange('al')}>Albanian</MenuItem>
          </Menu>

          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                icon={<Brightness4 />}
                checkedIcon={<Brightness7 />}
              />
            }
            label=""
          />

          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            variant="outlined"
          >
            {t('nav.login')}
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/signup"
            variant="contained"
          >
            {t('nav.signup')}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 