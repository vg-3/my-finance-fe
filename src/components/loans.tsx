"use client";

import { useGetLoans } from "@/api/use-get-loans";
import { LoanCard } from "./loan-card";
import { Loan } from "@/api/use-get-loan";
import { useAuthStore } from "@/store/store";
import { redirect } from "next/navigation";

const Loans = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    redirect("/sign-in");
  }

  const { data: loans, isLoading } = useGetLoans(user.id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-4 overflow-auto p-4 pb-10 h-full">
      {loans?.length == 0 ? (
        <div className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
          <h6>You don’t have any loans yet</h6>
          <p>Add one to get started</p>
        </div>
      ) : (
        loans?.map((loan: Loan) => {
          return <LoanCard key={loan.loanId} loan={loan} />;
        })
      )}
    </div>
  );
};

export default Loans;
