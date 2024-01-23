"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIssues } from "@/contexts/IssuesContext";
import { useProject } from "@/contexts/ProjectContext";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Combobox } from "./Combobox";
import ImageUpload from "./ImageUpload";
import Tag from "./Tag";
import TypeSelect from "./TypeSelect";
import { usePathname } from "next/navigation";

type FormFields = {
  title: string;
  description: string;
  priority: string;
  type: string;
  assignedTo: number;
  image: string;
};

interface Issue {
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
}

interface IssueDialogProps {
  open: boolean;
  onClose: (value: boolean) => void;
  issue?: Issue; // Optional issue prop for editing
}

const IssueDialog = ({ open, issue, onClose }: IssueDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
      priority: issue?.priority || "",
      type: issue?.type || "",
      assignedTo: issue?.assignedTo.id || undefined,
    },
  });
  const [selectedTag, setSelectedTag] = useState(getValues("type"));
  const { updateIssue } = useIssues();
  const { selectedProject } = useProject();
  const pathname = usePathname();

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    console.log(data);
    // Handle form submission here

    if (issue) {
      await axios
        .patch(`/api/issue/${issue.uuid}`, { ...data, pathname })
        .catch((e) => console.log(e))
        .then(() => {
          updateIssue();
          onClose(false);
        });
    } else {
      await axios
        .post("/api/issue", { ...data, projectId: selectedProject?.id })
        .catch((e) => console.log(e))
        .then(() => {
          updateIssue();
          onClose(false);
          reset();
          setSelectedTag(getValues("type"));
        });
    }
  };

  // Callback function to update the form value when selection changes
  const handleTypeChange = (value: string) => {
    setValue("priority", value);
  };
  const handleUserSelect = (value: number) => {
    setValue("assignedTo", value);
  };
  const handleTagSelect = (value: string) => {
    setValue("type", value);
    setSelectedTag(value);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[800px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{issue ? "Edit Issue" : "Add Issue"}</DialogTitle>
            <DialogDescription>
              {issue
                ? "Update issue details here. Click save when done."
                : "Enter issue details here. Click save when done."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="w-full grid-cols-1 items-center gap-4">
              <TextField
                {...register("title", { required: true })}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                className="w-full"
              />
            </div>
            <div className="col-start-1 grid-cols-1 items-center gap-4">
              <TextField
                {...register("description")}
                id="outlined-basic"
                label="Description"
                variant="outlined"
                className="w-full"
                multiline
                rows={4}
              />
            </div>
            <div className="col-start-2 row-span-3 row-start-1">
              <ImageUpload />
            </div>
            <div className="col-start-2 row-start-4 w-full">
              <TypeSelect
                currentValue={getValues("priority")}
                onTypeChange={handleTypeChange}
              />
            </div>
            <div className="col-start-1 row-start-3 mt-5 flex items-center justify-center px-5">
              <InputLabel className="w-[80px]">Type</InputLabel>
              <div className="flex w-full gap-4">
                <div className="flex w-full  justify-around">
                  <Tag
                    name="bug"
                    selected={selectedTag}
                    onTagSelect={handleTagSelect}
                    clickable
                  />
                  <Tag
                    name="feature"
                    selected={selectedTag}
                    onTagSelect={handleTagSelect}
                    clickable
                  />
                  <Tag
                    name="improvement"
                    selected={selectedTag}
                    onTagSelect={handleTagSelect}
                    clickable
                  />
                </div>
              </div>
            </div>
            <div className="col-start-1 row-start-4 w-full">
              <Combobox
                currentValue={getValues("assignedTo")}
                onUserSelect={handleUserSelect}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isSubmitting}
              className="bg-red-primary text-white"
              type="submit"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default IssueDialog;
