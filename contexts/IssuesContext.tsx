"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface IssuesContextProps {
  isIssueUpdated: boolean;
  updateIssue: () => void;
}

const IssuesContext = createContext<IssuesContextProps | undefined>(undefined);

export const IssuesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isIssueUpdated, setIssueUpdated] = useState(false);

  const updateIssue = () => {
    setIssueUpdated(!isIssueUpdated);
  };

  return (
    <IssuesContext.Provider value={{ isIssueUpdated, updateIssue }}>
      {children}
    </IssuesContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssuesContext);
  if (!context) {
    throw new Error("useIssues must be used within an IssuesProvider");
  }
  return context;
};
