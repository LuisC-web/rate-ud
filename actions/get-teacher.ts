"use server";
import { prisma } from "@/lib/prisma";
export const getTeachers = async (limit?: number) => {
  return await prisma.teacher.findMany({
    include: { score: true, career: true },
    ...(limit ? { take: limit } : {}), // Solo aplica 'take' si se proporciona 'limit'
  });
};
