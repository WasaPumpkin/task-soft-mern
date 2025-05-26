//src/features/tasks/reducers.ts
import { TaskState } from './types';

export const resetErrorReducer = (state: TaskState) => {
  state.error = null;
};
