import IssueCard from "../IssueCard";
import Navbar from "./Navbar";

const Sidebar = () => {
  return (
    <>
      <div className=" w-[400px] border-r-[1px]">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="max-h-[calc(100vh-67px)] overflow-y-auto">
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
