// src/components/organisms/TaskForm/TaskForm.tsx
// src/components/organisms/TaskForm/TaskForm.tsx
// src/components/organisms/TaskForm/TaskForm.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { RootState } from '@features/store';
import Button from '@components/atoms/Button/Button';
import Input from '@components/atoms/Input/Input';
import Select from '@components/atoms/Select/Select';
import Label from '@components/atoms/Label/Label';

interface Employee {
  _id: string;
  name: string;
}

interface TaskFormProps {
  onCreateTask: (taskData: {
    text: string;
    assignedTo: string;
  }) => Promise<void>;
  loading?: boolean;
}

// IMPORTANT: Access the environment variable using Vite's import.meta.env
// Ensure your client/.env file has VITE_APP_API_BASE_URL=http://localhost:7000
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// It's good practice to add a check for missing environment variables
if (!API_BASE_URL) {
  console.error("Error: VITE_APP_API_BASE_URL is not defined in TaskForm.tsx! API calls might fail.");
}

const TaskForm: React.FC<TaskFormProps> = ({
  onCreateTask,
  loading = false,
}) => {
  const [text, setText] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!userInfo) return;
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        // Use the API_BASE_URL here for fetching employees
        const { data } = await axios.get(
          `${API_BASE_URL}/api/users/employees`, // This line is correct with API_BASE_URL
          config
        );
        setEmployees(data as Employee[]);
      } catch (err) {
        console.error('Error fetching employees:', err);
        toast.error('Failed to fetch employees. Please try again.');
      }
    };
    fetchEmployees();
  }, [userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !assignedTo) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      await onCreateTask({ text, assignedTo });
      setText('');
      setAssignedTo('');
      toast.success('Task created successfully!');
    } catch (err) {
      console.error('Error creating task:', err);
      toast.error('Failed to create task. Please try again.');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} aria-label="Task Form">
      <h3 className="task-form__title">Assign New Task</h3>
      <div className="task-form__group">
        <Label htmlFor="taskText" className="task-form__label" required>
          Task
        </Label>
        <Input
          type="text"
          id="taskText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="task-form__input"
          required
          ariaLabel="Task Input"
          ariaRequired
          disabled={loading}
        />
      </div>
      <div className="task-form__group">
        <Label htmlFor="assignedTo" className="task-form__label" required>
          Assign To
        </Label>
        <Select
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="task-form__input"
          required
          ariaLabel="Assign To Dropdown"
          ariaRequired
          disabled={loading}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </Select>
      </div>
      <Button
        type="submit"
        className="task-form__button"
        ariaLabel="Create Task"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Task'}
      </Button>
    </form>
  );
};

export default TaskForm;




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
