// src/components/organisms/TaskItem/TaskItem.tsx
import TaskActions from '@components/molecules/TaskActions/TaskActions';
import TaskDetails from '@components/molecules/TaskDetails/TaskDetails';
import CompletionModal from '@components/organisms/CompletionModal/CompletionModal';
import DeleteModal from '@components/organisms/DeleteModal/DeleteModal';
import EditModal from '@components/organisms/EditModal/EditModal';
import type { AppDispatch } from '@features/store';
import { completeTask, deleteTask, editTask } from '@features/tasks/taskThunks';
import { Task } from '@features/tasks/types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { UserService } from '../../../services/userService';

interface UserReference {
  _id: string;
  name?: string;
}

interface TaskItemProps {
  task: Omit<Task, 'assignedTo'> & { assignedTo: string | UserReference };
  userRole: string;
  employeeName?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, userRole }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showCompletionModal, setShowCompletionModal] =
    useState<boolean>(false);
  const [completionMessage, setCompletionMessage] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.text);
  const [assignedUserName, setAssignedUserName] =
    useState<string>('Loading...');

  // Type guard function
  function isUserObject(assignedTo: unknown): assignedTo is UserReference {
    return (
      typeof assignedTo === 'object' &&
      assignedTo !== null &&
      '_id' in assignedTo
    );
  }

  // Get the assigned user ID
  const getAssignedUserId = (assignedTo: string | UserReference): string => {
    return isUserObject(assignedTo) ? assignedTo._id : assignedTo;
  };

  // Initialize editAssignedTo with the correct ID
  const [editAssignedTo, setEditAssignedTo] = useState<string>(
    getAssignedUserId(task.assignedTo)
  );

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = getAssignedUserId(task.assignedTo);
        const user = await UserService.getUserById(userId);
        setAssignedUserName(user?.name || 'Unknown User');
      } catch (error) {
        console.error('Error fetching user details:', error);
        setAssignedUserName('Unknown User');
      }
    };

    fetchUserName();
  }, [task.assignedTo]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      toast.success('Task successfully deleted!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
    setShowDeleteModal(false);
  };

  const submitCompletion = async () => {
    try {
      await dispatch(
        completeTask({ taskId: task._id, completionMessage })
      ).unwrap();
      toast.success('Task marked as complete!');
    } catch (error) {
      console.error('Error marking task as complete:', error);
      toast.error('Error marking task as complete');
    }
    setShowCompletionModal(false);
    setCompletionMessage('');
  };

  const submitEdit = async () => {
    try {
      await dispatch(
        editTask({
          taskId: task._id,
          text: editText,
          assignedTo: editAssignedTo,
        })
      ).unwrap();
      toast.success('Task successfully updated!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
    }
    setShowEditModal(false);
  };

  return (
    <li className="task-item">
      <TaskDetails
        task={{ ...task, assignedTo: getAssignedUserId(task.assignedTo) }}
        assignedUserName={assignedUserName}
      />
      <TaskActions
        userRole={userRole}
        task={{ ...task, assignedTo: getAssignedUserId(task.assignedTo) }}
        onEdit={() => setShowEditModal(true)}
        onDelete={() => setShowDeleteModal(true)}
        onComplete={() => setShowCompletionModal(true)}
      />

      <CompletionModal
        isOpen={showCompletionModal}
        onRequestClose={() => setShowCompletionModal(false)}
        completionMessage={completionMessage}
        onCompletionMessageChange={(e) => setCompletionMessage(e.target.value)}
        onSubmit={submitCompletion}
        onCancel={() => setShowCompletionModal(false)}
      />

      {userRole === 'admin' && (
        <>
          <EditModal
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            editText={editText}
            onEditTextChange={(e) => setEditText(e.target.value)}
            editAssignedTo={editAssignedTo}
            onEditAssignedToChange={(e) => setEditAssignedTo(e.target.value)}
            onSubmit={submitEdit}
            onCancel={() => setShowEditModal(false)}
          />

          <DeleteModal
            isOpen={showDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        </>
      )}
    </li>
  );
};

export default TaskItem;
