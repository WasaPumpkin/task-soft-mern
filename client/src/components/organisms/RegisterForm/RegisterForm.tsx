//src/components/organisms/RegisterForm/RegisterForm.tsx
// import React from 'react';
// import { Formik, Form } from 'formik';
// import InputField from '@components/molecules/InputField/InputField';
// import PasswordInput from '@components/molecules/PasswordInput/PasswordInput';
// import SelectField from '@components/molecules/SelectField/SelectField';
// import Button from '@components/atoms/Button/Button';
// import ErrorMessage from '@components/atoms/ErrorMessage/ErrorMessage';
// interface RegisterFormProps {
//   onSubmit: (values: {
//     name: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     role: string;
//   }) => void;
//   error?: string | null;
//   loading: boolean;
//   children?: React.ReactNode;
// }

// const RegisterForm: React.FC<RegisterFormProps> = ({
//   onSubmit,
//   error,
//   loading,
//   children,
// }) => {
//   return (
//     <Formik
//       initialValues={{
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         role: 'employee',
//       }}
//       onSubmit={onSubmit}
//     >
//       {() => (
//         <Form className="auth__form" aria-label="Registration Form">
//           <h2 className="auth__title">Register</h2>
//           {error && <ErrorMessage message={error} className="auth__error" />}
//           <InputField
//             label="Name"
//             type="text"
//             id="name"
//             name="name"
//             ariaRequired={true}
//           />
//           <InputField
//             label="Email"
//             type="email"
//             id="email"
//             name="email"
//             ariaRequired={true}
//           />
//           <PasswordInput
//             label="Password"
//             id="password"
//             name="password"
//             ariaRequired={true}
//           />
//           <PasswordInput
//             label="Confirm Password"
//             id="confirmPassword"
//             name="confirmPassword"
//             ariaRequired={true}
//           />
//           <SelectField
//             label="Role"
//             id="role"
//             name="role"
//             options={[
//               { value: 'employee', label: 'Employee' },
//               { value: 'admin', label: 'Admin' },
//             ]}
//             ariaRequired={true}
//           />
//           <div className="auth__group">
//             <Button type="submit" className="auth__button" disabled={loading}>
//               {loading ? 'Registering...' : 'Register'}
//             </Button>
//           </div>
//           {/* Render children */}
//           {children}
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default RegisterForm;


// src/components/organisms/RegisterForm/RegisterForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
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
  error?: string;
  loading: boolean;
  children?: React.ReactNode;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'), // Removed null from oneOf
  role: Yup.string().required('Role is required'),
});

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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="auth__form" aria-label="Registration Form">
          <h2 className="auth__title">Register</h2>
          {error && <ErrorMessage message={error} className="auth__error" />}

          <InputField
            label="Name"
            type="text"
            id="name"
            name="name"
            ariaRequired
            error={touched.name ? errors.name : undefined}
          />

          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            ariaRequired
            error={touched.email ? errors.email : undefined}
          />

          <PasswordInput
            label="Password"
            id="password"
            name="password"
            ariaRequired
            error={touched.password ? errors.password : undefined}
          />

          <PasswordInput
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            ariaRequired
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          />

          <SelectField
            label="Role"
            id="role"
            name="role"
            options={[
              { value: 'employee', label: 'Employee' },
              { value: 'admin', label: 'Admin' },
            ]}
            ariaRequired
          />

          <div className="auth__group">
            <Button type="submit" className="auth__button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </div>
          {children}
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;