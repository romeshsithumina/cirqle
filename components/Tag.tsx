"use client";

import { capitalizeFirstLetter } from "@/lib/utils";

interface TagProps {
  name: string;
  clickable?: boolean;
  selected?: string;
  onTagSelect?: (value: string) => void;
}

type TagStyles = {
  [key: string]: string;
};

type SelectedStyles = {
  [key: string]: string;
};

const Tag = ({ name, clickable, selected, onTagSelect }: TagProps) => {
  const tagStyles: TagStyles = {
    bug: "border-none bg-red-light text-red-strong",
    improvement: "border-none bg-green-light text-green-strong",
    feature: "border-none bg-blue-light text-blue-strong",
    wip: "border-none bg-blue-strong text-white",
    "wip outline": "border-blue-strong border text-blue-strong",
    done: "border-none bg-green-strong text-white",
    "done outline": "border-green-strong border text-green-strong",
    todo: "border-none bg-ash-strong text-white",
    "todo outline": "border-ash-strong border text-ash-strong",
    high: "border-none bg-red-light text-red-strong",
    low: "border-none bg-green-light text-green-strong",
    medium: "border-none bg-blue-light text-blue-strong",
  };

  const selectedStyles: SelectedStyles = {
    bug: "bg-red-strong text-white",
    improvement: "bg-green-strong text-white",
    feature: "bg-blue-strong text-white",
  };

  const handleClick = () => {
    onTagSelect?.(name);
  };

  const getClassName = () => {
    const baseStyle = "rounded-lg px-2 py-1 text-[12px] font-semibold";
    const customStyle = clickable ? "cursor-pointer" : "";
    const tagStyle = tagStyles[name.toLowerCase()] || "";
    const selectedStyle = selected === name ? selectedStyles[name] || "" : "";

    return `${baseStyle} ${customStyle} ${tagStyle} ${selectedStyle}`;
  };

  const displayText =
    name &&
    (name.includes("wip") || name.includes("done") || name.includes("todo")
      ? name.toUpperCase().split(" ")[0]
      : capitalizeFirstLetter(name).split(" ")[0]);

  return (
    <div>
      <div className={getClassName()} onClick={handleClick}>
        {displayText}
      </div>
    </div>
  );
};

export default Tag;
