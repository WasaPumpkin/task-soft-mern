// src/features/tasks/extraReducers.ts
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { TaskState } from './types';
import { fetchTasks } from './taskThunks';

export const extraReducers = (builder: ActionReducerMapBuilder<TaskState>) => {
  builder
    .addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload.tasks; // Update tasks
      state.page = action.payload.page; // Update current page
      state.limit = action.payload.limit; // Update tasks per page
      state.totalPages = action.payload.totalPages; // Update total pages
      state.totalTasks = action.payload.totalTasks; // Update total tasks
    })
    .addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};