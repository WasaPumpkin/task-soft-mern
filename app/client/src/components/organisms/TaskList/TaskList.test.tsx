import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import TaskItem from '../TaskItem/TaskItem';
import Pagination from '../../molecules/Pagination/Pagination';
import { Task } from '../../../features/tasks/types'; // Adjust the import path

// Mock the TaskItem and Pagination components
jest.mock('../TaskItem/TaskItem', () => jest.fn(() => <div>TaskItem</div>));
jest.mock('../../molecules/Pagination/Pagination', () =>
  jest.fn(() => <div>Pagination</div>)
);

const mockTasks: Task[] = [
  {
    _id: '1',
    text: 'This is task 1', // Use `text` instead of `title` or `name`
    assignedTo: 'user1', // User ID
    status: 'pending',
  },
  {
    _id: '2',
    text: 'This is task 2', // Use `text` instead of `title` or `name`
    assignedTo: 'user2', // User ID
    status: 'completed',
    completedAt: '2023-10-01T12:00:00Z', // Optional
    completionMessage: 'Task completed successfully', // Optional
  },
];

describe('TaskList', () => {
  it('renders no tasks available message when tasks are empty', () => {
    render(
      <TaskList
        tasks={[]}
        userRole="user"
        totalTasks={0}
        totalPages={0}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );
    expect(screen.getByText(/No tasks available/i)).toBeInTheDocument();
  });

  it('renders the correct number of TaskItem components', () => {
    render(
      <TaskList
        tasks={mockTasks}
        userRole="user"
        totalTasks={2}
        totalPages={1}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );
    expect(TaskItem).toHaveBeenCalledTimes(mockTasks.length);
  });

  it('renders pagination when there are more tasks than the limit', () => {
    render(
      <TaskList
        tasks={mockTasks}
        userRole="user"
        totalTasks={10}
        totalPages={2}
        currentPage={1}
        onPageChange={jest.fn()}
      />
    );
    expect(Pagination).toHaveBeenCalled();
  });

});


