import TableData from "@/components/TableData";
import { prisma } from "@/lib/prisma";
import { Search, SkipBack, SkipForward } from "lucide-react";
const getTeachers = async () => {
  return await prisma.teacher.findMany();
};
export default async function Home() {
  const teachers = await getTeachers();
  console.log(teachers);

  return (
    <div className="mt-1 flex h-full flex-col px-10">
      <h1 className="text-primary text-4xl">Busca a tu profe...</h1>
      <form action="">
        <div className="border-primary mt-5 flex max-w-3xl items-center gap-3 rounded-2xl border px-4 py-2">
          <Search className="text-primary size-5" />
          <input
            type="text"
            placeholder="Herrera"
            className="w-full focus:border-0 focus:outline-none"
          />
        </div>
      </form>
      <div className="flex h-full flex-col justify-between pb-5">
        {teachers.length ? (
          <>
            <TableData></TableData>
            <div className="mt-2 flex w-full items-center justify-center gap-2">
              <SkipBack className="hover:text-primary/80 cursor-pointer" />
              <div className="flex gap-2">
                <div className="bg-primary hover:bg-primary/80 cursor-pointer rounded p-2 text-sm text-white">
                  1
                </div>
                <div className="bg-primary hover:bg-primary/80 cursor-pointer rounded p-2 text-sm text-white">
                  2
                </div>
                <div className="bg-primary hover:bg-primary/80 cursor-pointer rounded p-2 text-sm text-white">
                  3
                </div>
                <div className="bg-primary hover:bg-primary/80 cursor-pointer rounded p-2 text-sm text-white">
                  4
                </div>
              </div>
              <SkipForward className="hover:text-primary/80 cursor-pointer" />
            </div>
          </>
        ) : (
          <p className="text-error mt-4 text-3xl">No hay resultados</p>
        )}
      </div>
    </div>
  );
}
