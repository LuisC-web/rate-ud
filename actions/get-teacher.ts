"use server";
import { prisma } from "@/lib/prisma";

export const getTeachers = async () => {
  return await prisma.teacher.findMany({
    include: { score: true, career: true },
    take: 9,
  });
};
