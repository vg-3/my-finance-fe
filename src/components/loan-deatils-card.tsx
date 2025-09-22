import { Loan } from "@/api/use-get-loan";
import { formatToINR, getDate } from "@/lib/utils";
import React from "react";

interface LoanDetailsCardProps {
  loan: Loan;
}

export const LoanDetailsCard = ({ loan }: LoanDetailsCardProps) => {
  return (
    <div className="card p-5 rounded-xl space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Total Amount</p>
          <p className="text-3xl font-bold text-white">
            {formatToINR(loan?.principalAmount)}
          </p>
        </div>
        <span
          className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
            loan?.status === "ACTIVE" ? "status-open" : "status-closed"
          }`}
        >
          {loan?.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-xs text-gray-400">Loan Type</p>
          <p className="font-semibold text-white">{loan?.loanType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Start Date</p>
          <p className="font-semibold text-white">{getDate(loan?.startDate)}</p>
        </div>

        {loan?.loanType === "WEEKLY" && (
          <div>
            <p className="text-xs text-gray-400">End Date</p>
            <p className="font-semibold text-white">{getDate(loan?.endDate)}</p>
          </div>
        )}

        <div>
          <p className="text-xs text-gray-400">Remaining</p>
          <p className="font-bold accent-text text-lg">
            {formatToINR(loan?.remainingAmount)}
          </p>
        </div>
      </div>
    </div>
  );
};
