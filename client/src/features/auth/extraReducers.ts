//src/features/auth/extraReducers.ts
import { loginUser, registerUser } from './authThunks';
import { AuthState, UserInfo } from './types';
import { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';

// Define extra reducers in a separate function
export const extraReducers = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    // Login Cases
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.loading = false;
      state.userInfo = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'An error occurred during login.';
    })
    // Register Cases
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.userInfo = action.payload;
      }
    )
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'An error occurred during registration.';
    });
};
