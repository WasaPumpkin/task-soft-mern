// src/components/atoms/Label/Label.tsx
import React from 'react';

interface LabelProps {
  htmlFor: string; 
  children: React.ReactNode;
  className?: string;
  required?: boolean; 
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  className,
  required,
}) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
      {required && <span aria-hidden="true"> *</span>}{' '}
      {/* Add asterisk for required fields */}
    </label>
  );
};

export default Label;
