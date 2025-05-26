//src/features/auth/reducers.ts
import { AuthState } from './types';

// Logout reducer
export const logoutReducer = (state: AuthState) => {
  state.userInfo = null;
  localStorage.removeItem('userInfo');
};
