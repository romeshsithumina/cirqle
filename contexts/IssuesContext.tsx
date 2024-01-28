"use client";

import React, {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

// IssuesContext.js
interface IssuesContextProps {
  isIssueUpdated: boolean;
  registerUpdateCallback: (callback: (() => void) | null) => void;
  notifyUpdate: () => void;
}

const IssuesContext = createContext<IssuesContextProps | undefined>(undefined);

export const IssuesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isIssueUpdated, setIssueUpdated] = useState(true);
  const updateCallbacks = useRef<(() => void)[]>([]);

  const registerUpdateCallback = (callback: (() => void) | null) => {
    if (callback) {
      updateCallbacks.current = [...updateCallbacks.current, callback];
    } else {
      updateCallbacks.current = updateCallbacks.current.filter(Boolean);
    }
  };

  const notifyUpdate = () => {
    setIssueUpdated((prev) => !prev); // Toggle isIssueUpdated
    updateCallbacks.current.forEach((callback: any) => callback());
  };

  return (
    <IssuesContext.Provider
      value={{ isIssueUpdated, registerUpdateCallback, notifyUpdate }}
    >
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
