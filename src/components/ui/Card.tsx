import { Teacher } from "@/type";
import { redirect } from "next/navigation";

type CardProps = {
  teacher: Teacher;
};
function Card({ teacher }: CardProps) {
  return (
    <div
      className="bg-primary active:bg-primary/80 flex w-full flex-col rounded-xl p-4 text-white md:hidden"
      onClick={() => redirect("/" + teacher.id + "/view")}
    >
      <p className="flex items-center gap-2 text-base">
        Nombre:
        <span className="text-primary-light text-sm">{teacher.name}</span>
      </p>
      <p className="flex items-center gap-2 text-base">
        Carrera:
        <span className="text-primary-light text-sm">
          {teacher.career.name}
        </span>
      </p>
      <p className="flex items-center gap-2 text-base">
        Calificacion:
        <span className="text-primary-light text-sm">{teacher.avg}</span>
      </p>
    </div>
  );
}

export default Card;
