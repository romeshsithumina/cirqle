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
import { IssueSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Combobox } from "./Combobox";
import ImageUpload from "./ImageUpload";
import Tag from "./Tag";
import TypeSelect from "./TypeSelect";

type FormFields = z.infer<typeof IssueSchema>;

interface Issue {
  uuid: string;
  title: string;
  description: string;
  status: string;
  priority: "low" | "medium" | "high";
  type: "bug" | "feature" | "improvement";
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
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
      priority: issue?.priority || undefined,
      type: issue?.type || undefined,
      assignedTo: issue?.assignedTo.id || undefined,
      imageSrc: issue?.attachments?.[0]?.url || "",
    },
  });
  const [selectedTag, setSelectedTag] = useState(getValues("type"));
  const { notifyUpdate } = useIssues();
  const { selectedProject } = useProject();
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    console.log("submitted data are\n", data);

    if (issue) {
      // issue update
      const issueId = issue.uuid;
      await axios
        .patch(`/api/issue/${issueId}`, { ...data, pathname })
        .catch((e) => console.log(e))
        .then(() => {
          notifyUpdate();
          onClose(false);
        });
    } else {
      // issue creation
      const newIssue = await axios
        .post("/api/issue", { ...data, projectId: selectedProject?.id })
        .catch((e) => console.log(e))
        .then((res) => {
          notifyUpdate();
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
  const handleTypeChange = (value: Issue["priority"]) => {
    setValue("priority", value);
    clearErrors("priority");
  };

  const handleUserSelect = (value: number) => {
    setValue("assignedTo", value);
    clearErrors("assignedTo");
  };

  const handleTagSelect = (value: Issue["type"]) => {
    setValue("type", value);
    setSelectedTag(value);
    clearErrors("type");
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
                {...register("title")}
                id={
                  errors.title ? "outlined-error-helper-text" : "outlined-basic"
                }
                label="Title"
                variant="outlined"
                className="w-full"
                helperText={errors.title?.message}
                error={!!errors.title}
                sx={
                  errors.title
                    ? {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#ff8484",
                          },
                          "&:hover fieldset": {
                            borderColor: "#f53162",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#f53162",
                          },
                        },
                      }
                    : undefined
                }
              />
            </div>
            <div className="col-start-1 grid-cols-1 items-center gap-4">
              <TextField
                {...register("description")}
                id={
                  errors.description
                    ? "outlined-error-helper-text"
                    : "outlined-basic"
                }
                label="Description"
                variant="outlined"
                className="w-full"
                multiline
                rows={4}
                helperText={errors.description?.message}
                error={!!errors.description}
                sx={
                  errors.description
                    ? {
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#ff8484",
                          },
                          "&:hover fieldset": {
                            borderColor: "#f53162",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#f53162",
                          },
                        },
                      }
                    : undefined
                }
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
              {errors.priority && (
                <span className="pl-3 text-xs text-red-primary">
                  {errors.priority?.message}
                </span>
              )}
            </div>
            <div className="">
              <div className="col-start-1 row-start-3 mt-5 flex items-center justify-center rounded-md px-5 pb-1">
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
              {errors.type && (
                <span className="pl-6 text-xs text-red-primary">
                  {errors.type?.message}
                </span>
              )}
            </div>
            <div className="col-start-1 row-start-4 w-full">
              <Combobox
                currentValue={getValues("assignedTo")}
                onUserSelect={handleUserSelect}
              />
              {errors.assignedTo && (
                <span className="pl-4 text-xs text-red-primary">
                  {errors.assignedTo?.message}
                </span>
              )}
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
