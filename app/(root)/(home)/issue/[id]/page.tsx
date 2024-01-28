"use client";

import { useIssues } from "@/contexts/IssuesContext";
import { useProject } from "@/contexts/ProjectContext";
import { getIssueById } from "@/lib/actions/getIssueById";
import { useEffect, useMemo, useState } from "react";
import IssueClient from "./IssueClient";

interface IParams {
  id?: string;
}

const Page = ({ params }: { params: IParams }) => {
  const [issue, setIssue] = useState();
  const { selectedProject, updateSelectedProject } = useProject();
  const { registerUpdateCallback } = useIssues(); // Access context functions

  const fetchIssue = useMemo(() => {
    return async () => {
      const res = await getIssueById(params);
      if (res) {
        setIssue(res);

        if (selectedProject?.id !== res.project.id) {
          updateSelectedProject(res.project);
        }
      }
    };
  }, []);

  useEffect(() => {
    fetchIssue(); // Initial fetch

    const handleIssueUpdate = () => {
      fetchIssue(); // Refetch when notified
    };
    registerUpdateCallback(handleIssueUpdate); // Register for updates
    return () => {
      registerUpdateCallback(null); // Unregister the callback
    };
  }, [fetchIssue, registerUpdateCallback]);

  if (!issue) return <div className="">Loading..</div>;

  return <IssueClient issue={issue} />;
};

export default Page;
