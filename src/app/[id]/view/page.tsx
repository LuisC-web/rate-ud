import { redirect } from "next/navigation";
import React from "react";
import { getReviews } from "../../../../actions/get-reviews";
import ReviewCard from "@/components/ui/ReviewCard";
import Link from "next/link";

async function ViewTeacher({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  if (!id) redirect("/");

  const { data, error } = await getReviews(id);

  if (error.error || !data) {
    console.error("Error:", error.message);
    return redirect("/");
  }

  return (
    <div className="mt-10 px-10 md:px-15">
      <h1 className="text-2xl md:text-4xl">
        Referencia de {data.name}, Carrera: {data.career.name}
      </h1>

      {data.reviews.length === 0 ? (
        <p className="text-error mt-10 text-2xl">
          No hay reviews disponibles :(.{" "}
          <Link className="text-primary underline" href="/new/review">
            Agregar aqui
          </Link>
        </p>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewTeacher;
