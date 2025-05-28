// //src/components/pages/RegisterPage/RegisterPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@features/auth/authThunks'; 
import type { AppDispatch, RootState } from '@features/store'; 
import logo from '@img/Logo.png'; 
import RegisterForm from '@components/organisms/RegisterForm/RegisterForm'; 

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

  const handleSubmit = (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }) => {
    dispatch(registerUser(values));
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src={logo} alt="Logo" />
      </div>
      <div className="auth-form-container">
        <RegisterForm
          onSubmit={handleSubmit}
          error={error || undefined}
          loading={loading}
        >
          {/* Pass the <p> element as children */}
          <p className="auth__text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </RegisterForm>
      </div>
    </div>
  );
};

export default RegisterPage;