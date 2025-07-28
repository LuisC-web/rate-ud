import { Prisma } from "@prisma/client";

export type teacher = Prisma.TeacherGetPayload<{
  include: { score: true; career: true };
}>;
