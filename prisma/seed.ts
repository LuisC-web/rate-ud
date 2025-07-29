import { PrismaClient } from "@prisma/client";
import { teachers } from "./data/teachers";
import { scores } from "./data/score";
import { careers } from "./data/careers";
import { reviews } from "./data/reviews";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Limpieza en orden inverso
    await prisma.score.deleteMany();
    await prisma.review.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.career.deleteMany();

    // Crear carreras
    const createdCareers = await Promise.all(
      careers.map((career) => prisma.career.create({ data: career })),
    );

    // Crear profesores
    const createdTeachers = await Promise.all(
      teachers.map((teacher) => {
        const randomCareer =
          createdCareers[Math.floor(Math.random() * createdCareers.length)];
        return prisma.teacher.create({
          data: {
            ...teacher,
            careerId: randomCareer.id,
          },
        });
      }),
    );

    // Crear reviews (asignadas a profesores)
    const createdReviews = await Promise.all(
      Array.from({ length: scores.length }).map(() => {
        const randomTeacher =
          createdTeachers[Math.floor(Math.random() * createdTeachers.length)];
        const randomReview =
          reviews[Math.floor(Math.random() * reviews.length)];

        return prisma.review.create({
          data: {
            content: randomReview.content,
            user: randomReview.user,
            teacherId: randomTeacher.id,
          },
        });
      }),
    );

    // Crear scores (asociados a reviews)
    const teacherScoresMap: Record<number, number[]> = {};
    await Promise.all(
      createdReviews.map((review, index) => {
        const scoreValue = scores[index % scores.length].value;
        if (!teacherScoresMap[review.teacherId]) {
          teacherScoresMap[review.teacherId] = [];
        }
        teacherScoresMap[review.teacherId].push(scoreValue);

        return prisma.score.create({
          data: {
            value: scoreValue,
            reviewId: review.id,
          },
        });
      }),
    );

    // Calcular promedio por profesor
    await Promise.all(
      Object.entries(teacherScoresMap).map(([teacherId, values]) => {
        const avg =
          values.reduce((sum, value) => sum + value, 0) / values.length;
        return prisma.teacher.update({
          where: { id: +teacherId },
          data: { avg },
        });
      }),
    );

    console.log("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
