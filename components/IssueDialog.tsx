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
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import Tag from "./Tag";
import { Combobox } from "./Combobox";
import TypeSelect from "./TypeSelect";

const IssueDialog = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add an Issue</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add an Issue</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="w-full grid-cols-1 items-center gap-4">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="col-start-1 grid-cols-1 items-center gap-4">
            <TextField
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
            <TypeSelect />
          </div>
          <div className="col-start-1 row-start-3 mt-5 flex items-center justify-center px-5">
            <InputLabel className="w-[80px]">Type</InputLabel>
            <div className="flex w-full gap-4">
              <div className="flex w-full  justify-around">
                <Tag name="bug" clickable />
                <Tag name="feature" clickable />
                <Tag name="improvement" clickable />
              </div>
            </div>
          </div>
          <div className="col-start-1 row-start-4 w-full">
            <Combobox />
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-red-primary text-white" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default IssueDialog;
