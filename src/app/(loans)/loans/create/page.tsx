"use client";

import { CreateLoanForm } from "@/components/create-loan-form";
import { CreateReceiverForm } from "@/components/create-receiver-form";
import { useAuthStore } from "@/store/store";
import React from "react";

const LoanCreatePage = () => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <CreateLoanForm />
      <CreateReceiverForm />
    </div>
  );
};

export default LoanCreatePage;
