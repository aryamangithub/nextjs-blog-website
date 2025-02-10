"use client";
import { Suspense } from "react";
import PostForm from "./PostForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostForm />
    </Suspense>
  );
}