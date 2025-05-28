//src/features/auth/types.ts

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

// Define the AuthState interface
export interface AuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

// Define the LoginCredentials interface
export interface LoginCredentials {
  email: string;
  password: string;
}

// Define the RegisterCredentials interface
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role: string;
}

// Define the rejected payload type
export type RejectedPayload = string | undefined;
