import LeftSidebar from "@/components/shared/LeftSidebar";
import Sidebar from "@/components/shared/Sidebar";
import { IssueProvider } from "@/contexts/IssuesContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <ProjectProvider>
        <IssueProvider>
          <LeftSidebar />
          <Sidebar />
          <div className="grow">{children}</div>
        </IssueProvider>
      </ProjectProvider>
    </main>
  );
};

export default Layout;
