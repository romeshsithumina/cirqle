import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const currentUser = await prisma.user
    .findUnique({
      where: {
        id: 3,
      },
    })
    .catch((e: any) => console.log(e));

  console.log(currentUser);

  const body = await request.json();

  const { title, description, type, priority, assignedTo } = body;

  const newIssue = await prisma.issue
    .create({
      data: {
        title,
        description,
        priority,
        type,
        assignedTo,
        project: {
          connect: {
            id: 1,
          },
        },
      },
    })
    .catch(async (e: any) => {
      console.log(e.response.data);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  // // console.log(newIssue);

  const updatedUser = await prisma.user
    .update({
      where: { id: currentUser.id },
      data: {
        issues: {
          connect: {
            id: newIssue.id,
          },
        },
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log("Updated user with new issue:", updatedUser);

  return NextResponse.json(newIssue);
}
