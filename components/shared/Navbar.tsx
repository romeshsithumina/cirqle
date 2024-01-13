import IssueDialog from "../IssueDialog";

const Navbar = () => {
  return (
    <div className="sticky flex h-[65px] flex-1 items-center justify-between border-b-[1px] bg-white">
      <div className="ml-10">Name</div>
      <div className="mr-10">
        <IssueDialog />
      </div>
    </div>
  );
};
export default Navbar;
