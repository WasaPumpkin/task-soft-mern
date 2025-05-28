// // components/pages/Dashboard/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { AppDispatch, RootState } from '@features/store';
import { fetchTasks, createTask } from '@features/tasks/taskThunks';
import TaskForm from '@components/organisms/TaskForm/TaskForm';
import TaskList from '@components/organisms/TaskList/TaskList';
import Spinner from '@components/atoms/Spinner/Spinner';

// const BASE_URL = 'http://localhost:7000';
// const BASE_URL = 'https://task-mngmt-infoempleados.onrender.com';
const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:7000'
    : 'https://task-mngmt-infoempleados.onrender.com';


const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // State for pagination and employees
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState<
    Array<{ _id: string; name: string }>
  >([]);
  const tasksPerPage = 5;

  // Get tasks and user info from Redux
  const { tasks, totalPages, totalTasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Fetch tasks and employees when component mounts or page changes
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(fetchTasks({ page: currentPage, limit: tasksPerPage }));
      fetchEmployees();
    }
  }, [userInfo, navigate, dispatch, currentPage]);

  // Fetch employees function (same as in TaskForm)
  const fetchEmployees = async () => {
    if (!userInfo) return;
    try {
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get(
        `${BASE_URL}/api/users/employees`,
        config
      );
      console.log('Fetched employees:', data); // Debug log
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    dispatch(fetchTasks({ page: newPage, limit: tasksPerPage }));
  };

  const handleCreateTask = async (taskData: {
    text: string;
    assignedTo: string;
  }) => {
    try {
      await dispatch(createTask(taskData));
      await dispatch(fetchTasks({ page: currentPage, limit: tasksPerPage }));
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="dashboard">
      <main className="dashboard__main">
        <h2 className="dashboard__title">Tareas</h2>
        {error && <div className="dashboard__error">{error}</div>}
        {userInfo && userInfo.role === 'admin' && (
          <TaskForm onCreateTask={handleCreateTask} />
        )}
        {loading ? (
          <Spinner />
        ) : (
          <TaskList
            tasks={tasks || []}
            userRole={userInfo?.role || 'employee'}
            totalTasks={totalTasks}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            employees={employees} // Pass employees to TaskList
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;


