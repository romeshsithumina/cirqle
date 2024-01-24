"use client";

import { getIssueById } from "@/lib/actions/getIssueById";
import IssueClient from "./IssueClient";
import { useEffect, useState } from "react";
import { useIssues } from "@/contexts/IssuesContext";
import { useProject } from "@/contexts/ProjectContext";

interface IParams {
  id?: string;
}

const Page = ({ params }: { params: IParams }) => {
  const [issue, setIssue] = useState();
  const { isIssueUpdated } = useIssues();
  const { updateSelectedProject } = useProject();

  useEffect(() => {
    const fetchIssues = async () => {
      const res = await getIssueById(params);
      setIssue(res);
      updateSelectedProject(res.project);
    };
    fetchIssues();
  }, [isIssueUpdated, params]);

  if (!issue) return <div className="">Loading..</div>;

  return <IssueClient issue={issue} />;
};
export default Page;
