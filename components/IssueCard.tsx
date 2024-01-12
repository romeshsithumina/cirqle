const IssueCard = () => {
  return (
    <div className="h-[90px] border-b-[1px]">
      <div className="flex h-full w-full justify-around">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="">Project name</div>
          <div className="">Author name</div>
        </div>

        <div className="flex h-full items-center">
          <div className="">Tag name</div>
        </div>
      </div>
    </div>
  );
};
export default IssueCard;
