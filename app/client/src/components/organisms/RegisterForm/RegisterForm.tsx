//src/components/organisms/RegisterForm/RegisterForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import InputField from '@components/molecules/InputField/InputField'; 
import PasswordInput from '@components/molecules/PasswordInput/PasswordInput'; 
import SelectField from '@components/molecules/SelectField/SelectField'; 
import Button from '@components/atoms/Button/Button'; 
import ErrorMessage from '@components/atoms/ErrorMessage/ErrorMessage'; 
interface RegisterFormProps {
  onSubmit: (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }) => void;
  error?: string | null;
  loading: boolean;
  children?: React.ReactNode;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  error,
  loading,
  children,
}) => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'employee',
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="auth__form" aria-label="Registration Form">
          <h2 className="auth__title">Register</h2>
          {error && <ErrorMessage message={error} className="auth__error" />}
          <InputField
            label="Name"
            type="text"
            id="name"
            name="name"
            ariaRequired={true}
          />
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            ariaRequired={true}
          />
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            ariaRequired={true}
          />
          <PasswordInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            ariaRequired={true}
          />
          <SelectField
            label="Role"
            id="role"
            name="role"
            options={[
              { value: 'employee', label: 'Employee' },
              { value: 'admin', label: 'Admin' },
            ]}
            ariaRequired={true}
          />
          <div className="auth__group">
            <Button type="submit" className="auth__button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
          {/* Render children */}
          {children}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
