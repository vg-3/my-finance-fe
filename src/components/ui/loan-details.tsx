"use client";

import { Payment, useGetLoan } from "@/api/use-get-loan";
import { LoanDetailsCard } from "@/components/loan-deatils-card";
import { PaymentHistoryCard } from "@/components/payment-history-card";
import { useConfirm } from "@/hooks/useConfirm";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NewPaymentForm } from "../new-payment-form";
import { useAuthStore } from "@/store/store";
import { useDeleteLoan } from "@/api/use-delete-loan";
import { useCloseLoan } from "@/api/use-close-loan";

export default function LoanDetails({ loanId }: { loanId: number }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const { data: loan } = useGetLoan(loanId);
  const deleteLoan = useDeleteLoan();
  const closeLoan = useCloseLoan();

  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);

  const [CloseConfrimationDrawer, confirmClose] = useConfirm({
    title: "Are you sure?",
    description:
      "This action will permanently close this loan and cannot be undone.",
  });
  const [DeleteConfirmationDrawer, confirmDelete] = useConfirm({
    title: "Are you sure?",
    description:
      "This action will permanently close this loan and cannot be undone.",
  });
  const handleClose = async () => {
    const ok = await confirmClose();
    if (!ok) return;
    closeLoan.mutate(loanId, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteLoan.mutate(loanId, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  const handleShowPaymentForm = async () => {
    setIsPaymentFormVisible(true);
  };
  const handleClosePaymentForm = async () => {
    setIsPaymentFormVisible(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <CloseConfrimationDrawer />
      <DeleteConfirmationDrawer />
      {/* Header */}
      <header className="flex items-center space-between">
        <ArrowLeft onClick={() => router.push("/")} />
        <h2 className="text-2xl font-bold text-white mx-auto">Loan Details</h2>
        <EllipsisVertical />
      </header>
      {/* Loan Summaary */}
      <LoanDetailsCard loan={loan} />
      {/* Payment History */}
      <div>
        <div className="flex justify-between items-center flex-row mb-3">
          <h3 className="text-lg font-semibold text-white">Payment History</h3>
          {loan?.status === "ACTIVE" && (
            <button
              className="bg-green-600 px-4 py-2 rounded-lg text-white font-bold text-sm"
              onClick={handleShowPaymentForm}
            >
              New payment
            </button>
          )}
        </div>
        {isPaymentFormVisible && (
          <div className="mb-3">
            <NewPaymentForm loan={loan} closeForm={handleClosePaymentForm} />
          </div>
        )}
        {loan?.payments?.length > 0 ? (
          <div className="space-y-3 pb-16">
            {loan?.payments?.map((payment: Payment) => (
              <PaymentHistoryCard payment={payment} key={payment.id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 h-full flex flex-col justify-center items-center">
            No payments yet.
          </p>
        )}
      </div>

      {/* Action Button (Close Loan) */}
      {loan?.status === "ACTIVE" && (
        <div className="fixed bottom-0 left-0 w-full z-10 bg-background">
          <div className="max-w-2xl mx-auto p-4 flex flex-row gap-4">
            <button
              className="bg-green-600 w-full px-4 py-2 rounded-lg text-white font-bold text-sm"
              onClick={handleClose}
            >
              Close Loan
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 w-full px-4 py-2 rounded-lg text-white font-bold text-sm"
            >
              Delete Loan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
