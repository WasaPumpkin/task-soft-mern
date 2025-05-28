//src/components/molecules/TaskListSearch/TaskListSearch.tsx;
import React from 'react';
import Input from '@components/atoms/Input/Input';
import Button from '@components/atoms/Button/Button';

interface TaskListSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TaskListSearch: React.FC<TaskListSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="task-list__search">
      <div style={{ position: 'relative' }}>
        <Input
          type="text"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          ariaLabel="Search by employee name"
          style={{
            paddingRight: '2.5rem',
        
          }}
        />
        {searchTerm && (
          <Button
            onClick={handleClear}
            ariaLabel="Clear search"
            type="button"
            style={{
              position: 'absolute',
              right: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#999',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              lineHeight: 1,
              zIndex: 2,
            }}
          >
            ×
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskListSearch;