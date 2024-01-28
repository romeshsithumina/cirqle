"use client";

import { useIssues } from "@/contexts/IssuesContext";
import { useProject } from "@/contexts/ProjectContext";
import { getIssues } from "@/lib/actions/getIssues";
import { useEffect, useState } from "react";
import IssueCard from "../IssueCard";
import Navbar from "./Navbar";

interface Issue {
  uuid: string;
  title: string;
  type: string;
  author: {
    name: string;
  };
  priority: string;
  status: string;
}

const Sidebar = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const { selectedProject } = useProject();
  const { registerUpdateCallback } = useIssues();

  useEffect(() => {
    const fetchIssues = async () => {
      const res = await getIssues(selectedProject?.id);
      if (res) {
        setIssues(res);
      }
    };

    fetchIssues(); // Initial fetch

    const handleIssueUpdate = () => {
      fetchIssues(); // Refetch on update
    };

    registerUpdateCallback(handleIssueUpdate); // Register for updates

    return () => {
      registerUpdateCallback(null); // Unregister on unmount
    };
  }, [selectedProject, registerUpdateCallback]);

  console.log("Sidebar rendered");

  return (
    <>
      <div className=" w-[400px] border-r-[1px]">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="max-h-[calc(100vh-67px)] overflow-y-auto">
          {issues?.map((issue) => (
            <IssueCard
              key={issue.uuid}
              uuid={issue.uuid}
              issueName={issue.title}
              issueType={issue.type}
              issueStatus={issue.status}
              authorName={issue.author.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
