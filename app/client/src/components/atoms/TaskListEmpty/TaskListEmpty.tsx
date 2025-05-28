//src/components/atoms/TaskListEmpty/TaskListEmpty.tsx
import React from 'react';

interface TaskListEmptyProps {
  searchTerm?: string;
}

const TaskListEmpty: React.FC<TaskListEmptyProps> = ({ searchTerm }) => (
  <p className="task-list__empty">
    {searchTerm
      ? `No tasks assigned to employees matching "${searchTerm}"`
      : 'No tasks available'}
  </p>
);

export default TaskListEmpty;