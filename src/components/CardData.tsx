import { Teacher } from "@/type";
import React from "react";
import Card from "./ui/Card";
type CardDataProps = {
  teachers: Teacher[];
};
function CardData({ teachers }: CardDataProps) {
  return (
    <div className="mt-10 w-full space-y-4">
      {teachers.map((teacher) => (
        <Card teacher={teacher} key={teacher.id}></Card>
      ))}
    </div>
  );
}

export default CardData;
