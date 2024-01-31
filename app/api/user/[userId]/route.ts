import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  clerkId: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
  const body = await request.json();

  const { name, email, picture } = body;
  const { clerkId } = params;

  const updatedUser = await prisma.user
    .update({
      where: {
        clerkID: clerkId,
      },
      data: {
        name,
        email,
        picture,
      },
    })
    .catch(async (e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  console.log("Updated user is ", updatedUser);

  return NextResponse.json({ message: "OK", updatedUser });
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { clerkId } = params;

  try {
    // Find the user by ID along with their issues and attachments
    const user = await prisma.user.findUnique({
      where: { clerkID: clerkId },
      include: {
        issues: {
          include: {
            attachments: true,
          },
        },
      },
    });

    if (!user) {
      console.log(`User with ID ${clerkId} not found.`);
      return;
    }

    // Delete each attachment associated with the user's issues
    for (const issue of user.issues) {
      for (const attachment of issue.attachments) {
        await prisma.attachment.delete({
          where: { id: attachment.id },
        });
      }
    }

    // Delete the user's issues
    await prisma.issue.deleteMany({
      where: { authorId: user.id },
    });

    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: { clerkID: clerkId },
    });

    console.log(
      `User with ID ${clerkId} and associated issues and attachments deleted successfully.`
    );

    return NextResponse.json({ message: "OK", deletedUser });
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
}
