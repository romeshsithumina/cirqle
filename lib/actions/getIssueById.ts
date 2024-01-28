"use server";

import prisma from "@/lib/prismadb";

interface IParams {
  id?: string;
}

export async function getIssueById(params: IParams) {
  try {
    const { id } = params;

    const issue = await prisma.issue.findUnique({
      where: {
        uuid: id,
      },
      include: {
        author: true,
        assignedTo: true,
        project: true,
        attachments: {
          where: {
            mimetype: "image",
          },
        },
      },
    });

    if (issue) {
      const attachments = await prisma.attachment.findMany({
        where: {
          issueId: issue.id,
        },
      });

      return { ...issue, attachments };
    }
  } catch (error) {
    console.log(error);
  }
}
