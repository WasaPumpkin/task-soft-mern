// src/features/tasks/types.ts
export interface Task {
  _id: string;
  text: string;
  assignedTo: string; // User ID
  status: string;
  completedAt?: string;
  completionMessage?: string;
}

export interface TaskState {
  tasks: Task[]; // List of tasks
  page: number; // Current page
  limit: number; // Tasks per page
  totalPages: number; // Total number of pages
  totalTasks: number; // Total number of tasks
  loading: boolean;
  error: string | null;
  searchTerm?: string; // Add search term to state
}

export interface CreateTaskPayload {
  text: string;
  assignedTo: string; // User ID
}

export interface CompleteTaskPayload {
  taskId: string;
  completionMessage: string;
}

export interface EditTaskPayload {
  taskId: string;
  text: string;
  assignedTo: string; // User ID
}
