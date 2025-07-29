"use client";
import RateStair from "@/components/ui/RateStair";
import React, { useEffect, useState } from "react";
import { Teacher } from "@/type";
import { toast } from "react-toastify";
import { createReview } from "../../../actions/create-review";
import { Career, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEmailVerificationStore } from "@/store/useStoreEmail";
import ProfessorDropdown from "../ui/ProfessorDropdown";
import { getCareers } from "../../../actions/get-career";
import { getTeachersById } from "../../../actions/get-teacher-by-careerId";

function AddNewReview() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    user: "",
    score: 0,
    content: "",
    teacherId: "",
    careerId: "",
  });
  const { email, code, reset } = useEmailVerificationStore();
  useEffect(() => {
    const getTeacherMountComponent = async () => {
      setLoading(true);
      const dataCareers = await getCareers();
      if (dataCareers.error.error) {
        toast.error(dataCareers.error.message);
        setCareers([]);
        setLoading(false);
        return;
      }
      setCareers(dataCareers.data);
      setLoading(false);
    };
    getTeacherMountComponent();
  }, []);
  useEffect(() => {
    const getTeacherMountComponent = async () => {
      setLoading(true);
      const dataTeachers = await getTeachersById(+formData.careerId);
      if (dataTeachers.error.error) {
        toast.error(dataTeachers.error.message);
        setTeachers([]);
        setLoading(false);
        return;
      }
      setTeachers(dataTeachers.data as Teacher[]);
      setLoading(false);
    };
    getTeacherMountComponent();
  }, [formData.careerId]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

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
      email,
    };
    const response = await createReview(newData, formData.score, code);
    if (response.error.error) {
      toast.error(response.error.message);
      return;
    }
    toast.success("Refenerencia creada");
    reset();
    router.push("/");
  };
  return (
    <div className="flex h-full w-screen items-center justify-center">
      <div className="border-primary mx-auto w-full max-w-3xl rounded-xl border-2 p-5 md:px-10">
        <h1 className="mb-3 text-2xl">Crea una reseña</h1>
        <form
          className="flex flex-col space-y-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Correo</label>
            <input
              name="email"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2 focus:outline-0 disabled:cursor-not-allowed disabled:opacity-80"
              placeholder="example@udistrital.edu.co"
              disabled={true}
              defaultValue={email}
              type="email"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="select-teacher">Carrera</label>
            <select
              name="select-teacher"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2"
              value={formData.careerId}
              onChange={(e) =>
                setFormData({ ...formData, careerId: e.target.value })
              }
            >
              <option value="">Seleccione un profesor</option>
              {careers.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="select-teacher">Seleccione un profesor</label>
            <ProfessorDropdown
              teachers={teachers}
              onSelectTeacher={(id) =>
                setFormData({ ...formData, teacherId: id.toString() })
              }
            />
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
              className="placeholder-primary-light border-primary h-40 resize-none overflow-y-auto rounded-xl border-2 p-7 focus:outline-0"
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
