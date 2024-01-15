"use server";

import prisma from "@/lib/prismadb";

export async function getDevelopers() {
  try {
    const developers = await prisma.user.findMany({
      where: {
        role: "developer",
      },
    });
    return developers;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getAnswers(params: GetAnswersParams) {
//   try {
//     connectToDatabase();
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
