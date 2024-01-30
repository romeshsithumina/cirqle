"use server";

import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface IParams {
  issueId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const body = await request.json();

  const { status, pathname } = body;
  const { issueId } = params;

  const updatedIssue = await prisma.issue
    .update({
      where: {
        uuid: issueId,
      },
      data: {
        status,
      },
    })
    .catch(async (e: any) => {
      console.log("Error is");
      console.log(e.response.data);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log("Updated issue is ", updatedIssue);

  revalidatePath(pathname);
  return NextResponse.json(updatedIssue);
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const body = await request.json();

  const { title, description, type, priority, assignedTo, imageSrc, pathname } =
    body;
  const { issueId } = params;

  const updatedIssue = await prisma.issue
    .update({
      where: {
        uuid: issueId,
      },
      data: {
        title,
        description,
        type,
        priority,
        assignedTo: {
          connect: {
            id: assignedTo,
          },
        },
      },
      include: {
        attachments: true,
      },
    })
    .catch(async (e: any) => {
      console.log("Error is");
      console.log(e.response.data);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log("Updated issue is ", updatedIssue);

  const issueWithAttachments = await prisma.issue.findUnique({
    where: {
      uuid: issueId,
    },
    include: {
      attachments: true,
    },
  });

  const updatedAttachment = await prisma.attachment
    .update({
      where: {
        id: issueWithAttachments.attachments[0].id,
      },
      data: {
        url: imageSrc,
        filename: imageSrc.split("/")?.pop(),
        mimetype: "image",
      },
    })
    .catch(async (e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log("Updated attachment is ", updatedAttachment);

  revalidatePath(pathname);
  return NextResponse.json({ ...updatedIssue, attachment: updatedAttachment });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { issueId } = params;

  const { id } = await prisma.issue
    .findUnique({
      where: {
        uuid: issueId,
      },
    })
    .catch(async (e: any) => {
      console.log(e.response.data);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  await prisma.attachment
    .deleteMany({
      where: {
        issueId: id,
      },
    })
    .catch(async (e: any) => {
      console.log(e.response.data);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  await prisma.issue
    .delete({
      where: {
        uuid: issueId,
      },
    })
    .catch(async (e: any) => {
      console.log("Error is");
      console.log(e.response.data);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return NextResponse.json({
    message: `Issue ${issueId} was deleted successfully`,
  });
}
