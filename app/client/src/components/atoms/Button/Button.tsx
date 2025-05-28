//src/components/atoms/Button/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void; 
  disabled?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset'; 
  className?: string; 
  ariaLabel?: string; 
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  style,
  type = 'button', 
  className,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      type={type} 
      className={className}
      aria-label={ariaLabel} 
    >
      {children}
    </button>
  );
};

export default Button;

