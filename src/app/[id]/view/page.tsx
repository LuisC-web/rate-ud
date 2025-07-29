import { redirect } from "next/navigation";
import React from "react";
import { getReviews } from "../../../../actions/get-reviews";
import ReviewCard from "@/components/ui/ReviewCard";

async function ViewTeacher({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  if (!id) redirect("/");

  const { data, error } = await getReviews(id);

  if (error.error || !data) {
    // Puedes loguear el error si quieres, pero no usar toast
    console.error("Error:", error.message);
    return redirect("/");
  }

  return (
    <div className="mt-10 px-10 md:px-15">
      <h1 className="text-2xl md:text-4xl">
        Referencia de {data.name}, Carrera: {data.career.name}
      </h1>

      <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default ViewTeacher;
