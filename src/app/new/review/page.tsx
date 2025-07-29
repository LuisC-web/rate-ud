"use client";

import AddNewReview from "@/components/newReview/AddNewReview";
import VerifyEmail from "@/components/newReview/VerifyEmail";
import { useEmailVerificationStore } from "@/store/useStoreEmail";

function NewReviewPage() {
  const { isVerified } = useEmailVerificationStore();
  return (
    <div className="flex h-full items-center justify-center p-5 md:w-full">
      {isVerified ? <AddNewReview></AddNewReview> : <VerifyEmail></VerifyEmail>}
    </div>
  );
}

export default NewReviewPage;
