import { Teacher } from "@/type";
import { redirect } from "next/navigation";

type CardProps = {
  teacher: Teacher;
  mobile?: boolean;
  feedback?: boolean;
  comments?: { autor: string; comment: string }[];
};
function Card({
  teacher,
  mobile = true,
  feedback = false,
  comments,
}: CardProps) {
  return (
    <div
      className={`bg-primary active:bg-primary/80 w-full rounded-xl p-4 text-white ${mobile ? "md:hidden" : ""} ${feedback ? "grid grid-cols-1 md:grid-cols-2" : "flex"}`}
      onClick={() => {
        redirect("/" + teacher.id + "/view");
      }}
    >
      <div className="w-full rounded-xl p-4">
        <h1>Datos</h1>
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
      <div
        className={`w-full rounded-xl p-4 text-white ${feedback ? "" : "hidden"}`}
      >
        <h1>Algunos comentarios</h1>
        {comments?.map((comment, index) => (
          <p className="flex items-center gap-2 text-base" key={index}>
            {comment.autor}:
            <span className="text-primary-light text-sm">
              {comment.comment}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default Card;
