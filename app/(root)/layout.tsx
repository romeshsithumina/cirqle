import LeftSidebar from "@/components/shared/LeftSidebar";
import Sidebar from "@/components/shared/Sidebar";
import { IssuesProvider } from "@/contexts/IssuesContext";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <IssuesProvider>
        <LeftSidebar />
        <Sidebar />
        <div className="grow">{children}</div>
      </IssuesProvider>
    </main>
  );
};

export default Layout;
