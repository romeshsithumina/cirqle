import Tag from "@/components/Tag";

const Page = () => {
  return (
    <div className="left-0 top-0 flex h-screen p-6">
      <div className="flex flex-col">
        <div className="flex">
          <Tag />
          <div className="ml-5">Project Name</div>
        </div>

        <div className="mt-7 flex">
          <div className="">Author name - Date</div>
          <div className="ml-7 flex gap-4">
            <Tag />
            <Tag />
            <Tag />
          </div>
        </div>

        <div className="mt-7 ">
          <div className="font-semibold">Issue</div>
          <div className="mt-5">Describe the issue</div>
        </div>
        <div className="mt-7 ">
          <div className="font-semibold">Images</div>
          <div className="mt-5">images...</div>
        </div>
      </div>
    </div>
  );
};
export default Page;
