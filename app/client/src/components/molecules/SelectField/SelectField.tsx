//src/components/molecules/SelectField/SelectField.tsx
import { Field } from 'formik';
import React from 'react';
import ErrorMessage from '@components/atoms/ErrorMessage/ErrorMessage'; // Use the alias

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  ariaRequired?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  options,
  error,
  ariaRequired,
}) => {
  return (
    <div className="auth__group">
      <label htmlFor={id} className="auth__label">
        {label}
      </label>
      <Field
        as="select"
        id={id}
        name={name}
        className="auth__input"
        aria-required={ariaRequired}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {error && (
        <ErrorMessage message={error} className="auth__error-message" />
      )}
    </div>
  );
};

export default SelectField;