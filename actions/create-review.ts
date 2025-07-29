"use server";
import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client";

export const createReview = async (data: Omit<Review, "id">, score: number) => {
  try {
    const review = await prisma.review.create({ data });
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
