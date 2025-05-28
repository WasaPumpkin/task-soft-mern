//src/components/atoms/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return <span className={className}>{message}</span>;
};

export default ErrorMessage;
