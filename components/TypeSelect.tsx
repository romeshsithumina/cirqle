import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/utils";
import { SelectLabel } from "@radix-ui/react-select";
import { useState } from "react";

interface TypeSelectProps {
  onTypeChange: (value: string) => void;
}

const TypeSelect = ({ onTypeChange }: TypeSelectProps) => {
  const [value, setValue] = useState("");

  return (
    <Select
      onValueChange={(value) => {
        setValue(capitalizeFirstLetter(value));
        onTypeChange(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Type">Priority: {value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default TypeSelect;
