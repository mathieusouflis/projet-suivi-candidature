import React from 'react';
import { Outlet } from 'react-router';

interface MainLayoutProps {
  header?: React.ReactNode;
}

const MainLayout = ({
  header
}: MainLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col">
        <header className="flex">
        {header}
        </header>
        <main className="flex h-full">
            <Outlet />
        </main>
    </div>
  );
};

export default MainLayout;
