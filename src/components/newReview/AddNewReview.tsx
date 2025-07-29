"use client";
import RateStair from "@/components/ui/RateStair";
import React, { useEffect, useState } from "react";
import { Teacher } from "@/type";
import { Career } from "@prisma/client";
import { toast } from "react-toastify";
import { getTeachers } from "../../../actions/get-teacher";
import { getCareers } from "../../../actions/get-career";

function AddNewReview() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
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
  return (
    <div className="flex h-full items-center justify-center px-5 md:w-screen">
      <div className="border-primary mx-auto w-full max-w-xl rounded-xl border-2 p-5 px-10">
        <h1 className="mb-3 text-2xl">Crea una reseña</h1>
        <form className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="select-teacher">Seleccione un profesor</label>
            <select
              name="select-teacher"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2"
              defaultValue=""
            >
              <option value="">Seleccione un profesor</option>
              {teachers.map((teacher) => (
                <option key={teacher.id}>{teacher.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="select-career">Seleccione una carrera:</label>
            <select
              name="select-career"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2"
              defaultValue=""
            >
              <option value="">Seleccione una carrera</option>
              {careers.map((career) => (
                <option key={career.id}>{career.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="rate-teacher">Calificacion:</label>
            <RateStair></RateStair>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="review-teacher">Reseña:</label>
            <textarea
              name="review-teacher"
              id="review-teacher"
              placeholder="Escribe una reseña..."
              className="placeholder-primary-light border-primary h-40 resize-none overflow-y-auto rounded-xl border-2 p-7 focus:outline-0 md:h-64"
            ></textarea>
          </div>
          <input
            type="submit"
            className="bg-primary-light text-primary border-primary rounded-2xl border-2 p-3"
            value="Enviar reseña"
          />
        </form>
      </div>
    </div>
  );
}

export default AddNewReview;
