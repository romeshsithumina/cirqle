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
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Combobox } from "./Combobox";
import ImageUpload from "./ImageUpload";
import Tag from "./Tag";
import TypeSelect from "./TypeSelect";

type FormFields = {
  title: string;
  description: string;
  priority: string;
  type: string;
  assignedTo: number;
  imageSrc: string;
};

interface Issue {
  uuid: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  createdAt: Date;
  attachments?: [{ id: number; url: string }];
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
      imageSrc: issue?.attachments?.[0]?.url || "",
    },
  });
  const [selectedTag, setSelectedTag] = useState(getValues("type"));
  const { updateIssue } = useIssues();
  const { selectedProject } = useProject();
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    console.log("submitted data are\n", data);
    // Handle form submission here

    if (issue) {
      // issue update
      const issueId = issue.uuid;
      await axios
        .patch(`/api/issue/${issueId}`, { ...data, pathname })
        .catch((e) => console.log(e))
        .then(() => {
          updateIssue();
          onClose(false);
        });
    } else {
      const newIssue = await axios
        // issue creation
        .post("/api/issue", { ...data, projectId: selectedProject?.id })
        .catch((e) => console.log(e))
        .then((res) => {
          updateIssue();
          onClose(false);
          reset();
          setSelectedTag(getValues("type"));

          if (res && res.data) {
            router.push(`/issue/${res.data.uuid}`);
          }
        });

      console.log("Created new issue: ", newIssue);
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

  const handleImageChange = (value: string) => {
    setValue("imageSrc", value);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="DialogContent bg-white sm:max-w-[800px]">
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
              <ImageUpload
                value={getValues("imageSrc")}
                onChange={handleImageChange}
              />
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
