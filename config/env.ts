// Environment configuration
export const API_BASE_URL = 'https://fakestoreapi.com';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/users',
  
  // Product endpoints
  PRODUCTS: '/products',
  CATEGORIES: '/products/categories',
  CATEGORY: '/products/category',
  
  // User endpoints
  USERS: '/users',
  
  // Cart endpoints
  CARTS: '/carts',
  USER_CART: '/carts/user',
};

// Construct full API URL
export const getApiUrl = (endpoint: string): string => `${API_BASE_URL}${endpoint}`;
