"use server";
import prisma from "@/lib/prismadb";

export async function getIssues(selectedProject: number | undefined) {
  try {
    if (selectedProject) {
      const issues = await prisma.issue.findMany({
        where: {
          projectId: selectedProject,
        },
        include: {
          author: true,
        },
      });
      return issues;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
