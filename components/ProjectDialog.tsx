import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormFields = z.infer<typeof ProjectSchema>;

interface ProjectDialogProps {
  open: boolean;
  projectCreated: boolean;
  onClose: (value: boolean) => void;
  setProjectCreated: (value: boolean) => void;
}

const ProjectDialog = ({
  open,
  projectCreated,
  onClose,
  setProjectCreated,
}: ProjectDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: any) => {
    await axios
      .post("/api/project", data)
      .then(() => {
        setProjectCreated(!projectCreated);
        onClose(false);
        reset();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="DialogContent bg-white sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Create a new Project here. Click Save when done.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="mb-5 w-full items-center gap-4">
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
              />
            </div>
            <div className="items-center gap-4">
              <TextField
                {...register("description")}
                id="outlined-basic"
                label="Description (optional)"
                variant="outlined"
                className="w-full"
                multiline
                rows={3}
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
export default ProjectDialog;
