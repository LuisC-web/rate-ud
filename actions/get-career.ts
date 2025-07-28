"use server";
import { prisma } from "@/lib/prisma";

export const getCareers = async () => {
  return await prisma.career.findMany();
};
