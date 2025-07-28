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
    const teacherScoresMap: Record<string, number[]> = {};
    await Promise.all(
      scores.map((score) => {
        const randomTeacher =
          createdTeachers[Math.floor(Math.random() * createdTeachers.length)];
        if (!teacherScoresMap[randomTeacher.id]) {
          teacherScoresMap[randomTeacher.id] = [];
        }
        teacherScoresMap[randomTeacher.id].push(score.value);
        return prisma.score.create({
          data: {
            value: score.value,
            teacherId: randomTeacher.id,
          },
        });
      }),
    );
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
