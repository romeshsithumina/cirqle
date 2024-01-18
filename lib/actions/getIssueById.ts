"use server";

import prisma from "@/lib/prismadb";

interface IParams {
  id?: string;
}

export async function getIssueById(params: IParams) {
  try {
    const { id } = params;

    const issue = prisma.issue.findUnique({
      where: {
        uuid: id,
      },
      include: {
        author: true,
        assignedTo: true,
        project: true,
      },
    });

    return issue;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
