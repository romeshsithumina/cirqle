import { PiDotsNineBold } from "react-icons/pi";
import IssueDialog from "../IssueDialog";
import { ProjectSelect } from "../ProjectSelect";

const Navbar = () => {
  return (
    <div className="sticky flex h-[65px] flex-1 items-center justify-between border-b-[1px] bg-white">
      <div className="ml-5 flex flex-row items-center">
        <PiDotsNineBold color="black" opacity={0.4} size={30} />
        <ProjectSelect onUserSelect={() => {}} />
      </div>
      <div className="mr-5">
        <IssueDialog />
      </div>
    </div>
  );
};
export default Navbar;
