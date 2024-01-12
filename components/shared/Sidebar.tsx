import IssueCard from "../IssueCard";
import Navbar from "./Navbar";

const Sidebar = () => {
  return (
    <>
      <div className="flex w-[400px] flex-col border-r-[1px]">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="max-h-[calc(100vh-67px)] flex-1 overflow-y-auto">
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
          <IssueCard />
        </div>
      </div>
    </>
  );
};
export default Sidebar;
