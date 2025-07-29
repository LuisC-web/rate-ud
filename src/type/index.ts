import { Prisma } from "@prisma/client";

export type Teacher = Prisma.TeacherGetPayload<{
  include: { reviews: true; career: true };
}>;
