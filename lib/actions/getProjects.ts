"use server";
import prisma from "@/lib/prismadb";

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany();

    return projects;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
