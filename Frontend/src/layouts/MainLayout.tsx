import React from 'react';
import { Outlet } from 'react-router';

interface MainLayoutProps {
  header?: React.ReactNode; 
  aside?: React.ReactNode;
  children?: React.ReactNode; // Add children to accept content passed between the tags
}

const MainLayout = ({ header, aside = null, children }: MainLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col">
      <header className="flex">
        {header}²
      </header>
      <main className="flex flex-row h-full">
        <aside>
          {aside ? aside : null}
        </aside>
        <div className="flex-col flex min-w-screen p-3 mt-5">
          {children || <Outlet />}  {/* render children or default Outlet for routing */}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

