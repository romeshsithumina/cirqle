import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, { message: "Project name is required" }),
  description: z.string(),
});
