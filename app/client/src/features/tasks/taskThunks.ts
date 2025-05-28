// src/features/tasks/taskThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust the path to your store file
import {
  fetchTasksAPI,
  createTaskAPI,
  deleteTaskAPI,
  completeTaskAPI,
  editTaskAPI,
} from './taskService';
import {
  CreateTaskPayload,
  CompleteTaskPayload,
  EditTaskPayload,
} from './types';

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (
    { page, limit }: { page: number; limit: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.userInfo?.token || '';
      console.log('Fetching tasks with page:', page, 'limit:', limit); // Debug log
      const response = await fetchTasksAPI(token, page, limit);
      console.log('Fetched tasks:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error fetching tasks:', error); // Debug log
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch tasks.'
      );
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (payload: CreateTaskPayload, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.userInfo?.token || '';
      console.log('Creating task with payload:', payload); // Debug log
      const response = await createTaskAPI(payload, token);
      console.log('Created task:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error creating task:', error); // Debug log
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to create task.'
      );
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.userInfo?.token || '';
      console.log('Deleting task with ID:', taskId); // Debug log
      const response = await deleteTaskAPI(taskId, token);
      console.log('Deleted task:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error deleting task:', error); // Debug log
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete task.'
      );
    }
  }
);

// Complete a task
export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (payload: CompleteTaskPayload, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.userInfo?.token || '';
      console.log('Completing task with payload:', payload); // Debug log
      const response = await completeTaskAPI(payload, token);
      console.log('Completed task:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error completing task:', error); // Debug log
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to complete task.'
      );
    }
  }
);

// Edit a task
export const editTask = createAsyncThunk(
  'tasks/editTask',
  async (payload: EditTaskPayload, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as RootState;
      const token = auth.userInfo?.token || '';
      console.log('Editing task with payload:', payload); // Debug log
      const response = await editTaskAPI(payload, token);
      console.log('Edited task:', response); // Debug log
      return response;
    } catch (error) {
      console.error('Error editing task:', error); // Debug log
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to edit task.'
      );
    }
  }
);
