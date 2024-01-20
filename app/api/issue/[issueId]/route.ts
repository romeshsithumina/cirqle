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
