//src/features/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import taskReducer from './tasks/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

