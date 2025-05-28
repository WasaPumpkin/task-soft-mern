
// // src/components/organisms/TaskList/TaskList.tsx
import React, { useState, useMemo } from 'react';
import TaskItem from '@components/organisms/TaskItem/TaskItem';
import Pagination from '@components/molecules/Pagination/Pagination';
import TaskListSearch from '@components/molecules/TaskListSearch/TaskListSearch';
import TaskListEmpty from '@components/atoms/TaskListEmpty/TaskListEmpty';
import TaskListMeta from '@components/atoms/TaskListMeta/TaskListMeta';
import { Task } from '@features/tasks/types';

interface TaskListProps {
  tasks: Task[];
  userRole: string;
  totalTasks: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  employees?: Array<{ _id: string; name: string }>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  userRole,
  totalTasks,
  totalPages,
  currentPage,
  onPageChange,
  employees = [],
}) => {
  const tasksPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = useMemo(() => {
    if (!searchTerm.trim() || employees.length === 0) return tasks;

    const term = searchTerm.toLowerCase().trim();
    const matchingEmployeeIds = employees
      .filter((emp) => emp.name.toLowerCase().includes(term))
      .map((emp) => emp._id);

    return tasks.filter((task) =>
      matchingEmployeeIds.includes(task.assignedTo)
    );
  }, [tasks, searchTerm, employees]);

  return (
    <div className="task-list">
      <TaskListSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredTasks.length === 0 ? (
        <TaskListEmpty searchTerm={searchTerm} />
      ) : (
        <>
          <ul>
            {filteredTasks.map((task) => (
              <TaskItem key={task._id} task={task} userRole={userRole} />
            ))}
          </ul>
          <TaskListMeta count={filteredTasks.length} searchTerm={searchTerm} />
        </>
      )}

      {!searchTerm && totalTasks > tasksPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default TaskList;
