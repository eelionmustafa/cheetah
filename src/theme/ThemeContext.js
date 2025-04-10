import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';

// Cheetah-inspired color palette
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#D4AF37', // Golden yellow (cheetah's spots)
      light: '#E5C76B',
      dark: '#B38F2D',
    },
    secondary: {
      main: '#8B4513', // Saddle brown (cheetah's fur)
      light: '#A0522D',
      dark: '#654321',
    },
    background: {
      default: mode === 'light' ? '#FFF8DC' : '#121212', // Cream color for light, dark for dark mode
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#2C1810' : '#FFFFFF', // Dark brown for light, white for dark
      secondary: mode === 'light' ? '#5C4033' : '#B0B0B0', // Medium brown for light, light gray for dark
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Tangerine", cursive',
      fontSize: '4rem',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Tangerine", cursive',
      fontSize: '3rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
  },
});

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({
      toggleTheme,
      isDarkMode: mode === 'dark',
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 