import { useRouter } from "next/navigation";
import Tag from "./Tag";
import UserAvatar from "./UserAvatar";

interface IssueCardProps {
  uuid: string;
  issueName: string;
  authorName?: string;
  authorPicture?: string;
  issueType: string;
  issuePriority?: string;
  issueStatus?: string;
  currentIssue?: string;
}

const IssueCard = ({
  uuid,
  issueName,
  authorName,
  authorPicture,
  issueType,
  issueStatus,
  currentIssue,
}: IssueCardProps) => {
  const router = useRouter();

  return (
    <div
      className="h-[90px] cursor-pointer border-b-[1px]"
      onClick={() => {
        router.push(`/issue/${uuid}`);
      }}
    >
      <div
        className={`flex h-full w-full ${
          currentIssue === uuid && "bg-[#fbf9fa]"
        }`}
      >
        <div className="flex h-full flex-col justify-center pl-6">
          <div
            className={`line-clamp-1 w-64 overflow-hidden text-ellipsis font-medium ${
              currentIssue === uuid && "text-red-primary"
            }`}
          >
            {issueName}
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex-row">
              <Tag name={issueType} />
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-slate-600">
              <UserAvatar imageSrc={authorPicture} className="h-5 w-5" />
              <span className="line-clamp-1 text-ellipsis">{authorName}</span>
            </div>
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
