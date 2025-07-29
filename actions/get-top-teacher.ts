"use server";

import { Teacher } from "@/type";
import { getTeachers } from "./get-teacher";

export const getTopTeacher = async () => {
  try {
    const allTeacher = await getTeachers();
    if (allTeacher.error.error) {
      return allTeacher;
    }
    const sorted = allTeacher.data.sort((a, b) => b.avg - a.avg);

    const bestTeachers: Teacher[] = sorted.slice(0, 10);

    const worstTeachers: Teacher[] = sorted.slice(-10).reverse();
    return {
      data: { bestTeachers, worstTeachers },
      error: {
        error: false,
        message: "",
      },
    };
  } catch (error) {
    return {
      data: { bestTeachers: [], worstTeachers: [] },
      error: {
        error: true,
        message: "Ocurrio un error",
      },
    };
  }
};
