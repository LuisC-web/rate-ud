"use client";
import TableData from "@/components/TableData";
import { Teacher } from "@/type";
import { Search, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getTeachers } from "../../actions/get-teacher";
import CardData from "@/components/CardData";
import { toast } from "react-toastify";

const TEACHER_FOR_PAGE = 20;

export default function Home() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pages, setPages] = useState({ totalPages: 1, actualPages: 1 });
  const [pageMovil, setPageMovil] = useState(1);
  const [search, setSearch] = useState("");

  // Memoized function to prevent unnecessary recreations and avoid duplicate API calls
  const fetchTeachers = useCallback(
    async (
      searchTerm: string,
      limit: number,
      offset: number = 0,
      isAppending: boolean = false,
      showSuccessToast: boolean = false, // New parameter to control toast display
    ) => {
      setLoading(true);

      try {
        const data = await getTeachers(searchTerm, limit, offset);

        if (data.error.error) {
          toast.error(data.error.message);
          setTeachers([]);
          console.log(data);
          return;
        }

        // Handle data differently based on whether we're appending (infinite scroll) or replacing
        if (isAppending) {
          setTeachers((prev) => [...prev, ...data.data]);
        } else {
          setTeachers(data.data);
          // Only show success toast when explicitly requested (initial load, pagination)
          if (showSuccessToast) {
            toast.success("Profesores cargados correctamente");
          }
        }

        // Update total pages count
        setPages((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.count / TEACHER_FOR_PAGE),
        }));
      } catch (error) {
        toast.error("Error al cargar los profesores");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Handle form submission (when Enter is pressed)
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent page reload
      setPages((prev) => ({ ...prev, actualPages: 1 })); // Reset to page 1
      setPageMovil(1); // Reset mobile page counter
      fetchTeachers(search, TEACHER_FOR_PAGE, 0, false, false); // Execute search
      toast.info("Buscando profes");
    },
    [search, fetchTeachers],
  );

  // Initial load effect - runs only once on component mount
  useEffect(() => {
    fetchTeachers(search, TEACHER_FOR_PAGE, 0, false, true); // Show toast on initial load
  }, []); // Empty dependencies to run only on mount

  // Effect for page changes (desktop pagination only)
  useEffect(() => {
    if (pages.actualPages > 1) {
      // Prevents initial call when actualPages is 1
      const offset = (pages.actualPages - 1) * TEACHER_FOR_PAGE;
      fetchTeachers(search, TEACHER_FOR_PAGE, offset, false, true); // Show toast on pagination
    }
  }, [pages.actualPages, fetchTeachers]);

  // Search effect with debounce to prevent excessive API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPages((prev) => ({ ...prev, actualPages: 1 })); // Reset to page 1 on new search
      setPageMovil(1); // Reset mobile page counter
      fetchTeachers(search, TEACHER_FOR_PAGE, 0, false, false); // NO toast on search
    }, 500); // 500ms debounce delay

    // Cleanup timeout on dependency change
    return () => clearTimeout(timeoutId);
  }, [search, fetchTeachers]);

  // Infinite scroll handler for mobile - memoized to prevent unnecessary re-renders
  const handleChargeInfiniteScroll = useCallback(async () => {
    // Prevent multiple calls if already loading or no more pages
    if (pageMovil >= pages.totalPages || loading) return;

    const offset = pageMovil * TEACHER_FOR_PAGE;
    await fetchTeachers(search, TEACHER_FOR_PAGE, offset, true, false); // No toast for infinite scroll
    setPageMovil((prev) => prev + 1);
  }, [pageMovil, pages.totalPages, loading, search, fetchTeachers]);

  // Memoized handlers for pagination buttons to prevent unnecessary re-renders
  const handlePreviousPage = useCallback(() => {
    setPages((prev) => ({
      ...prev,
      actualPages: prev.actualPages > 1 ? prev.actualPages - 1 : 1,
    }));
  }, []);

  const handleNextPage = useCallback(() => {
    setPages((prev) => ({
      ...prev,
      actualPages:
        prev.actualPages < prev.totalPages
          ? prev.actualPages + 1
          : prev.totalPages,
    }));
  }, []);

  const handlePageClick = useCallback((num: number) => {
    setPages((prev) => ({ ...prev, actualPages: num }));
  }, []);

  // Memoize page numbers array to avoid recreating on every render
  const pageNumbers = useMemo(
    () => Array.from({ length: pages.totalPages }, (_, i) => i + 1),
    [pages.totalPages],
  );

  // Memoize infinite scroll button state to optimize rendering
  const infiniteScrollButtonState = useMemo(
    () => ({
      disabled: loading || pageMovil >= pages.totalPages,
      text: loading
        ? "Cargando..."
        : pageMovil >= pages.totalPages
          ? "NO HAY MAS DATOS"
          : "Cargar mas",
    }),
    [loading, pageMovil, pages.totalPages],
  );

  return (
    <div className="mt-1 flex h-full flex-col px-10">
      <h1 className="text-primary text-4xl">Busca a tu profe...</h1>
      <form onSubmit={handleSubmit}>
        <div className="border-primary mt-5 flex max-w-3xl items-center gap-3 rounded-2xl border px-4 py-2">
          <Search className="text-primary size-5" />
          {/* Controlled input to prevent uncontrolled re-renders */}
          <input
            type="text"
            placeholder="Herrera"
            className="w-full focus:border-0 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      <div className="flex h-full flex-col items-center justify-between pb-5">
        {teachers.length > 0 ? (
          <>
            <TableData teachers={teachers} />
            <CardData teachers={teachers} />

            {/* Desktop pagination with memoized handlers */}
            <div className="mt-2 hidden w-full items-center justify-center gap-2 md:flex">
              <SkipBack
                className="hover:text-primary/80 cursor-pointer"
                onClick={handlePreviousPage}
              />
              <div className="flex gap-2">
                {/* Render memoized page numbers to avoid unnecessary re-computations */}
                {pageNumbers.map((num) => (
                  <div
                    key={num}
                    className={`bg-primary hover:bg-primary/80 cursor-pointer rounded p-2 text-sm text-white ${
                      num === pages.actualPages ? "bg-primary/80" : "bg-primary"
                    }`}
                    onClick={() => handlePageClick(num)}
                  >
                    {num}
                  </div>
                ))}
              </div>
              <SkipForward
                className="hover:text-primary/80 cursor-pointer"
                onClick={handleNextPage}
              />
            </div>

            {/* Infinite scroll button for mobile with optimized state */}
            <button
              className="bg-primary-light text-primary border-primary active:bg-primary-light/80 mt-5 block w-full cursor-pointer rounded-xl border-2 p-2 disabled:cursor-not-allowed disabled:opacity-20 md:hidden"
              onClick={handleChargeInfiniteScroll}
              disabled={infiniteScrollButtonState.disabled}
            >
              {infiniteScrollButtonState.text}
            </button>
          </>
        ) : (
          <p className="text-error mt-4 text-3xl">
            {loading ? "Cargando..." : "No hay resultados"}
          </p>
        )}
      </div>
    </div>
  );
}
