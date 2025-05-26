// src/components/atoms/Select/Select.tsx
// src/components/atoms/Select/Select.tsx
import React from 'react';

interface SelectProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  required?: boolean;
  ariaRequired?: boolean;
  ariaLabel?: string;
  disabled?: boolean; // Add this line
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  id,
  value,
  onChange,
  className,
  required,
  ariaRequired,
  ariaLabel,
  disabled = false, // Add this line with default value
  children,
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={className}
      required={required}
      aria-required={ariaRequired}
      aria-label={ariaLabel}
      disabled={disabled} // Add this attribute
    >
      {children}
    </select>
  );
};

export default Select;
