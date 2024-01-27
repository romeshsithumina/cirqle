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
  currentValue?: "low" | "medium" | "high";
  onTypeChange: (value: "low" | "medium" | "high") => void;
}

const TypeSelect = ({ currentValue, onTypeChange }: TypeSelectProps) => {
  const [value, setValue] = useState(
    currentValue ? capitalizeFirstLetter(currentValue) : undefined
  );

  return (
    <Select
      onValueChange={(value: "low" | "medium" | "high") => {
        setValue(capitalizeFirstLetter(value));
        onTypeChange(value);
      }}
      defaultValue={currentValue}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Priority...">Priority: {value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel className="border-b">Priority</SelectLabel>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default TypeSelect;
