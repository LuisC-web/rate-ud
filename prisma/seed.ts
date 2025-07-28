import { PrismaClient } from "@prisma/client";
import { teachers } from "./data/teachers";
import { scores } from "./data/score";
import { careers } from "./data/careers";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.score.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.career.deleteMany();
    const createdCareers = await Promise.all(
      careers.map((career) => prisma.career.create({ data: career })),
    );
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
    await Promise.all(
      scores.map((score) => {
        const randomTeacher =
          createdTeachers[Math.floor(Math.random() * createdTeachers.length)];
        return prisma.score.create({
          data: {
            ...score,
            teacherId: randomTeacher.id,
          },
        });
      }),
    );
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seed()
  .then(async () => {
    console.log("✅ Seeding completed successfully");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Error during seeding:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
