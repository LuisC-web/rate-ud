import { PrismaClient } from "@prisma/client";
import { teachers } from "./data/teachers";
import { scores } from "./data/score";
import { careers } from "./data/careers";
import { reviews } from "./data/reviews";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    // Clean up in reverse order to avoid FK conflicts
    await prisma.score.deleteMany();
    await prisma.review.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.career.deleteMany();

    // Insert careers
    const createdCareers = await prisma.$transaction(
      careers.map((career) => prisma.career.create({ data: career })),
    );

    // Insert teachers
    const createdTeachers = await prisma.$transaction(
      teachers.map((teacher) => {
        const randomCareer =
          createdCareers[Math.floor(Math.random() * createdCareers.length)];
        return prisma.teacher.create({
          data: { name: teacher.name, careerId: randomCareer.id },
        });
      }),
    );

    // Insert reviews with unique email-teacher combinations
    const createdReviews = await prisma.$transaction(
      Array.from({ length: scores.length }).map((_, i) => {
        const review = reviews[i % reviews.length];
        const teacherId = createdTeachers[i % createdTeachers.length].id;

        return prisma.review.create({
          data: {
            content: review.content,
            user: `${review.user} ${Math.floor(i / reviews.length) + 1}`, // Make user unique
            email: `${review.email.split("@")[0]}_${i}@${review.email.split("@")[1]}`, // Make email unique
            teacherId: teacherId,
          },
        });
      }),
    );

    // Initialize teacherScoresMap properly
    const teacherScoresMap: Record<number, number[]> = {};
    createdReviews.forEach((review) => {
      if (!teacherScoresMap[review.teacherId]) {
        teacherScoresMap[review.teacherId] = [];
      }
    });

    // Insert scores
    await prisma.$transaction(
      createdReviews.map((review, i) => {
        const value = scores[i % scores.length].value;

        teacherScoresMap[review.teacherId].push(value);

        return prisma.score.create({
          data: {
            value,
            reviewId: review.id,
          },
        });
      }),
    );

    // Update teacher average scores
    await prisma.$transaction(
      Object.entries(teacherScoresMap).map(([teacherId, values]) => {
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
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
