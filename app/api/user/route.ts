import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { clerkId, name, email, picture } = body;

  const newUser = await prisma.user
    .create({
      data: {
        clerkID: clerkId,
        name,
        email,
        picture,
        role: "developer",
      },
    })
    .catch(async (e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log(newUser);

  return NextResponse.json({ message: "OK", newUser });
}
