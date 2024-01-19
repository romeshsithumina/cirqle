import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { customAlphabet } from "nanoid";

export async function POST(request: Request) {
  const currentUser = await prisma.user
    .findUnique({
      where: {
        id: 2,
      },
    })
    .catch((e: any) => console.log(e));

  console.log(currentUser);

  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 20);

  const body = await request.json();

  const { title, description, type, priority, assignedTo } = body;

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
            id: currentUser.id,
          },
        },
        assignedTo: {
          connect: {
            id: assignedTo,
          },
        },
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

  console.log(newIssue);

  return NextResponse.json(newIssue);
}
