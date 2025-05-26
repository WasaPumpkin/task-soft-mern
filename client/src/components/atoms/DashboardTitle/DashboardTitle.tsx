//atoms/DashboardTitle/DashboardTitle.tsx
import React from 'react';

interface DashboardTitleProps {
  children: React.ReactNode;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ children }) => (
  <h2 className="dashboard__title">{children}</h2>
);

export default DashboardTitle;