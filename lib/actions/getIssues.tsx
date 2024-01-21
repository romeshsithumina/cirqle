"use server";
import prisma from "@/lib/prismadb";

export async function getIssues(selectedProject: number) {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        projectId: selectedProject,
      },
      include: {
        author: true,
      },
    });

    return issues;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
