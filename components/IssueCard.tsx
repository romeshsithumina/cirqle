import { useRouter } from "next/navigation";
import Tag from "./Tag";

interface IssueCardProps {
  uuid: string;
  issueName: string;
  authorName?: string;
  issueType: string;
  issuePriority?: string;
  issueStatus?: string;
}

const IssueCard = ({
  uuid,
  issueName,
  authorName,
  issueType,
  issuePriority,
  issueStatus,
}: IssueCardProps) => {
  const router = useRouter();

  return (
    <div
      className="h-[90px] cursor-pointer border-b-[1px]"
      onClick={() => {
        router.push(`/issue/${uuid}`);
      }}
    >
      <div className="flex h-full w-full">
        <div className="flex h-full flex-col justify-center pl-6">
          <div className="font-medium">{issueName}</div>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex-row">
              <Tag name={issueType} />
            </div>
            <div className="flex-row text-sm text-slate-600">{authorName}</div>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <div className="pr-6">
            <Tag name={issueStatus!} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IssueCard;
