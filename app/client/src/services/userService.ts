//src/services/userService.tsx
// src/services/userService.tsx
// import axios from 'axios';

// const API_URL = '/api/users'; // Base URL for user-related endpoints

// interface User {
//   _id: string;
//   name: string;
//   role?: string; // Optional if you need role-based filtering
// }

// // Fetch all employees (filtered if needed)
// export const getEmployees = async (): Promise<User[]> => {
//   const token = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo')!).token
//     : null;

//   if (!token) {
//     throw new Error('No authentication token found');
//   }

//   const response = await axios.get<User[]>(`${API_URL}/employees`, { // Changed endpoint
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
  
//   // Ensure name is never undefined
//   return response.data.map(user => ({
//     _id: user._id,
//     name: user.name || 'Unnamed Employee'
//   }));
// };

// // Fetch all users (keep existing)
// export const getUsers = async (): Promise<User[]> => {
//   const token = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo')!).token
//     : null;

//   if (!token) {
//     throw new Error('No authentication token found');
//   }

//   const response = await axios.get<User[]>(API_URL, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
  
//   return response.data.map(user => ({
//     _id: user._id,
//     name: user.name || 'Unnamed User'
//   }));
// };

// // Fetch a single user by ID (keep existing)
// export const getUserById = async (userId: string): Promise<User> => {
//   const token = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo')!).token
//     : null;

//   if (!token) {
//     throw new Error('No authentication token found');
//   }

//   const response = await axios.get<User>(`${API_URL}/${userId}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
  
//   return {
//     _id: response.data._id,
//     name: response.data.name || 'Unknown User'
//   };
// };

import axios from 'axios';

// Determine base API URL depending on environment
const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:7000'
    : 'https://task-mngmt-infoempleados.onrender.com';

const API_URL = `${BASE_URL}/api/users`;

interface User {
  _id: string;
  name: string;
  role?: string;
}

// Fetch all employees
export const getEmployees = async (): Promise<User[]> => {
  const token = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!).token
    : null;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get<User[]>(`${API_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.map((user) => ({
    _id: user._id,
    name: user.name || 'Unnamed Employee',
  }));
};

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  const token = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!).token
    : null;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get<User[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.map((user) => ({
    _id: user._id,
    name: user.name || 'Unnamed User',
  }));
};

// Fetch user by ID
export const getUserById = async (userId: string): Promise<User> => {
  const token = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')!).token
    : null;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await axios.get<User>(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    _id: response.data._id,
    name: response.data.name || 'Unknown User',
  };
};
