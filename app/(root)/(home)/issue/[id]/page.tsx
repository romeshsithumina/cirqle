"use client";

import { useIssueContext } from "@/contexts/IssuesContext";
import { useProject } from "@/contexts/ProjectContext";
import { getIssueById } from "@/lib/actions/getIssueById";
import { useEffect, useState } from "react";
import IssueClient from "./IssueClient";
import IssueClientLoading from "./IssueClientLoading";

interface IParams {
  id?: string;
}

const Page = ({ params }: { params: IParams }) => {
  const [issue, setIssue] = useState<any>();
  const { selectedProject, updateSelectedProject } = useProject();
  const { issuesVersion } = useIssueContext();

  useEffect(() => {
    const fetchIssue = async () => {
      const res = await getIssueById(params);
      if (res) {
        setIssue(res);

        if (selectedProject?.id !== res.project.id) {
          updateSelectedProject(res.project);
        }
      }
    };

    fetchIssue();
  }, [issuesVersion, params]);

  if (!issue) return <IssueClientLoading />;

  return <IssueClient issue={issue} />;
};

export default Page;
