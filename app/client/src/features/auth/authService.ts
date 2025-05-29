// ////src/features/auth/authService.ts
// import axios from 'axios';
// import { LoginCredentials, RegisterCredentials, UserInfo } from './types';

// // Define the API URL
// const API_URL = `${
//   window.location.hostname === 'localhost'
//     ? 'http://localhost:7000'
//     : 'https://task-mngmt-infoempleados.onrender.com'
// }/api/users`;

// // Login API call
// export const loginUserAPI = async ({ email, password }: LoginCredentials) => {
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   localStorage.setItem('userInfo', JSON.stringify(response.data));
//   return response.data as UserInfo;
// };

// // Register API call
// export const registerUserAPI = async ({
//   name,
//   email,
//   password,
//   role,
// }: RegisterCredentials) => {
//   const response = await axios.post(API_URL, { name, email, password, role });
//   localStorage.setItem('userInfo', JSON.stringify(response.data));
//   return response.data as UserInfo;
// };

import http from '../../api/http';
import { API_ENDPOINTS } from '../../config/env';
import { LoginCredentials, RegisterCredentials, UserInfo } from './types';

// Login API call
export const loginUserAPI = async ({
  email,
  password,
}: LoginCredentials): Promise<UserInfo> => {
  const response = await http.post<UserInfo>(`${API_ENDPOINTS.USERS}/login`, {
    email,
    password,
  });
  localStorage.setItem('userInfo', JSON.stringify(response.data));
  return response.data;
};

// Register API call
export const registerUserAPI = async ({
  name,
  email,
  password,
  role,
}: RegisterCredentials): Promise<UserInfo> => {
  const response = await http.post<UserInfo>(API_ENDPOINTS.USERS, {
    name,
    email,
    password,
    role,
  });
  localStorage.setItem('userInfo', JSON.stringify(response.data));
  return response.data;
};
