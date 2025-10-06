"use client";

import { CreateLoanForm } from "@/components/create-loan-form";
import { CreateReceiverForm } from "@/components/create-receiver-form";
import { useAuthStore } from "@/store/store";
import { redirect } from "next/navigation";
import React from "react";

const LoanCreatePage = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <CreateLoanForm user={user} />
      <CreateReceiverForm />
    </div>
  );
};

export default LoanCreatePage;
