"use client";

import { useIssueContext } from "@/contexts/IssuesContext";
import { useProject } from "@/contexts/ProjectContext";
import { getIssues } from "@/lib/actions/getIssues";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IssueCard from "../IssueCard";
import IssueCardLoading from "../IssueCardLoading";
import EmptyState from "./EmptyState";
import Navbar from "./Navbar";

const Sidebar = () => {
  const { selectedProject } = useProject();
  const { issues, setIssues, issuesVersion } = useIssueContext();
  const [isFetching, setIsFetching] = useState(false);
  const currentIssueId = usePathname().split("/").pop();
  const isInitialRender = useRef(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        if (isInitialRender.current) {
          setIsFetching(true); // Only set to true for initial render
        }
        const res: any = await getIssues(selectedProject?.id);
        if (res) {
          setIssues(res);
        }
      } finally {
        setIsFetching(false);
        isInitialRender.current = false; // Mark as no longer initial render
      }
    };

    fetchIssues();
  }, [issuesVersion, selectedProject?.id]);

  return (
    <div className="w-[400px] border-r-[1px]">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="max-h-[calc(100vh-67px)] overflow-y-auto">
        {isFetching &&
          Array.from({ length: 7 }).map((_, index) => (
            <IssueCardLoading key={index} />
          ))}
        {!isFetching && issues
          ? issues.map((issue) => (
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
          : null}
        {!isFetching && issues.length === 0 && (
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
  );
};

export default Sidebar;
