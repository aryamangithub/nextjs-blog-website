"use client";
import { Suspense } from "react";
import AuthorForm from "./AuthorForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthorForm />
    </Suspense>
  );
}