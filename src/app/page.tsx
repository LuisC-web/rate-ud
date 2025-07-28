"use client";
import TableData from "@/components/TableData";
import { Teacher } from "@/type";
import { Search, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";
import { getTeachers } from "../../actions/get-teacher";
import CardData from "@/components/CardData";
import { toast } from "react-toastify";
const TEACHER_FOR_PAGE = 9;
export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState({ totalPages: 1, actualPages: 1 });
  const [pageMovil, setPageMovil] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getTeacherMountComponent = async () => {
      setLoading(true);
      const data = await getTeachers(search, TEACHER_FOR_PAGE);
      toast.success("Cargando mas profesores...");
      if (data.error.error) {
        toast.error(data.error.message);
        setTeachers([]);
        console.log(data);
        setLoading(false);
        return;
      }
      setTeachers(data.data);
      setPages({
        ...pages,
        totalPages: Math.ceil(data.count / TEACHER_FOR_PAGE),
      });
      setLoading(false);
    };
    getTeacherMountComponent();
  }, []);
  useEffect(() => {
    const getTeacherChange = async () => {
      setLoading(true);
      const data = await getTeachers(
        search,
        TEACHER_FOR_PAGE,
        (pages.actualPages - 1) * TEACHER_FOR_PAGE,
      );

      if (data.error.error) {
        toast.error(data.error.message);
        setTeachers([]);
        console.log(data);
        setLoading(false);
        return;
      }
      setTeachers(data.data);
      setLoading(false);
    };
    getTeacherChange();
  }, [pages]);
  useEffect(() => {
    const getTeacherChange = async () => {
      setLoading(true);
      const data = await getTeachers(
        search,
        TEACHER_FOR_PAGE,
        (pages.actualPages - 1) * TEACHER_FOR_PAGE,
      );
      if (data.error.error) {
        toast.error(data.error.message);
        setTeachers([]);
        console.log(data);
        setLoading(false);
        return;
      }
      setPages({
        ...pages,
        totalPages: Math.ceil(data.count / TEACHER_FOR_PAGE),
      });
      setTeachers(data.data);
      setLoading(false);
    };
    getTeacherChange();
  }, [search]);
  const handleChargeInfiniteScroll = async () => {
    setLoading(true);
    toast.success("Cargando mas profesores...");
    const data = await getTeachers(
      search,
      TEACHER_FOR_PAGE,
      TEACHER_FOR_PAGE + pageMovil * TEACHER_FOR_PAGE,
    );

    if (data.error.error) {
      toast.error(data.error.message);
      setTeachers([]);
      console.log(data);
      setLoading(false);
      return;
    }
    setTeachers(data.data);
    setPageMovil(pageMovil < TEACHER_FOR_PAGE ? pageMovil + 1 : pageMovil);
    setLoading(false);
  };
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
      <div className="flex h-full flex-col items-center justify-between pb-5">
        {teachers.length > 0 ? (
          <>
            <TableData teachers={teachers} />
            <CardData teachers={teachers}></CardData>
            <div className="mt-2 hidden w-full items-center justify-center gap-2 md:flex">
              <SkipBack
                className="hover:text-primary/80 cursor-pointer"
                onClick={() =>
                  setPages({
                    ...pages,
                    actualPages:
                      pages.actualPages > 1 ? pages.actualPages - 1 : 1,
                  })
                }
              />
              <div className="flex gap-2">
                {Array.from({ length: pages.totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <div
                      key={num}
                      className={`bg-primary hover:bg-primary/80 cursor-pointer rounded p-2 text-sm text-white ${num === pages.actualPages ? "bg-primary/80" : "bg-primary"}`}
                      onClick={() => {
                        setPages({ ...pages, actualPages: num });
                      }}
                    >
                      {num}
                    </div>
                  ),
                )}
              </div>
              <SkipForward
                className="hover:text-primary/80 cursor-pointer"
                onClick={() =>
                  setPages({
                    ...pages,
                    actualPages:
                      pages.actualPages < pages.totalPages
                        ? pages.actualPages + 1
                        : pages.totalPages,
                  })
                }
              />
            </div>
            <button
              className="bg-primary-light text-primary border-primary active:bg-primary-light/80 mt-5 block w-full cursor-pointer rounded-xl border-2 p-2 disabled:opacity-20 md:hidden"
              onClick={handleChargeInfiniteScroll}
              disabled={loading || pageMovil >= pages.totalPages}
            >
              {pageMovil === pages.totalPages
                ? "NO HAY MAS DATOS"
                : "Cargar mas"}
            </button>
          </>
        ) : (
          <p className="text-error mt-4 text-3xl">No hay resultados</p>
        )}
      </div>
    </div>
  );
}
