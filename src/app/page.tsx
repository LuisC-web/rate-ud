import TableData from "@/components/TableData";
import { Search, SkipBack, SkipForward } from "lucide-react";

export default async function Home() {
  const teachers = [2];
  return (
    <div className="flex flex-col h-full px-10  mt-1 ">
      <h1 className="text-4xl text-primary">Busca a tu profe...</h1>
      <form action="">
        <div className="border border-primary max-w-3xl rounded-2xl px-4 py-2 flex gap-3 items-center mt-5">
          <Search className="text-primary size-5" />
          <input
            type="text"
            placeholder="Herrera"
            className="focus:outline-none focus:border-0 w-full"
          />
        </div>
      </form>
      <div className="pb-5 flex flex-col justify-between h-full">
        {teachers.length ? (
          <>
            <TableData></TableData>
            <div className="flex w-full justify-center items-center mt-2 gap-2">
              <SkipBack className="cursor-pointer hover:text-primary/80" />
              <div className="gap-2 flex">
                <div className="bg-primary p-2 text-sm hover:bg-primary/80 cursor-pointer rounded text-white">
                  1
                </div>
                <div className="bg-primary p-2 text-sm hover:bg-primary/80 cursor-pointer rounded text-white">
                  2
                </div>
                <div className="bg-primary p-2 text-sm hover:bg-primary/80 cursor-pointer rounded text-white">
                  3
                </div>
                <div className="bg-primary p-2 text-sm hover:bg-primary/80 cursor-pointer rounded text-white">
                  4
                </div>
              </div>
              <SkipForward className="cursor-pointer hover:text-primary/80" />
            </div>
          </>
        ) : (
          <p className="text-error text-3xl mt-4">No hay resultados</p>
        )}
      </div>
    </div>
  );
}
