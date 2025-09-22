"use client";

import Header from "@/components/header";
import Loans from "@/components/loans";
import { useAuthStore } from "@/store/store";

import Link from "next/link";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-background h-screen max-w-2xl m-auto flex flex-col">
      <div className="sticky top-0 z-10 bg-background border-b-1 ">
        <Header />
      </div>
      <div className="h-full">
        <Loans />
      </div>
      <div className="sticky bottom-0 z-10 bg-background p-4">
        <Link
          href={"/loans/create"}
          className=" block text-center bg-sky-400 w-full py-3 rounded-lg text-white font-bold text-lg"
        >
          Create New Loan
        </Link>
      </div>
    </div>
  );
}
