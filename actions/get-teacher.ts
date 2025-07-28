"use server";
import { prisma } from "@/lib/prisma";
export const getTeachers = async (limit?: number) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: { score: true, career: true },
      ...(limit ? { take: limit } : {}),
    });
    const countTeachers = await prisma.teacher.count();
    return {
      data: teachers,
      count: countTeachers,
      error: { error: false, message: "" },
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      count: 0,
      error: { error: true, message: "Ocurrio un error" },
    };
  }
};
