import { useState } from "react";
import { PiDotsNineBold } from "react-icons/pi";
import IssueDialog from "../IssueDialog";
import { ProjectSelect } from "../ProjectSelect";
import { Button } from "../ui/button";
import { useProject } from "@/contexts/ProjectContext";

const Navbar = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [projectSelectOpen, setProjectSelectOpen] = useState(false);
  const { selectedProject } = useProject();

  const handleClick = () => {
    setAddDialogOpen(true);
  };

  console.log("Navbar rendered");

  return (
    <>
      <IssueDialog open={addDialogOpen} onClose={setAddDialogOpen} />
      <div className="sticky flex h-[65px] flex-1 items-center justify-between border-b-[1px] bg-white">
        <div className="ml-5 flex cursor-pointer flex-row items-center">
          <PiDotsNineBold
            color="black"
            opacity={0.4}
            size={30}
            onClick={() => setProjectSelectOpen(true)}
          />
          <ProjectSelect
            open={projectSelectOpen}
            setOpen={setProjectSelectOpen}
            onUserSelect={() => {}}
          />
        </div>
        <div className="mr-5">
          <Button
            className="border border-red-primary text-red-primary hover:bg-red-primary hover:text-white"
            disabled={selectedProject === undefined}
            title="Add Issue"
            onClick={handleClick}
          >
            Add Issue
          </Button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
