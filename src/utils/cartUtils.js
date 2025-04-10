import { getProductById } from '../services/productService';

const CART_STORAGE_KEY = 'cart';

/**
 * Get cart items from local storage synchronously
 * @returns {Array} - The cart items from local storage
 */
const getCartItemsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Error getting cart items from storage:', error);
    return [];
  }
};

/**
 * Get cart items from local storage and fetch their current data from the API
 * @returns {Promise<Array>} - Promise with the cart items
 */
export const getCartItems = async () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    
    // Fetch current product data for each cart item
    const updatedItems = await Promise.all(
      cartItems.map(async (item) => {
        try {
          const product = await getProductById(item.id);
          return {
            ...product,
            quantity: item.quantity
          };
        } catch (error) {
          console.error(`Error fetching product ${item.id}:`, error);
          return item; // Return original item if fetch fails
        }
      })
    );

    return updatedItems;
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

/**
 * Add item to cart
 * @param {Object} product - The product to add
 * @param {number} quantity - The quantity to add
 */
export const addToCart = (product, quantity = 1) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        id: product.id,
        quantity
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

/**
 * Remove item from cart
 * @param {string|number} productId - The product ID to remove
 */
export const removeFromCart = (productId) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    const updatedItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

/**
 * Update item quantity in cart
 * @param {string|number} productId - The product ID to update
 * @param {number} quantity - The new quantity
 */
export const updateCartItemQuantity = (productId, quantity) => {
  try {
    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    const item = cartItems.find(item => item.id === productId);

    if (item) {
      item.quantity = quantity;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
  }
};

/**
 * Get total number of items in cart
 * @returns {number} - Total number of items
 */
export const getCartItemCount = () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
};

/**
 * Calculate cart total
 * @param {Array} cartItems - Array of cart items with current prices
 * @returns {number} - Cart total
 */
export const getCartTotal = (cartItems) => {
  try {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
};

/**
 * Clear cart
 */
export const clearCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
}; 