import { Prisma } from "@prisma/client";
export type ReviewsType = Prisma.TeacherGetPayload<{
  include: { reviews: { include: { score: true } }; career: true };
}>;
export type ReviewType = Prisma.ReviewGetPayload<{
  include: { score: true };
}>;

export type Teacher = Prisma.TeacherGetPayload<{
  include: { reviews: true; career: true };
}>;
