// src/components/molecules/PasswordInput/PasswordInput.tsx
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'formik'; 
import React, { useState } from 'react';
import Button from '@components/atoms/Button/Button'; // Use the alias
import ErrorMessage from '@components/atoms/ErrorMessage/ErrorMessage'; // Use the alias
import Label from '@components/atoms/Label/Label'; // Use the alias
interface PasswordInputProps {
  label: string;
  id: string;
  name: string;
  error?: string;
  ariaRequired?: boolean;
  required?: boolean; // Add required prop to match LabelProps
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  name,
  error,
  ariaRequired,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth__group">
      <Label htmlFor={id} className="auth__label" required={required}>
        {label}
      </Label>
      <div className="auth__password-input">
        <Field
          type={showPassword ? 'text' : 'password'}
          id={id}
          name={name}
          className="auth__input"
          aria-required={ariaRequired}
        />
        <Button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="auth__password-toggle"
          ariaLabel={showPassword ? 'Hide password' : 'Show password'}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </Button>
      </div>
      {error && (
        <ErrorMessage message={error} className="auth__error-message" />
      )}
    </div>
  );
};

export default PasswordInput;
