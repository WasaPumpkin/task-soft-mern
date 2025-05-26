// src/components/molecules/TaskActions/TaskActions.tsx
import React from 'react';
import Button from '@components/atoms/Button/Button'; // Use the alias
import { Task } from '@features/tasks/types'; // Use the alias

interface TaskActionsProps {
  userRole: string;
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  userRole,
  task,
  onEdit,
  onDelete,
  onComplete,
}) => (
  <div className="task-item__actions">
    {userRole === 'admin' ? (
      <>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
        <Button
          onClick={onComplete}
          disabled={task.status === 'completed'}
          className={
            task.status === 'completed' ? 'btn-completed' : 'btn-complete'
          }
        >
          {task.status === 'completed' ? 'Completed' : 'Mark as Complete'}
        </Button>
      </>
    ) : (
      <Button
        onClick={onComplete}
        disabled={task.status === 'completed'}
        className={task.status === 'completed' ? 'btn-completed' : 'btn-submit'}
      >
        {task.status === 'completed' ? 'Completed' : 'Submit'}
      </Button>
    )}
  </div>
);

export default TaskActions;
