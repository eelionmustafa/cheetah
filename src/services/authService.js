import axios from 'axios';

// Update API URL to use the correct port and path
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Mock user data for development
const mockUsers = {
  admin: {
    id: 1,
    username: 'admin_user',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+1 234 567 8900',
  },
  user: {
    id: 2,
    username: 'demo_user',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    role: 'user',
    phone: '+1 234 567 8901',
  },
  delivery: {
    id: 3,
    username: 'delivery_user',
    email: 'delivery@example.com',
    firstName: 'Delivery',
    lastName: 'User',
    role: 'delivery',
    phone: '+1 234 567 8902',
  }
};

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// Helper function to check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Helper function to create mock response
const createMockResponse = (data, message = 'Mock data (API unavailable)') => {
  console.log('Creating mock response with data:', data); // Debug log
  return {
    user: data,
    message,
    isMock: true
  };
};

const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      
      if ((error.message === 'Network Error' || error.code === 'ERR_NETWORK') && isDevelopment) {
        const mockToken = 'mock_token_' + Date.now();
        const mockUserData = {
          ...mockUsers.user,
          ...userData,
          id: Date.now(),
          role: 'user',
        };
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUserData));
        return createMockResponse(mockUserData);
      }
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      console.log('Attempting login with:', email); // Debug log
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      console.log('Login API response:', response.data); // Debug log
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error('Login API error:', error); // Debug log
      
      if ((error.message === 'Network Error' || error.code === 'ERR_NETWORK') && isDevelopment) {
        // Find matching mock user by email
        const mockUser = Object.values(mockUsers).find(user => user.email === email);
        if (!mockUser) {
          throw new Error('Invalid email or password');
        }
        
        console.log('Using mock user for login:', mockUser); // Debug log
        
        const mockToken = 'mock_token_' + Date.now();
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return createMockResponse(mockUser);
      }
      throw new Error(error.response?.data?.message || 'Invalid email or password');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if ((error.message === 'Network Error' || error.code === 'ERR_NETWORK') && isDevelopment) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          return createMockResponse(JSON.parse(storedUser));
        }
        return null;
      }
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw new Error('Failed to get user data');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user role
  getUserRole: () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).role;
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    return null;
  }
};

export default authService; 