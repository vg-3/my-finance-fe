import { Payment } from "@/api/use-get-loan";
import { formatToINR, getDate } from "@/lib/utils";
import React from "react";

interface PaymentHistoryCardProps {
  payment: Payment;
}

export const PaymentHistoryCard = ({ payment }: PaymentHistoryCardProps) => {
  return (
    <div className="card p-3 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-semibold text-white">
          {formatToINR(payment.amountPaid)}
        </p>
        <p className="text-xs text-gray-400 px-1">
          {getDate(payment.paymentDate)}
        </p>
      </div>
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full  ${
          payment.paymentType === "PRINCIPAL"
            ? "chip-principal"
            : "chip-interest"
        }`}
      >
        {payment.paymentType}
      </span>
    </div>
  );
};
