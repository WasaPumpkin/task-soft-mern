// // //src/components/pages/RegisterPage/RegisterPage.tsx
// src/components/pages/RegisterPage/RegisterPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@features/auth/authThunks';
import type { AppDispatch, RootState } from '@features/store';
import logo from '@img/Logo.png';
import RegisterForm from '@components/organisms/RegisterForm/RegisterForm';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (values: RegisterFormValues) => {
    // Destructure and exclude confirmPassword
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, ...userData } = values;
    try {
      await dispatch(registerUser(userData)).unwrap();
    } catch (err) {
      // Error is already handled by the thunk
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src={logo} alt="Logo" className="auth-logo" />
      </div>
      <div className="auth-form-container">
        <RegisterForm
          onSubmit={handleSubmit}
          error={typeof error === 'string' ? error : undefined}
          loading={loading}
        >
          <p className="auth__text">
            Already have an account? <Link to="/login">Loginn</Link>
          </p>
        </RegisterForm>
      </div>
    </div>
  );
};

export default RegisterPage;