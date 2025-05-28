// src/components/organisms/Header/Header.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@features/auth/authSlice'; 
import { RootState } from '@features/store'; 
import logo from '@img/Logo.png'; 
import Button from '@components/atoms/Button/Button'; 

interface HeaderProps {
  toggleTheme: () => void; // Define the prop type
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <Link to="/" className="header__logo-link">
            <img src={logo} alt="Company Logo" className="header__logo" />
            <h1 className="header__title">infoEMPLEADOS</h1>
          </Link>
        </div>
        <nav className="header__nav">
          {userInfo ? (
            <>
              <span className="header__user">
                Hello, {userInfo.name} (
                {userInfo.role === 'admin' ? 'Admin' : 'Employee'})
              </span>
              <Button
                onClick={handleLogout}
                className="header__logout-btn"
                ariaLabel="Logout"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__link">
                Login
              </Link>
              <Link to="/register" className="header__link">
                Register
              </Link>
            </>
          )}
          {/* Add Theme Toggle Button */}
          <Button
            onClick={toggleTheme}
            className="header__theme-toggle"
            ariaLabel="Toggle Theme"
          >
            Toggle Theme
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header; // Ensure default export