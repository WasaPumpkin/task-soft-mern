//src/components/atoms/Input/Input.tsx
import React from 'react';

interface InputProps {
  type: string;
  placeholder?: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string; 
  required?: boolean; 
  ariaLabel?: string; 
  ariaRequired?: boolean; 
  disabled?: boolean; 
  style?: React.CSSProperties; 
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  id,
  required,
  ariaLabel,
  ariaRequired,
  disabled,
  style,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      id={id}
      required={required}
      aria-label={ariaLabel}
      aria-required={ariaRequired}
      disabled={disabled}
      style={style}
    />
  );
};

export default Input;