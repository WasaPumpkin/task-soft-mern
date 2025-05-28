// src/App.tsx
// src/App.tsx
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Login from './components/pages/LoginPage/LoginPage';
import Register from './components/pages/RegisterPage/RegisterPage';
import MainLayout from './components/templates/MainLayout/MainLayout'; // Use MainLayout instead of Layout

// Import your CSS files
import './styles/main.css';
import './styles/themes/dark.css';
import './styles/themes/light.css';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light'; // Default to light theme
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save to localStorage
      return newTheme;
    });
  };

  return (
    <Router>
      <div className="app" data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout toggleTheme={toggleTheme}>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
