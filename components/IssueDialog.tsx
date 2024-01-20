"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIssues } from "@/contexts/IssuesContext";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
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
  image: string;
};

const IssueDialog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      type: "",
      assignedTo: undefined,
    },
  });
  const [selectedTag, setSelectedTag] = useState("");
  const [open, setOpen] = useState(false);
  const { updateIssue } = useIssues();

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    console.log(data);
    // Handle form submission here
    await axios
      .post("/api/issue", data)
      .catch((e) => console.log(e))
      .then(() => {
        updateIssue();
        setOpen(false);
        reset();
      });
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add an Issue</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[800px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add an Issue</DialogTitle>
            <DialogDescription>
              Enter issue details here. Click save when done.
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
              <TypeSelect onTypeChange={handleTypeChange} />
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
              <Combobox onUserSelect={handleUserSelect} />
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
