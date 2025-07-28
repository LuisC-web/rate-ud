import { Search } from "lucide-react";

export default async function Home() {
  const teachers = [];
  return (
    <div className="md:px-20 py-10">
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
        {teachers.length ? (
          <></>
        ) : (
          <p className="text-error text-3xl mt-4">No hay resultados</p>
        )}
      </form>
    </div>
  );
}
