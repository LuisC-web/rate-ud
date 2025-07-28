"use server";
import { prisma } from "@/lib/prisma";

export const getCareers = async () => {
  try {
    return {
      data: await prisma.career.findMany(),
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
