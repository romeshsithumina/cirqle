"use client";

import ImageDisplay from "@/components/ImageDisplay";
import { IssueDeleteDialog } from "@/components/IssueDeleteDialog";
import IssueDialog from "@/components/IssueDialog";
import PriorityTag from "@/components/PriorityTag";
import Tag from "@/components/Tag";
import { useIssueContext } from "@/contexts/IssuesContext";
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
    priority: "low" | "medium" | "high";
    type: "bug" | "feature" | "improvement";
    createdAt: Date;
    author: { name: string };
    project: { title: string };
    assignedTo: { id: number; name: string };
    attachments: [{ id: number; url: string }];
  };
}

const IssueClient: React.FC<IssueClientProps> = ({ issue }) => {
  const [selectedTag, setSelectedTag] = useState<string>(issue.status);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tagDisabled, setTagDisabled] = useState(false);
  const { incrementIssuesVersion } = useIssueContext();
  const pathname = usePathname();

  const handleTagSelect = async (value: string) => {
    setTagDisabled(true);
    const updatedIssue = { ...issue, status: value, pathname };
    const issueId = issue.uuid;
    try {
      await axios.post(`/api/issue/${issueId}`, updatedIssue).then((res) => {
        setSelectedTag(res.data.status);
        setTagDisabled(false);
        incrementIssuesVersion();
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
                disabled={tagDisabled}
              />
              <Tag
                name="wip"
                selected={selectedTag}
                onTagSelect={handleTagSelect}
                clickable
                disabled={tagDisabled}
              />
              <Tag
                name="done"
                selected={selectedTag}
                onTagSelect={handleTagSelect}
                clickable
                disabled={tagDisabled}
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
              <ImageDisplay value={issue.attachments[0]?.url} />
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
