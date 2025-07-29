"use server";
import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client";

export const createReview = async (
  data: Omit<Review, "id">,
  score: number,
  email: string,
  code: string,
) => {
  try {
    const verifyCode = await prisma.code.findUnique({ where: { email } });
    if (!verifyCode) {
      return {
        data: [],
        error: {
          error: true,
          message: "El correo suministrado no tiene codigo.",
        },
      };
    }
    if (verifyCode?.code !== code) {
      return {
        data: [],
        error: {
          error: true,
          message: "El codigo no es valido.",
        },
      };
    }
    const [reviewResult] = await Promise.allSettled([
      prisma.review.create({ data }),
      prisma.code.delete({ where: { email } }),
    ]);
    if (reviewResult.status !== "fulfilled") {
      return {
        data: [],
        error: {
          error: true,
          message: "No se pudo crear la reseña.",
        },
      };
    }
    const review = reviewResult.value;
    await prisma.score.create({ data: { value: score, reviewId: review.id } });
    const scores = await prisma.score.findMany({
      where: {
        review: {
          teacherId: data.teacherId,
        },
      },
    });

    const total = scores.reduce((acc, curr) => acc + curr.value, 0);
    const avg = total / scores.length;

    await prisma.teacher.update({
      where: { id: data.teacherId },
      data: { avg },
    });
    return {
      data: [],
      error: { error: false, message: "" },
    };
  } catch (error) {
    console.log(error);
    return {
      data: [],
      error: { error: true, message: "Ocurrio un error" },
    };
  }
};
