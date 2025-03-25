import React from 'react';
import { Outlet } from 'react-router';

interface MainLayoutProps {
  header?: React.ReactNode;
}

const MainLayout = ({
  header
}: MainLayoutProps) => {
  return (
    <div className="dashboard-layout">
        <header className="dashboard-header">
        {header}
        </header>
        <main className="dashboard-main">
            <Outlet />
        </main>
    </div>
  );
};

export default MainLayout;
