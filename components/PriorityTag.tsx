import { capitalizeFirstLetter } from "@/lib/utils";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";

type PriorityTagStyles = {
  [key: string]: string;
};

const PriorityTag = ({ type }: { type: string }) => {
  const priorityTagStyles: PriorityTagStyles = {
    high: "border-red-primary bg-red-primary",
    medium: "border-[#f1b500] bg-[#f1b500]",
    low: "border-green-strong bg-green-strong",
  };

  return (
    <div
      className={`flex items-center rounded-3xl border-[3px] p-0 ${priorityTagStyles[type]}`}
    >
      <div className="w-fit rounded-3xl bg-slate-100 p-1">
        {type === "high" && <FcHighPriority size={20} />}
        {type === "medium" && <FcMediumPriority size={20} />}
        {type === "low" && <FcLowPriority size={20} />}
      </div>
      <div className="flex px-3 font-semibold text-white">
        {capitalizeFirstLetter(type)}
      </div>
    </div>
  );
};
export default PriorityTag;
