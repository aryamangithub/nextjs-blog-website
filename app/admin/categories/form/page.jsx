"use client";
import { Suspense } from "react";
import CategoryForm from "./CategoryForm"; // Import the form component

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryForm />
    </Suspense>
  );
}