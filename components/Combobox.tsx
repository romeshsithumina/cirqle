"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { capitalizeFirstLetter, cn } from "@/lib/utils";
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
import { getDevelopers } from "@/lib/actions/getUsers";

interface ComboboxProps {
  currentValue: number;
  onUserSelect: (value: number) => void;
}

interface User {
  id: number;
  clerkID: string;
  name: string;
  email: string;
  password: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function Combobox({
  currentValue: userId,
  onUserSelect,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const [value, setValue] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const developers = await getDevelopers();
        setUsers(developers);

        const selectedUser = developers.find(
          (user: User) => user.id === userId
        );
        if (selectedUser) {
          setValue(selectedUser.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
            ? `Assigned to: ${capitalizeFirstLetter(value)}`
            : "Assigned to..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent defaultValue={value} className="w-[300px] bg-white p-0">
        <Command>
          <CommandInput placeholder="Search developers..." className="h-9" />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup className="h-[130px] overflow-auto">
            {users.map((user) => (
              <CommandItem
                key={user.id}
                value={user.name}
                onSelect={(currentValue) => {
                  if (currentValue !== value) {
                    setOpen(false);
                    onUserSelect(user.id);
                  }
                }}
              >
                {user.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === user.name ? "opacity-100" : "opacity-0"
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
