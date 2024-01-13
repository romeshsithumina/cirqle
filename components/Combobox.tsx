"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
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

const users = [
  { value: "John", label: "John" },
  { value: "Jane", label: "Jane" },
  { value: "Alice", label: "Alice" },
  { value: "Bob", label: "Bob" },
  { value: "Charlie", label: "Charlie" },
  { value: "Diana", label: "Diana" },
  { value: "Eva", label: "Eva" },
  { value: "Frank", label: "Frank" },
  { value: "Grace", label: "Grace" },
  { value: "Harry", label: "Harry" },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-full justify-between"
        >
          {value
            ? users.find((user) => user.value === value)?.label
            : "Assigned to..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] bg-white p-0">
        <Command>
          <CommandInput placeholder="Search developers..." className="h-9" />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup className="h-[130px] overflow-auto">
            {users.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
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
