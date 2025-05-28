//src/features/auth/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  LoginCredentials,
  RegisterCredentials,
  RejectedPayload,
  UserInfo, // Import UserInfo for return type consistency
} from './types';
import { loginUserAPI, registerUserAPI } from './authService';


const handleAxiosError = (error: unknown): RejectedPayload => {
  if (axiosErrorGuard(error)) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('API Error:', errorMessage); // Log the error
    return errorMessage;
  }
  if (error instanceof Error) {
    console.error('Error:', error.message);
    return error.message;
  }
  console.error('Non-Axios Error:', error); // Log the error
  return 'An unexpected error occurred.';
};

//Type guard to check if error is of type AxiosError
function axiosErrorGuard(error: unknown): error is AxiosError<{ message: string }> {
  return !!(error as AxiosError<{ message: string }>).isAxiosError;
}
// Login async thunk
export const loginUser = createAsyncThunk<
  UserInfo, // Return type
  LoginCredentials, // Argument type
  { rejectValue: RejectedPayload } // ThunkApiConfig
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    return await loginUserAPI(credentials);
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

// Register async thunk
export const registerUser = createAsyncThunk<
  UserInfo, // Return type
  RegisterCredentials, // Argument type
  { rejectValue: RejectedPayload } // ThunkApiConfig
>('auth/registerUser', async (credentials, { rejectWithValue }) => {
  try {
    return await registerUserAPI(credentials);
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

