import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '10000');
const ENABLE_MOCK_API = process.env.REACT_APP_ENABLE_MOCK_API === 'true';
const ENABLE_LOGGING = process.env.REACT_APP_ENABLE_LOGGING === 'true';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

const log = (message, data) => {
  if (ENABLE_LOGGING) {
    console.log(`[ProductService] ${message}`, data || '');
  }
};

/**
 * Get all products with optional filtering
 * @param {Object} filters - Optional filters (category, search, etc.)
 * @returns {Promise} - Promise with the products data
 */
export const getProducts = async (filters = {}) => {
  log('Fetching products with filters:', filters);

  try {
    if (ENABLE_MOCK_API) {
      log('Using mock API');
      return {
        products: [
          {
            id: 1,
            name: 'Sample Product 1',
            description: 'A sample product description',
            price: 29.99,
            image: 'https://via.placeholder.com/150',
            category: 'electronics',
            stock: 10,
            rating: 4.5,
            reviews: 25
          },
          {
            id: 2,
            name: 'Sample Product 2',
            description: 'Another sample product description',
            price: 19.99,
            image: 'https://via.placeholder.com/150',
            category: 'clothing',
            stock: 15,
            rating: 4.0,
            reviews: 18
          }
        ],
        total: 2,
        page: 1,
        pages: 1
      };
    }

    const response = await axiosInstance.get('/products', { params: filters });
    log('Products fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    log('Error fetching products:', error.message);
    throw error;
  }
};

/**
 * Get a product by ID
 * @param {string} productId - The product ID
 * @returns {Promise} - Promise with the product data
 */
export const getProductById = async (productId) => {
  log('Fetching product:', productId);

  try {
    if (ENABLE_MOCK_API) {
      log('Using mock API');
      return {
        id: productId,
        name: 'Sample Product',
        description: 'A sample product description',
        price: 29.99,
        image: 'https://via.placeholder.com/150',
        category: 'electronics',
        stock: 10,
        rating: 4.5,
        reviews: 25
      };
    }

    const response = await axiosInstance.get(`/products/${productId}`);
    log('Product fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    log('Error fetching product:', error.message);
    throw error;
  }
};

/**
 * Get all categories
 * @returns {Promise} - Promise with the categories data
 */
export const getCategories = async () => {
  log('Fetching categories');

  try {
    if (ENABLE_MOCK_API) {
      log('Using mock API');
      return [
        {
          id: 1,
          name: 'Electronics',
          slug: 'electronics',
          description: 'Electronic devices and accessories'
        },
        {
          id: 2,
          name: 'Clothing',
          slug: 'clothing',
          description: 'Fashion and apparel'
        },
        {
          id: 3,
          name: 'Books',
          slug: 'books',
          description: 'Books and literature'
        }
      ];
    }

    const response = await axiosInstance.get('/categories');
    log('Categories fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    log('Error fetching categories:', error.message);
    throw error;
  }
};

/**
 * Get products by category
 * @param {string} categoryId - The category ID
 * @param {Object} filters - Optional filters (search, etc.)
 * @returns {Promise} - Promise with the products data
 */
export const getProductsByCategory = async (categoryId, filters = {}) => {
  log('Fetching products by category:', categoryId);

  try {
    if (ENABLE_MOCK_API) {
      log('Using mock API');
      return {
        products: [
          {
            id: 1,
            name: 'Sample Product 1',
            description: 'A sample product description',
            price: 29.99,
            image: 'https://via.placeholder.com/150',
            category: categoryId,
            stock: 10,
            rating: 4.5,
            reviews: 25
          }
        ],
        total: 1,
        page: 1,
        pages: 1
      };
    }

    const response = await axiosInstance.get(`/categories/${categoryId}/products`, { params: filters });
    log('Products fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    log('Error fetching products by category:', error.message);
    throw error;
  }
};

/**
 * Search products
 * @param {string} query - The search query
 * @param {Object} filters - Optional filters (category, etc.)
 * @returns {Promise} - Promise with the search results
 */
export const searchProducts = async (query, filters = {}) => {
  log('Searching products:', query);

  try {
    if (ENABLE_MOCK_API) {
      log('Using mock API');
      return {
        products: [
          {
            id: 1,
            name: 'Sample Product 1',
            description: 'A sample product description',
            price: 29.99,
            image: 'https://via.placeholder.com/150',
            category: 'electronics',
            stock: 10,
            rating: 4.5,
            reviews: 25
          }
        ],
        total: 1,
        page: 1,
        pages: 1
      };
    }

    const response = await axiosInstance.get('/products/search', { 
      params: { 
        q: query,
        ...filters
      }
    });
    log('Search results fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    log('Error searching products:', error.message);
    throw error;
  }
}; 