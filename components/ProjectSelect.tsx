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

interface ProjectSelectProps {
  onUserSelect: (value: number) => void;
}

const projects = [
  {
    id: 1,
    name: "Project 1",
  },
  {
    id: 2,
    name: "Project 2",
  },
  {
    id: 3,
    name: "Doostr",
  },
  {
    id: 4,
    name: "Project ktisofjdsfjod",
  },
];

export function ProjectSelect({ onUserSelect }: ProjectSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                value={project.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onUserSelect(project.id);
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
