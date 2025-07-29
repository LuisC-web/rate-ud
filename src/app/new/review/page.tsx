"use client";

import AddNewReview from "@/components/newReview/AddNewReview";
import VerifyEmail from "@/components/newReview/VerifyEmail";
import { useState } from "react";

function NewReviewPage() {
  const [verified, setVerified] = useState(false);
  return (
    <div className="flex h-full items-center justify-center px-5 md:w-screen">
      {verified ? (
        <AddNewReview></AddNewReview>
      ) : (
        <VerifyEmail setVerified={() => setVerified(true)}></VerifyEmail>
      )}
    </div>
  );
}

export default NewReviewPage;
