//src/features/auth/initialState.ts
import { AuthState } from './types';

// Retrieve user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

// Define the initial state
export const initialState: AuthState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};