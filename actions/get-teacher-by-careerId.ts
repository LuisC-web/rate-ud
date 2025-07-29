"use server";
import { prisma } from "@/lib/prisma";

export const getTeachersById = async (careerId: number) => {
  try {
    const teachers = await prisma.teacher.findMany({
      where: { careerId },
    });
    if (!teachers) {
      return {
        data: [],
        error: {
          error: false,
          message: "No existe profesores para la carrera",
        },
      };
    }

    return {
      data: teachers,
      error: { error: false, message: "" },
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      error: { error: true, message: "Ocurrió un error" },
    };
  }
};
