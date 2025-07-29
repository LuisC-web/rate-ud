import Link from "next/link";
import RateStair from "./ui/RateStair";
import { Teacher } from "@/type";
type TableDataProps = {
  teachers: Teacher[];
};

function TableData({ teachers }: TableDataProps) {
  return (
    <div className="border-primary mt-10 hidden h-full w-full rounded-2xl border-2 shadow-md md:table">
      <table className="divide-primary w-full divide-y">
        <thead className="bg-primary text-left text-white">
          <tr>
            <th className="px-6 py-3 font-medium">Nombre</th>
            <th className="px-6 py-3 font-medium">Carrera</th>
            <th className="px-6 py-3 font-medium">Calificación</th>
            <th className="px-6 py-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-primary text-primary divide-y text-sm">
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="px-6 py-4">{teacher.name}</td>
              <td className="px-6 py-4">{teacher.career.name}</td>
              <td className="px-6 py-4">
                <RateStair rating={teacher.avg}></RateStair>
              </td>
              <td className="px-6 py-4">
                <Link
                  href={"/" + teacher.id + "/view"}
                  className="text-primary hover:underline"
                >
                  Ver referencias
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
