import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useIssues } from "@/contexts/IssuesContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueDeleteDialogProps {
  id: string;
  open: boolean;
  onClose: (value: boolean) => void;
}

export function IssueDeleteDialog({
  id,
  open,
  onClose,
}: IssueDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateIssue } = useIssues();
  const router = useRouter();

  const handleDeleteButtonClick = async () => {
    setIsDeleting(true);
    await axios
      .delete(`/api/issue/${id}`)
      .then(() => {
        updateIssue();
        setIsDeleting(false);
        onClose(false);
        router.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            Issue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteButtonClick}
            disabled={isDeleting}
            className="bg-red-primary text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
