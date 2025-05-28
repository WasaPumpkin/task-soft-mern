//src/features/tasks/taskService.ts
import axios from 'axios';
import {
  Task,
  CreateTaskPayload,
  CompleteTaskPayload,
  EditTaskPayload,
} from './types';

// const API_URL = 'http://localhost:7000/api/tasks'; 
const API_URL = `${
  window.location.hostname === 'localhost'
    ? 'http://localhost:7000'
    : 'https://task-mngmt-infoempleados.onrender.com'
}/api/tasks`;

// Fetch paginated tasks
export const fetchTasksAPI = async (token: string, page: number, limit: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit }, // Pass page and limit as query parameters
  };
  const response = await axios.get(API_URL, config);
  return response.data; // Backend should return tasks and pagination metadata
};

// Create a new task
export const createTaskAPI = async (
  payload: CreateTaskPayload,
  token: string
) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, payload, config);
  return response.data as Task;
};

// Delete a task
export const deleteTaskAPI = async (taskId: string, token: string) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  await axios.delete(`${API_URL}/${taskId}`, config);
  return taskId;
};

// Complete a task
export const completeTaskAPI = async (
  payload: CompleteTaskPayload,
  token: string
) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(
    `${API_URL}/${payload.taskId}/complete`,
    payload,
    config
  );
  return response.data as Task;
};

// Edit a task
export const editTaskAPI = async (payload: EditTaskPayload, token: string) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(
    `${API_URL}/${payload.taskId}`,
    payload,
    config
  );
  return response.data as Task;
};
