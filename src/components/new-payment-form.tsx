"use client";

import { AddPaymentRequest, useAddPayment } from "@/api/use-add-payment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoanType } from "@/schema/enum";
import { addPaymentSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { CustomSelect } from "./custom-select";
import { Input } from "./ui/input";
import { Loan } from "@/api/use-get-loan";
import { toast } from "sonner";

interface NewPaymentFormProps {
  loan: Loan;
  closeForm: () => void;
}

export const NewPaymentForm = ({ loan, closeForm }: NewPaymentFormProps) => {
  const addPayment = useAddPayment();
  const paymentTypeOptions =
    loan.loanType === LoanType.WEEKLY
      ? [{ id: "EMI", name: "EMI" }]
      : [
          { id: "INTEREST", name: "Interest" },
          { id: "PRINCIPAL", name: "Principal" },
        ];

  const form = useForm<z.infer<typeof addPaymentSchema>>({
    resolver: zodResolver(addPaymentSchema),
    defaultValues: {
      amount: "",
      paymentType: "",
    },
  });

  const handleAddPayment = (values: z.infer<typeof addPaymentSchema>) => {
    if (parseInt(values.amount) > loan.remainingAmount) {
      toast.error("Payment amount exceeds remaining amount");
      return;
    }

    const payment: AddPaymentRequest = {
      ...values,
      loanId: loan.loanId,
    };

    console.log(payment);

    addPayment.mutate(payment, {
      onSuccess: () => {
        form.reset();
        closeForm();
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddPayment)}
          className="space-y-4"
        >
          <div
            className="flex flex-col
            gap-y-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Amount" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              name="paymentType"
              control={form.control}
              render={({ field }) => {
                return (
                  <CustomSelect
                    placeholder="Select Payment Type"
                    options={paymentTypeOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                );
              }}
            />
            {form.formState.errors.paymentType && (
              <p className="text-destructive text-sm">
                {form.formState.errors.paymentType.message}
              </p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 rounded-lg text-white font-bold text-sm min-w-22"
            >
              Add
            </button>
            <button
              type="button"
              className="bg-[#2a2a2a] px-4 py-2 rounded-lg text-white font-bold text-sm min-w-22"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
