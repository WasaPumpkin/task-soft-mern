//src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { logoutReducer } from './reducers';
import { extraReducers } from './extraReducers';

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: logoutReducer,
  },
  extraReducers,
});

// Export the logout action
export const { logout } = authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;