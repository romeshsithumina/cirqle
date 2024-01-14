"use client";

import { capitalizeFirstLetter } from "@/lib/utils";

interface TagProps {
  name: string;
  clickable?: boolean;
  selected: string;
  onTagSelect?: (value: string) => void;
}

const Tag = ({ name, clickable, selected, onTagSelect }: TagProps) => {
  const getClassname = () => {
    switch (name) {
      case "bug":
        return "bg-red-light text-red-strong";
      case "improvement":
        return "bg-green-light text-green-strong";
      case "feature":
        return "bg-blue-light text-blue-strong";
      case "wip":
        return "bg-blue-strong text-white";
      case "done":
        return "bg-green-strong text-white";
      case "todo":
        return "bg-ash-strong text-white";
      case "high":
        return "bg-red-light text-red-strong";
      case "low":
        return "bg-green-light text-green-strong";
      case "medium":
        return "bg-blue-light text-blue-strong";
    }
  };

  const getSelectedClassname = () => {
    switch (selected) {
      case "bug":
        return "bg-red-strong text-white";
      case "improvement":
        return "bg-green-strong text-white";
      case "feature":
        return "bg-blue-strong text-white";
    }
  };

  const handleClick = () => {
    onTagSelect?.(name);
  };

  return (
    <div>
      <div
        className={`rounded-lg border-none px-2 py-1 text-[12px] font-semibold ${
          clickable ? "cursor-pointer" : ""
        }
        ${getClassname()} 
        ${name === selected ? getSelectedClassname() : ""}
        `}
        onClick={handleClick}
      >
        {name ? capitalizeFirstLetter(name) : ""}
      </div>
    </div>
  );
};
export default Tag;
