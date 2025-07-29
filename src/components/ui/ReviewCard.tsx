"use client";
import React from "react";
import RateStair from "./RateStair";
import { ReviewType } from "@/type";

function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <div className="bg-thrid flex flex-col rounded-xl p-5">
      <p className="flex items-center gap-2 text-base">
        Por:
        <span className="text-primary text-sm">{review.user}</span>
      </p>
      <div className="flex flex-col">
        <p className="text-base">Referencia:</p>
        <span className="text-primary text-sm">{review.content}</span>
      </div>
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-base">Calificacion:</p>
        <RateStair rating={review.score?.value}></RateStair>
      </div>
    </div>
  );
}

export default ReviewCard;
