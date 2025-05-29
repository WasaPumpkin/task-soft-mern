//src/components/organisms/LoginForm/LoginForm.tsx
import { Form, Formik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom'; 
import Button from '@components/atoms/Button/Button'; 
import ErrorMessage from '@components/atoms/ErrorMessage/ErrorMessage';
import InputField from '@components/molecules/InputField/InputField'; 
import PasswordInput from '@components/molecules/PasswordInput/PasswordInput'; 

interface LoginFormProps {
  onSubmit: (values: { email: string; password: string }) => void;
  error?: string | null;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error, loading }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log('Form values:', values); // Debug: Log form values
        onSubmit(values);
      }}
    >
      {() => (
        <Form className="auth__form" aria-label="Login Form">
          <h2 className="auth__title">Log inn</h2>
          {error && <ErrorMessage message={error} className="auth__error" />}
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
          <Button type="submit" className="auth__button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {/* Add the "Don't have an account? Register" link */}
          <p className="auth__text">
            Don't have an account yet? <Link to="/register">Register</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;