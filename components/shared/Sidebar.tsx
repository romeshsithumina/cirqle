"use client";

import { useIssueContext } from "@/contexts/IssuesContext";
import { useProject } from "@/contexts/ProjectContext";
import { getIssues } from "@/lib/actions/getIssues";
import { useEffect } from "react";
import IssueCard from "../IssueCard";
import EmptyState from "./EmptyState";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { selectedProject } = useProject();
  const { issues, setIssues, issuesVersion } = useIssueContext();
  const currentIssueId = usePathname().split("/").pop();

  console.log("Selected project is!: ", selectedProject);

  useEffect(() => {
    const fetchIssues = async () => {
      const res: any = await getIssues(selectedProject?.id);
      if (res) {
        setIssues(res);
      }
    };

    fetchIssues();
  }, [issuesVersion, selectedProject?.id]);

  console.log("Sidebar rendered");

  return (
    <>
      <div className="w-[400px] border-r-[1px]">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="max-h-[calc(100vh-67px)] overflow-y-auto">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <IssueCard
                key={issue.uuid}
                uuid={issue.uuid}
                issueName={issue.title}
                issueType={issue.type}
                issueStatus={issue.status}
                authorName={issue.author.name}
                authorPicture={issue.author.picture}
                currentIssue={currentIssueId}
              />
            ))
          ) : (
            <EmptyState
              subtitle={
                selectedProject
                  ? "Looks like no issues in this project"
                  : "Select or Create a project"
              }
              className="mt-28"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
