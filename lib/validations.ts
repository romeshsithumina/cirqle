import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, { message: "Project name is required" }),
  description: z.string(),
});

export const IssueSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  status: z.enum(["open", "wip", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Priority is required",
  }),
  type: z.enum(["bug", "feature", "improvement"], {
    required_error: "Type is required",
  }),
  assignedTo: z.number({ required_error: "Assigned to is required" }),
  imageSrc: z.string().optional(),
});
