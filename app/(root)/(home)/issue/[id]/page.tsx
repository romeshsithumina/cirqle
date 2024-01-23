"use client";

import { getIssueById } from "@/lib/actions/getIssueById";
import IssueClient from "./IssueClient";
import { useEffect, useState } from "react";
import { useIssues } from "@/contexts/IssuesContext";

interface IParams {
  id?: string;
}

const Page = ({ params }: { params: IParams }) => {
  const { isIssueUpdated } = useIssues();
  const [issue, setIssue] = useState();

  useEffect(() => {
    const fetchIssues = async () => {
      const res = await getIssueById(params);
      setIssue(res);
    };
    fetchIssues();
  }, [isIssueUpdated, params]);

  if (!issue) return <div className="">Loading..</div>;

  return <IssueClient issue={issue} />;
};
export default Page;
