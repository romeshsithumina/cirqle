"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { customAlphabet } from "nanoid";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 20);

  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({
      error: "Not logged in.",
    });
  }

  const body = await request.json();

  const {
    title,
    description,
    type,
    priority,
    assignedTo,
    projectId,
    imageSrc,
  } = body;

  const newIssue = await prisma.issue
    .create({
      data: {
        uuid: nanoid(),
        title,
        description,
        priority,
        type,
        author: {
          connect: {
            clerkID: userId,
          },
        },
        assignedTo: {
          connect: {
            id: assignedTo,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    })
    .catch(async (e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  const newAttachment = await prisma.attachment
    .create({
      data: {
        issue: {
          connect: {
            id: newIssue?.id,
          },
        },
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

  console.log("New issue is", newIssue);

  return NextResponse.json({ ...newIssue, attachment: newAttachment });
}
