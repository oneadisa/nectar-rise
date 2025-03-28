import { store } from '@/store/store';

/**
 * Check if the user is authenticated
 * @returns boolean indicating if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const state = store.getState();
  return state.auth.isLoggedIn && !!state.auth.token;
};

/**
 * Get the current authentication token
 * @returns string | null - the auth token or null if not authenticated
 */
export const getAuthToken = (): string | null => {
  const state = store.getState();
  return state.auth.token;
};

/**
 * Get the current user information
 * @returns object | null - the user object or null if not authenticated
 */
export const getCurrentUser = () => {
  const state = store.getState();
  return state.auth.user;
};
