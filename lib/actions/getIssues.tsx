"use server";
import prisma from "@/lib/prismadb";

export async function getIssues() {
  try {
    const issues = await prisma.issue.findMany({
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
