"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Issue {
  uuid: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  type: "bug" | "feature" | "improvement";
  createdAt: Date;
  author: { name: string };
  project: { title: string };
  assignedTo: { id: number; name: string };
  attachments: [{ id: number; url: string }];
}

interface IssueContextProps {
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  issuesVersion: number;
  incrementIssuesVersion: () => void;
}

const IssueContext = createContext<IssueContextProps | undefined>(undefined);

export const IssueProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issuesVersion, setIssuesVersion] = useState(0);

  const incrementIssuesVersion = () => {
    setIssuesVersion((prevVersion) => prevVersion + 1);
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        setIssues,
        issuesVersion,
        incrementIssuesVersion,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
};

export const useIssueContext = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error("useIssueContext must be used within an IssueProvider");
  }
  return context;
};
