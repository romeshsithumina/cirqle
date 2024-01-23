"use client";

import ImageDisplay from "@/components/ImageDisplay";
import { IssueDeleteDialog } from "@/components/IssueDeleteDialog";
import IssueDialog from "@/components/IssueDialog";
import PriorityTag from "@/components/PriorityTag";
import Tag from "@/components/Tag";
import { useIssues } from "@/contexts/IssuesContext";
import { convertDateFormat } from "@/lib/utils";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface IssueClientProps {
  issue: {
    uuid: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    type: string;
    createdAt: Date;
    author: { name: string };
    project: { title: string };
    assignedTo: { id: number; name: string };
  };
}

const IssueClient: React.FC<IssueClientProps> = ({ issue }) => {
  const [selectedTag, setSelectedTag] = useState<string>(issue.status);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { updateIssue } = useIssues();
  const pathname = usePathname();

  const handleTagSelect = async (value: string) => {
    const updatedIssue = { ...issue, status: value, pathname };
    try {
      await axios.post(`/api/issue/${issue.uuid}`, updatedIssue).then((res) => {
        setSelectedTag(res.data.status);
        updateIssue();
      });
    } catch (error) {
      console.log("Error is: " + error);
    }
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  if (!issue) return <div>Loading...</div>;

  return (
    <>
      <IssueDialog
        open={editDialogOpen}
        issue={issue}
        onClose={setEditDialogOpen}
      />
      <IssueDeleteDialog
        open={deleteDialogOpen}
        id={issue.uuid}
        onClose={setDeleteDialogOpen}
      />
      <div className="left-0 top-0 h-screen px-8 py-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-5">
            <Tag name={issue.type} />
            <div className="text-lg font-semibold">{issue.title}</div>
            <div className="ml-auto opacity-80">
              <PriorityTag type={issue.priority} />
            </div>
          </div>

          <div className="mt-4 flex items-center border-b pb-3">
            <div className="flex flex-nowrap gap-2 text-[0.87rem]">
              <span className="">{issue.author.name}</span>
              <span className="">·</span>
              <span className="text-slate-600">
                {convertDateFormat(issue.createdAt.toISOString())}
              </span>
            </div>
            <div className="ml-10 flex gap-4">
              <Tag
                name="todo"
                selected={selectedTag}
                onTagSelect={handleTagSelect}
                clickable
              />
              <Tag
                name="wip"
                selected={selectedTag}
                onTagSelect={handleTagSelect}
                clickable
              />
              <Tag
                name="done"
                selected={selectedTag}
                onTagSelect={handleTagSelect}
                clickable
              />
            </div>
            <div className="ml-auto flex gap-4">
              <MdEdit
                className="cursor-pointer text-slate-500 hover:text-red-primary"
                onClick={handleEditClick}
              />
              <MdDelete
                className="cursor-pointer text-slate-500 hover:text-red-primary"
                onClick={handleDeleteClick}
              />
            </div>
          </div>

          <div className="mt-7 max-w-[1000px]">
            <div className="font-medium">Issue</div>
            <div className="mt-5 text-sm text-slate-600">
              {issue.description}
            </div>
          </div>
          <div className="mt-7">
            <div className="font-medium">Images</div>
            <div className="mt-5 text-sm text-slate-600">
              <ImageDisplay value="/assets/test.png" />
            </div>
          </div>
          <div className="mt-7">
            <div className="font-medium">Assigned to: </div>
            <div className="mt-5 text-sm text-slate-600">
              {issue.assignedTo.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IssueClient;
