//src/components/atoms/TaskStatus/TaskStatus.tsx
import React from 'react';

interface TaskStatusProps {
  status: string;
  completedAt?: string;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ status, completedAt }) => {
  return (
    <p className="task-item__status">
      Status: {status}
      {status === 'completed' && completedAt && (
        <span className="task-item__date">
          - Completed on {new Date(completedAt).toLocaleDateString()}
        </span>
      )}
    </p>
  );
};

export default TaskStatus;
