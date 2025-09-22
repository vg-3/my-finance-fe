import { Loan } from "@/api/use-get-loan";
import { formatToINR, getUserInitials } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const LoanCard = ({ loan }: { loan: Loan }) => {
  return (
    <Link href={`/loans/${loan.loanId}`}>
      <div className="card p-4 rounded-xl flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full flex-shrink-0">
          {getUserInitials(loan.receiver.name)}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-white text-lg">
              {loan.receiver.name}
            </h3>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                loan.status === "ACTIVE" ? "status-open" : "status-closed"
              }`}
            >
              {loan?.status}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-sm text-gray-400">Remaining</p>
              <p className="font-semibold text-white">
                {formatToINR(loan.remainingAmount)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Principal</p>
              <p className="font-semibold text-white">
                {formatToINR(loan.principalAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
