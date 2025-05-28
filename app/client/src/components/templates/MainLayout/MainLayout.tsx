// src/components/templates/MainLayout/MainLayout.tsx
import React from 'react';
import Footer from '@components/organisms/Footer/Footer'; // Use the alias
import Header from '@components/organisms/Header/Header'; // Use the alias

interface MainLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void; // Add toggleTheme prop
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, toggleTheme }) => {
  return (
    <div className="main-layout">
      <Header toggleTheme={toggleTheme} />
      <main className="main-layout__main">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
