// //src/components/pages/LoginPage/LoginPage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@features/auth/authThunks'; 
import type { AppDispatch, RootState } from '@features/store'; 
import logo from '@img/Logo.png'; 
import LoginForm from '@components/organisms/LoginForm/LoginForm'; 

const LoginPage: React.FC = () => {
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

  const handleSubmit = (values: { email: string; password: string }) => {
    console.log('Submitting:', values); // Debug: Log submitted values
    dispatch(loginUser(values));
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src={logo} alt="Logo" />
      </div>
      <div className="auth-form-container">
        <LoginForm
          onSubmit={handleSubmit}
          error={error || undefined}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LoginPage;
