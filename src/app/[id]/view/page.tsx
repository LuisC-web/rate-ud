import { redirect } from "next/navigation";
import React from "react";
import { getReviews } from "../../../../actions/get-reviews";
import ReviewCard from "@/components/ui/ReviewCard";

async function ViewTeacher({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;
  if (!id) redirect("/");
  const getReviewForTeacherId = await getReviews(id);

  return (
    <div className="mt-10 px-15">
      <h1 className="text-4xl">
        Referencia de {getReviewForTeacherId.data.name}, Carrera:
        {getReviewForTeacherId.data.career.name}
      </h1>
      {getReviewForTeacherId.error.error ? (
        <p className="bg-error text-2xl">
          {getReviewForTeacherId.error.message}
        </p>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {getReviewForTeacherId.data.reviews.map((review) => (
            <ReviewCard key={review.id} review={review}></ReviewCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewTeacher;
