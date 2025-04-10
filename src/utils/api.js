import axios from 'axios';

// Define the API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth functions
export const login = async (email, password) => {
    try {
        console.log('API login request:', { email });
        const response = await api.post('/auth/login', { email, password });
        console.log('API login response:', response.data);
        
        // Validate response data
        if (!response.data || !response.data.data || !response.data.data.user) {
            throw new Error('Invalid response format from server');
        }
        
        const { user, token } = response.data.data;
        
        // Validate user data
        if (!user.id || !user.role || !user.firstName || !user.lastName || !user.email) {
            throw new Error('Invalid user data received from server');
        }
        
        // Validate token
        if (!token) {
            throw new Error('No token received from server');
        }
        
        return response.data;
    } catch (error) {
        console.error('API login error:', error);
        console.error('API error details:', error.response ? error.response.data : 'No response data');
        
        // Enhance error message
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                    throw new Error('Invalid email or password');
                case 403:
                    throw new Error('Your account has been deactivated');
                case 404:
                    throw new Error('User not found');
                case 500:
                    throw new Error('Server error occurred');
                default:
                    throw new Error(data?.message || 'An error occurred during login');
            }
        } else if (error.request) {
            throw new Error('Network error occurred');
        } else {
            throw error;
        }
    }
};

export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const verifyToken = async () => {
    const response = await api.get('/auth/verify');
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
};

// Product functions
export const getProducts = async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
};

export const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

// Category functions
export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

// Cart functions
export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
};

export const addToCart = async (productId, quantity) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
};

export const removeFromCart = async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete('/cart');
    return response.data;
};

// Order functions
export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

export const getOrder = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

// Review functions
export const addReview = async (productId, reviewData) => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
};

export default api;
