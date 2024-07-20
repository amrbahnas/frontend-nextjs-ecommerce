"use client";
import { Suspense } from "react";
import Success from "./_comps/success";

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Success />
    </Suspense>
  );
};

export default SuccessPage;
