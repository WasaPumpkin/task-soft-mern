// src/features/tasks/extraReducersHelpers.ts
// features/tasks/extraReducersHelpers.ts
import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import { TaskState } from './types';

// Helper for task mutations (create, delete, complete, edit)
const handleTaskMutation = <T, Arg>(
  builder: ActionReducerMapBuilder<TaskState>,
  thunk: AsyncThunk<T, Arg, { state: TaskState }>,
  updateState: (state: TaskState, payload: T) => void
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false;
      updateState(state, action.payload);
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
};

export { handleTaskMutation };