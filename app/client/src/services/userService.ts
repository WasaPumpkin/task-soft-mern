// import axios from 'axios';

// // Determine base API URL depending on environment
// const BASE_URL =
//   window.location.hostname === 'localhost'
//     ? 'http://localhost:7000'
//     : 'https://task-mngmt-infoempleados.onrender.com';

// const API_URL = `${BASE_URL}/api/users`;

// interface User {
//   _id: string;
//   name: string;
//   role?: string;
// }

// // Fetch all employees
// export const getEmployees = async (): Promise<User[]> => {
//   const token = localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo')!).token
//     : null;

//   if (!token) {
//     throw new Error('No authentication token found');
//   }

//   const response = await axios.get<User[]>(`${API_URL}/employees`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data.map((user) => ({
//     _id: user._id,
//     name: user.name || 'Unnamed Employee',
//   }));
// };

// // Fetch all users
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

//   return response.data.map((user) => ({
//     _id: user._id,
//     name: user.name || 'Unnamed User',
//   }));
// };

// // Fetch user by ID
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
//     name: response.data.name || 'Unknown User',
//   };
// };

//apr/services/userService.ts
import http from '../api/http';
import { API_ENDPOINTS } from '../config/env';

interface User {
  _id: string;
  name: string;
  role?: string;
}

export const UserService = {
  /**
   * Fetch all employees
   */
  getEmployees: async (): Promise<User[]> => {
    try {
      const { data } = await http.get<User[]>(
        `${API_ENDPOINTS.USERS}/employees`
      );
      return data.map((user) => ({
        _id: user._id,
        name: user.name || 'Unnamed Employee',
      }));
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  /**
   * Fetch all users
   */
  getUsers: async (): Promise<User[]> => {
    try {
      const { data } = await http.get<User[]>(API_ENDPOINTS.USERS);
      return data.map((user) => ({
        _id: user._id,
        name: user.name || 'Unnamed User',
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  /**
   * Fetch user by ID
   */
  getUserById: async (userId: string): Promise<User> => {
    try {
      const { data } = await http.get<User>(`${API_ENDPOINTS.USERS}/${userId}`);
      return {
        _id: data._id,
        name: data.name || 'Unknown User',
      };
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  },
};
