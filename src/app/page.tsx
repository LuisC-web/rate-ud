"use client";
import TableData from "@/components/TableData";
import { Teacher } from "@/type";
import { Search, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";
import { getTeachers } from "../../actions/get-teacher";
import Spinner from "@/components/ui/spinner/Spinner";
import CardData from "@/components/CardData";
import { toast } from "react-toastify";
const TEACHER_FOR_PAGE = 9;
export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState({ totalPages: 0, actualPages: 1 });
  useEffect(() => {
    const getTeacherMountComponent = async () => {
      setLoading(true);
      const data = await getTeachers(TEACHER_FOR_PAGE);

      if (data.error.error) {
        toast.error(data.error.message);
        setTeachers([]);
        console.log(data);
        setLoading(false);
        return;
      }
      setTeachers(data.data);
      setPages({ ...pages, totalPages: data.count / TEACHER_FOR_PAGE });
      setLoading(false);
    };
    getTeacherMountComponent();
  }, []);

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
      <div className="flex h-full flex-col items-center justify-between pb-5">
        {loading ? (
          <Spinner />
        ) : teachers.length > 0 ? (
          <>
            <TableData teachers={teachers} />
            <CardData teachers={teachers}></CardData>
            <div className="mt-2 hidden w-full items-center justify-center gap-2 md:flex">
              <SkipBack className="hover:text-primary/80 cursor-pointer" />
              <div className="flex gap-2">
                {Array.from({ length: pages.totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <div
                      key={num}
                      className="bg-primary hover:bg-primary/80 cursor-pointer rounded p-2 text-sm text-white"
                      onClick={() => {
                        setPages({ ...pages, actualPages: num });
                      }}
                    >
                      {num}
                    </div>
                  ),
                )}
              </div>
              <SkipForward className="hover:text-primary/80 cursor-pointer" />
            </div>
            <button className="bg-primary-light text-primary border-primary active:bg-primary-light/80 mt-5 block w-full cursor-pointer rounded-xl border-2 p-2 md:hidden">
              Cargar mas
            </button>
          </>
        ) : (
          <p className="text-error mt-4 text-3xl">No hay resultados</p>
        )}
      </div>
    </div>
  );
}
