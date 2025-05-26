// src/features/tasks/initialState.ts
// src/features/tasks/initialState.ts
import { TaskState } from './types';

const initialState: TaskState = {
  tasks: [], // List of tasks
  page: 1, // Current page
  limit: 10, // Tasks per page
  totalPages: 1, // Total number of pages
  totalTasks: 0, // Total number of tasks
  loading: false,
  error: null,
};

export default initialState;