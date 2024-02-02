import Tag from "@/components/Tag";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueClientLoading: React.FC = () => {
  return (
    <>
      <div className="left-0 top-0 h-screen max-w-[calc(100vw-480px)] px-8  py-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-5">
            <Skeleton height={20} containerClassName="w-16" />

            <div className="flex text-lg font-semibold">
              <Skeleton height={20} containerClassName="w-96" />
            </div>
            <div className="ml-auto flex opacity-80">
              <Skeleton height={30} containerClassName="w-20" />
            </div>
          </div>

          <div className="mt-4 flex items-center border-b pb-3">
            <div className="flex flex-nowrap gap-2 text-[0.87rem]">
              <span className="flex items-center gap-2">
                <Skeleton
                  className="flex h-5 w-5 items-center"
                  containerClassName="w-5 h-5"
                  borderRadius={50}
                />

                <Skeleton containerClassName="w-36" />
              </span>
              <span className="">·</span>
              <span className="flex text-slate-600">
                <Skeleton containerClassName="w-32" />
              </span>
            </div>
            <div className="ml-10 flex gap-4">
              <Tag name="todo" />
              <Tag name="wip" />
              <Tag name="done" />
            </div>
            <div className="ml-auto flex gap-4">
              <MdEdit className=" pointer-events-none cursor-not-allowed text-slate-500 hover:text-red-primary" />
              <MdDelete
                className=" pointer-events-none cursor-not-allowed
                  text-slate-500 hover:text-red-primary"
              />
            </div>
          </div>

          <div className="mt-7">
            <div className="font-medium">Issue</div>
            <div className="mt-5 text-sm text-slate-600">
              <Skeleton count={2} />
            </div>
          </div>
          <div className="mt-7">
            <div className="font-medium">Images</div>
            <div className="mt-5 text-sm text-slate-600">
              <Skeleton height={230} width={380} />
            </div>
          </div>
          <div className="mt-7">
            <div className="font-medium">Assigned to: </div>
            <div className="mt-5 flex items-center gap-3 text-sm text-slate-600">
              <Skeleton
                className="flex h-7 w-7 items-center"
                containerClassName="w-7 h-7"
                borderRadius={50}
              />

              <Skeleton containerClassName="w-36" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IssueClientLoading;
