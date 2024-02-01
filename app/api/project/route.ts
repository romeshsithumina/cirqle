"use server";

import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description } = body;

  const newProject = await prisma.project
    .create({
      data: {
        name: title,
        description,
      },
    })
    .catch(async (e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log(newProject);

  return NextResponse.json(newProject);
}
