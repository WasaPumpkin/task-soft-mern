//src/components/atoms/TaskListMeta/TaskListMeta.tsx
// src/components/atoms/TaskListMeta/TaskListMeta.tsx
import React from 'react';

interface TaskListMetaProps {
  count: number;
  totalTasks?: number; // Add this to the interface
  searchTerm?: string;
}

const TaskListMeta: React.FC<TaskListMetaProps> = ({ 
  count, 
  totalTasks, 
  searchTerm 
}) => (
  <div className="task-list__meta">
    {totalTasks ? (
      <>
        Showing {count} of {totalTasks} task{totalTasks !== 1 ? 's' : ''}
        {searchTerm && ` matching "${searchTerm}"`}
      </>
    ) : (
      <>
        Showing {count} task{count !== 1 ? 's' : ''}
        {searchTerm && ` matching "${searchTerm}"`}
      </>
    )}
  </div>
);

export default TaskListMeta;