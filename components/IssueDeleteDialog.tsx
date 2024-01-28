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
  const { notifyUpdate } = useIssues();
  const router = useRouter();

  const handleDeleteButtonClick = async () => {
    setIsDeleting(true);
    const issueId = id;
    await axios
      .delete(`/api/issue/${issueId}`)
      .then(async () => {
        console.log("issue deleted");
        setIsDeleting(false);
        onClose(false);
        router.push("/");
        notifyUpdate();
      })
      .catch((e) => console.log(e));
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="DialogContent bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            Issue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
