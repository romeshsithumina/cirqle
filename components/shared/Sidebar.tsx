"use client";

import { getIssues } from "@/lib/actions/getIssues";
import { useState, useEffect } from "react";
import IssueCard from "../IssueCard";
import Navbar from "./Navbar";

interface Issue {
  id: number;
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

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await getIssues();
        if (res) {
          setIssues(res);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIssues();
  }, []);

  return (
    <>
      <div className=" w-[400px] border-r-[1px]">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="max-h-[calc(100vh-67px)] overflow-y-auto">
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
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
