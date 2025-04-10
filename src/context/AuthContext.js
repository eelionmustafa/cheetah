import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

// Valid user roles
const VALID_ROLES = ['admin', 'delivery', 'user'];

// Validate user data
const validateUserData = (userData) => {
  // Handle different response structures
  let user = userData.user || userData;
  
  if (!user) {
    throw new Error('Invalid user data');
  }
  
  const { id, role, firstName, lastName, email } = user;
  
  if (!id || !role || !firstName || !lastName || !email) {
    throw new Error('Missing required user fields');
  }
  
  if (!VALID_ROLES.includes(role)) {
    throw new Error('Invalid user role');
  }
  
  return {
    id,
    role,
    firstName,
    lastName,
    email,
    name: `${firstName} ${lastName}`
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          const validatedUser = validateUserData(userData);
          setUser(validatedUser);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Clear any invalid stored data
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authService.login(email, password);
      console.log('Login response:', response); // Debug log
      const validatedUser = validateUserData(response);
      console.log('Validated user:', validatedUser); // Debug log
      setUser(validatedUser);
      return validatedUser;
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setError(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the allowed roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 