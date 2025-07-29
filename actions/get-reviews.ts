"use server";

import { prisma } from "@/lib/prisma";
import { ReviewsType } from "@/type";

export const getReviews = async (id: number) => {
  try {
    const reviews: ReviewsType = await prisma.teacher.findUniqueOrThrow({
      where: { id },
      include: {
        reviews: {
          include: {
            score: true,
          },
        },
        career: true,
      },
    });

    return {
      data: reviews,
      error: { error: false, message: "" },
    };
  } catch (error) {
    console.error("Error al obtener reviews:", error);

    if (error instanceof Error) {
      throw new Error(`No se encontró el profesor con id ${id}`);
    }

    throw new Error("Ocurrió un error inesperado al obtener las reviews.");
  }
};
