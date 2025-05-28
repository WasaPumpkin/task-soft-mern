//src/components/molecules/InputField/InputField.tsx
import { Field } from 'formik';
import React from 'react';
import ErrorMessage from '@components/atoms/ErrorMessage/ErrorMessage'; // Use the alias

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  error?: string;
  ariaRequired?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  name,
  error,
  ariaRequired,
}) => {
  return (
    <div className="auth__group">
      <label htmlFor={id} className="auth__label">
        {label}
      </label>
      <Field
        type={type}
        id={id}
        name={name}
        className="auth__input"
        aria-required={ariaRequired}
      />
      {error && (
        <ErrorMessage message={error} className="auth__error-message" />
      )}
    </div>
  );
};

export default InputField;