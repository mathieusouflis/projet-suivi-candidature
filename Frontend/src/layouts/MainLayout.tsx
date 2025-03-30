import React from "react";
import { Outlet } from "react-router";

interface MainLayoutProps {
  header?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode; // Add children to accept content passed between the tags
}

const MainLayout = ({ header, aside = null, children }: MainLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col">
      <header className="flex">{header}</header>
      <main className="flex flex-row h-full">
        <aside>{aside ? aside : null}</aside>
        <div className="flex-col flex w-full p-3 mt-5">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
