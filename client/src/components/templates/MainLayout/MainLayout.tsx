// src/components/templates/MainLayout/MainLayout.tsx
import React from 'react';
import Footer from '@components/organisms/Footer/Footer';
import Header from '@components/organisms/Header/Header';
import { SessionTimeout } from '@components/organisms/SessionTimeout';

interface MainLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, toggleTheme }) => {
  // Replace this with your actual logout function
  const handleLogout = () => {
    console.log('Logging out...'); // Your real logout logic here
  };

  return (
    <div className="main-layout">
      <Header toggleTheme={toggleTheme} />
      <main className="main-layout__main">{children}</main>
      <Footer />
      
      {/* Session Timeout - pure UI, no external deps */}
      <SessionTimeout 
        onLogout={handleLogout}
        timeout={30 * 60 * 1000} // 30min
      />
    </div>
  );
};

export default MainLayout;