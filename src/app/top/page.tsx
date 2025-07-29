"use client";
import Card from "@/components/ui/Card";
import React, { useEffect, useState } from "react";
import { getTopTeacher } from "../../../actions/get-top-teacher";
import { toast } from "react-toastify";
import { Teacher } from "@/type";
import Spinner from "@/components/ui/spinner/Spinner";

function TopTeacher() {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<{
    bestTeacher: Teacher[];
    worstTeacher: Teacher[];
  }>({
    bestTeacher: [],
    worstTeacher: [],
  });
  useEffect(() => {
    const getTopTeachers = async () => {
      setLoading(true);
      const data = await getTopTeacher();
      if (data.error.error) {
        toast.error(data.error.message);
        setLoading(false);

        return;
      }

      if (
        typeof data.data === "object" &&
        data.data !== null &&
        "bestTeachers" in data.data &&
        "worstTeachers" in data.data
      ) {
        setTeachers({
          bestTeacher: data.data.bestTeachers,
          worstTeacher: data.data.worstTeachers,
        });
      }
      setLoading(false);
    };
    getTopTeachers();
  }, []);
  return (
    <div className="text-primary mt-10 h-full w-screen space-y-4 px-10">
      <h1 className="text-4xl">Top de profesores</h1>
      <div className="grid h-full grid-cols-1 gap-10 md:grid-cols-2">
        <div className="border-primary rounded-2xl border-2 p-4">
          <h1 className="text-2xl">Profesores con mejores calificaciones</h1>
          <div className="relative mt-4 flex w-full flex-col items-center justify-center space-y-4">
            {loading ? (
              <Spinner></Spinner>
            ) : (
              teachers.bestTeacher.map((teacher) => (
                <Card
                  teacher={teacher}
                  key={teacher.id}
                  mobile={false}
                  link={false}
                  feedback={true}
                ></Card>
              ))
            )}
          </div>
        </div>
        <div className="border-primary rounded-2xl border-2 p-4">
          <h1 className="text-2xl">Profesores con peores calificaciones</h1>

          <div className="relative mt-4 flex w-full flex-col items-center justify-center space-y-4">
            {loading ? (
              <Spinner></Spinner>
            ) : (
              teachers.worstTeacher.map((teacher) => (
                <Card
                  teacher={teacher}
                  key={teacher.id}
                  mobile={false}
                  link={false}
                  feedback={true}
                ></Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopTeacher;
