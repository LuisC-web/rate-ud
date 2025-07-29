"use server";
import { prisma } from "@/lib/prisma";

export const getTeachers = async (
  search?: string,
  limit?: number,
  skip?: number,
) => {
  try {
    const normalizedSearch = search
      ? search
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      : undefined;

    const teachers = await prisma.teacher.findMany({
      where: normalizedSearch
        ? {
            OR: [
              {
                name: {
                  contains: normalizedSearch,
                  mode: "insensitive",
                },
              },
              // Use raw SQL for accent-insensitive search
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      include: { reviews: true, career: true },
      ...(limit ? { take: limit } : {}),
      ...(skip ? { skip } : {}),
    });

    const countTeachers = await prisma.teacher.count({
      where: normalizedSearch
        ? {
            OR: [
              {
                name: {
                  contains: normalizedSearch,
                  mode: "insensitive",
                },
              },
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
    });

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
      error: { error: true, message: "Ocurrió un error" },
    };
  }
};
