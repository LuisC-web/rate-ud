"use server";

import { prisma } from "@/lib/prisma";
import { ReviewsType } from "@/type";

export const getReviews = async (id: number) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { score: true },
        },
        career: true,
      },
    });

    if (!teacher) {
      return {
        data: null,
        error: {
          error: true,
          message: `No se encontró el profesor con id ${id}`,
        },
      };
    }

    return {
      data: teacher,
      error: { error: false, message: "" },
    };
  } catch (error) {
    console.error("Error al obtener reviews:", error);
    return {
      data: null,
      error: {
        error: true,
        message: "Error inesperado al obtener las reviews.",
      },
    };
  }
};
