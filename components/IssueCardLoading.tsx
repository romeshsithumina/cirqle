import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueCardLoading = () => {
  return (
    <div className="h-[90px] border-b-[1px]">
      <div className="flex h-full w-full">
        <div className="flex h-full flex-col justify-center pl-6">
          <div className="flex w-64 font-medium">
            {/* issue title */}
            <Skeleton containerClassName="w-64" />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex flex-row">
              {/* issueType */}
              <Skeleton height={20} containerClassName="w-16" />
            </div>
            <div className="flex flex-row items-center gap-2 text-sm text-slate-600">
              {/* author avatar */}
              <Skeleton
                className="flex h-5 w-5 items-center"
                containerClassName="w-5 h-5"
                borderRadius={50}
              />

              <span className="line-clamp-1 flex text-ellipsis">
                {/* author name */}
                <Skeleton containerClassName="w-32" />
              </span>
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <div className="flex pr-6">
            {/* issue status */}
            <Skeleton height={20} containerClassName="w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IssueCardLoading;
