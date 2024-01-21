"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

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
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { getProjects } from "@/lib/actions/getProjects";
import { useProject } from "@/contexts/ProjectContext";

interface ProjectSelectProps {
  onUserSelect: (value: number) => void;
}

type Project = {
  id: number;
  name: string;
};

export function ProjectSelect({ onUserSelect }: ProjectSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [projects, setProjects] = React.useState<Project[]>();
  const { updateSelectedProject } = useProject();

  React.useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getProjects();
      setProjects(allProjects);
    };
    fetchProjects();
  }, []);

  return (
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
      <PopoverContent className="w-[170px] bg-white p-0">
        <Command>
          <CommandInput placeholder="Search projects..." className="h-9" />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandGroup className="h-[130px] overflow-auto">
            {projects?.map((project) => (
              <CommandItem
                key={project.id}
                value={project.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onUserSelect(project.id);
                  updateSelectedProject(project);
                }}
              >
                {project.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === project.name ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
