"use client";
import RateStair from "@/components/ui/RateStair";
import React, { useEffect, useState } from "react";
import { Teacher } from "@/type";
import { toast } from "react-toastify";
import { getTeachers } from "../../../actions/get-teacher";
import { createReview } from "../../../actions/create-review";
import { Review } from "@prisma/client";
import { useRouter } from "next/navigation";

function AddNewReview() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    user: "",
    score: 0,
    content: "",
    teacherId: "",
  });
  useEffect(() => {
    const getTeacherMountComponent = async () => {
      setLoading(true);
      const dataTeachers = await getTeachers();
      if (dataTeachers.error.error) {
        toast.error(dataTeachers.error.message);
        setTeachers([]);
        setLoading(false);
        return;
      }
      setTeachers(dataTeachers.data);
      setLoading(false);
    };
    getTeacherMountComponent();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData.content);

    if (
      !formData.user.length ||
      !formData.teacherId ||
      !formData.content.length
    ) {
      toast.error("Rellena todos los campos.");
      return;
    }
    const newData: Omit<Review, "id"> = {
      user: formData.user,
      teacherId: +formData.teacherId,
      content: formData.content,
    };
    const response = await createReview(newData, formData.score);
    if (response.error.error) {
      toast.error(response.error.message);
      return;
    }
    toast.success("Review creada con exito");
    router.push("/");
  };
  return (
    <div className="flex h-full w-screen items-center justify-center">
      <div className="border-primary mx-auto w-full max-w-xl rounded-xl border-2 p-5 px-10">
        <h1 className="mb-3 text-2xl">Crea una reseña</h1>
        <form
          className="flex flex-col space-y-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="select-teacher">Seleccione un profesor</label>
            <select
              name="select-teacher"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2"
              defaultValue=""
              value={formData.teacherId}
              onChange={(e) =>
                setFormData({ ...formData, teacherId: e.target.value })
              }
            >
              <option value="">Seleccione un profesor</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="select-career">Usuario:</label>
            <input
              name="user"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2 focus:outline-0"
              value={formData.user}
              onChange={(e) =>
                setFormData({ ...formData, user: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="rate-teacher">Calificacion:</label>
            <RateStair
              rating={formData.score}
              select={true}
              onChange={(value) => setFormData({ ...formData, score: value })}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="review-teacher">Reseña:</label>
            <textarea
              name="review-teacher"
              id="review-teacher"
              placeholder="Escribe una reseña..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="placeholder-primary-light border-primary h-40 resize-none overflow-y-auto rounded-xl border-2 p-7 focus:outline-0 md:h-64"
            ></textarea>
          </div>
          <input
            type="submit"
            disabled={loading}
            className="bg-primary-light text-primary border-primary active:bg-primary-light/80 hover:bg-primary-light/80 cursor-pointer rounded-2xl border-2 p-3"
            value="Enviar reseña"
          />
        </form>
      </div>
    </div>
  );
}

export default AddNewReview;
