import Link from "next/link";
import RateStair from "./RateStair";

async function TableData() {
  return (
    <div className="border-primary mt-10 h-full rounded-2xl border-2 shadow-md">
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
          <tr>
            <td className="px-6 py-4">Juan Pérez</td>
            <td className="px-6 py-4">Ingeniería Electronica</td>
            <td className="px-6 py-4">
              <RateStair></RateStair>
            </td>
            <td className="px-6 py-4">
              <Link href={"/id/view"} className="text-primary hover:underline">
                Ver
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
