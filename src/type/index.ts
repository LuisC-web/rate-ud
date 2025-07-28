import { Prisma } from "@prisma/client";

export type Teacher = Prisma.TeacherGetPayload<{
  include: { score: true; career: true };
}>;
