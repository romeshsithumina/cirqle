import ImageDisplay from "@/components/ImageDisplay";
import PriorityTag from "@/components/PriorityTag";
import Tag from "@/components/Tag";

const Page = () => {
  return (
    <div className="left-0 top-0 flex h-screen px-8 py-6">
      <div className="flex flex-col">
        <div className="flex items-center gap-5">
          <Tag name="improvement" />
          <div className="text-lg font-semibold">Drag and Drop Shadow</div>
          <div className="ml-auto opacity-80">
            <PriorityTag type="high" />
          </div>
        </div>

        <div className="mt-7 flex items-center">
          <div className="flex flex-nowrap gap-2 text-[0.87rem]">
            <span className="">Mark Johnson</span>
            <span className="">·</span>
            <span className="text-slate-600">17.01.2024 at 11:00</span>
          </div>
          <div className="ml-10 flex gap-4">
            <Tag name="todo outline" clickable />
            <Tag name="wip" selected="wip" clickable />
            <Tag name="done outline" clickable />
          </div>
        </div>

        <div className="mt-7 ">
          <div className="font-medium">Issue</div>
          <div className="mt-5 text-sm text-slate-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis odit
            quisquam necessitatibus velit commodi architecto nisi, pariatur
            accusantium soluta quae maiores, temporibus voluptate nulla labore
            rem corporis magni voluptates nihil?
          </div>
        </div>
        <div className="mt-7 ">
          <div className="font-medium">Images</div>
          <div className="mt-5 text-sm text-slate-600">
            <ImageDisplay value="/assets/test.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
