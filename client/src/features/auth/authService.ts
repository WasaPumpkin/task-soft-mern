////src/features/auth/authService.ts
// src/features/auth/authService.ts
// src/features/auth/authService.ts
import axios from 'axios';
import { LoginCredentials, RegisterCredentials, UserInfo } from './types';

// Access the environment variable using Vite's import.meta.env
// Ensure your client/.env file has VITE_APP_API_BASE_URL=http://localhost:7000
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// It's good practice to add a check for missing environment variables,
// especially for production builds.
if (!API_BASE_URL) {
  console.error("Error: VITE_APP_API_BASE_URL is not defined! API calls might fail.");
  // In a real application, you might want to throw an error or show a user-friendly message.
}

const API_USERS_URL = `${API_BASE_URL}/api/users`;

// Login API call
export const loginUserAPI = async ({ email, password }: LoginCredentials) => {
  const response = await axios.post(`${API_USERS_URL}/login`, { email, password });
  localStorage.setItem('userInfo', JSON.stringify(response.data));
  return response.data as UserInfo;
};

// Register API call
export const registerUserAPI = async ({
  name,
  email,
  password,
  role,
}: RegisterCredentials) => {
  const response = await axios.post(API_USERS_URL, { name, email, password, role });
  localStorage.setItem('userInfo', JSON.stringify(response.data));
  return response.data as UserInfo;
};