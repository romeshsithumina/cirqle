import LeftSidebar from "@/components/shared/LeftSidebar";
import Sidebar from "@/components/shared/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <LeftSidebar />
      <Sidebar />
      <div className="mx-auto w-full">{children}</div>
    </main>
  );
};

export default Layout;
