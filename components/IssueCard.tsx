import Tag from "./Tag";

const IssueCard = () => {
  return (
    <div className="h-[90px] border-b-[1px]">
      <div className="flex h-full w-full">
        <div className="flex h-full flex-col items-center justify-center pl-6">
          <div className="">Project name</div>
          <div className="">Author name</div>
        </div>

        <div className="ml-auto flex items-center">
          <div className="pr-6">
            <Tag />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IssueCard;
