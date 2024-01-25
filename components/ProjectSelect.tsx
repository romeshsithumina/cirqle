"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProject } from "@/contexts/ProjectContext";
import { getProjects } from "@/lib/actions/getProjects";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ProjectDialog from "./ProjectDialog";
import { useRouter } from "next/navigation";

interface ProjectSelectProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onUserSelect: (value: number) => void;
}

type Project = {
  id: number;
  name: string;
};

export function ProjectSelect({
  open,
  setOpen,
  onUserSelect,
}: ProjectSelectProps) {
  const { selectedProject } = useProject();
  const [value, setValue] = useState("");
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>();
  const [projectCreated, setProjectCreated] = useState(false);
  const { updateSelectedProject } = useProject();
  const router = useRouter();

  console.log("selected project: ", selectedProject);

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getProjects();
      setProjects(allProjects);
      if (selectedProject) setValue(selectedProject.name);
    };
    fetchProjects();
  }, [projectCreated, selectedProject]);

  return (
    <>
      <ProjectDialog
        projectCreated={projectCreated}
        setProjectCreated={setProjectCreated}
        open={projectDialogOpen}
        onClose={setProjectDialogOpen}
      />
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className="max-w-[400px] justify-between text-ellipsis text-lg font-medium"
          >
            {value ? capitalizeFirstLetter(value) : "Project..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="PopoverContent w-[170px] bg-white p-0">
          <Command>
            <CommandInput placeholder="Search projects..." className="h-9" />
            <CommandGroup>
              <Button
                className="w-full border border-slate-300 bg-white"
                onClick={() => {
                  setProjectDialogOpen(true);
                  setOpen(false);
                }}
              >
                Create Project
              </Button>
            </CommandGroup>

            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup className="h-[130px] overflow-auto">
              <span className="flex justify-center border-t-[1px] pt-1 text-sm text-slate-500">
                Projects
              </span>
              {projects?.map((project) => (
                <CommandItem
                  key={project.id}
                  value={project.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onUserSelect(project.id);
                    updateSelectedProject(project);

                    if (currentValue !== value.toLocaleLowerCase()) {
                      router.push("/");
                    }
                  }}
                  className="hover:text-red-primary"
                >
                  {project.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value.toLocaleLowerCase() ===
                        project.name.toLocaleLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
