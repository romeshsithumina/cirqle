import { getIssueById } from "@/lib/actions/getIssueById";
import IssueClient from "./IssueClient";

interface IParams {
  id?: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const issue = await getIssueById(params);

  if (!issue) <div className="">Loading..</div>;

  return <IssueClient issue={issue} />;
};
export default Page;
