import { PrismaClient } from "@prisma/client";
import { teachers } from "./data/teachers";
import { careers } from "./data/careers";

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
    await prisma.$transaction(
      teachers.map((teacher) => {
        const randomCareer = createdCareers.filter(
          (career) => career.id === teacher.careerId,
        );
        return prisma.teacher.create({
          data: { name: teacher.name, careerId: randomCareer[0].id },
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
