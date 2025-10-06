"use client";

import { LoanCreateRequest, useCreateLoan } from "@/api/use-create-loan";
import { useGetReceivers } from "@/api/use-get-receivers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toLocalDateTimeString } from "@/lib/utils";
import { LoanType } from "@/schema/enum";
import { createLoanSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { CustomSelect } from "./custom-select";
import { DatePicker } from "./date-picker";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { User } from "@/store/store";

interface CreateLoanFormProps {
  user: User;
}

export const CreateLoanForm = ({ user }: CreateLoanFormProps) => {
  const router = useRouter();
  const createLoan = useCreateLoan();

  const { data: receivers, isLoading } = useGetReceivers(user.id);

  const form = useForm<z.infer<typeof createLoanSchema>>({
    resolver: zodResolver(createLoanSchema),
    defaultValues: {
      principalAmount: "",
      loanType: LoanType.WEEKLY,
      startDate: new Date(),
      interestRate: "",
      receiver: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createLoanSchema>) => {
    const loan: LoanCreateRequest = {
      ...values,
      receiverId: parseInt(values.receiver),
      userId: 1,
      startDate: toLocalDateTimeString(values.startDate),
    };

    createLoan.mutate(loan, {
      onSuccess: (data) => {
        router.push(`/loans/${data.loanId}`);
        toast.success("Loan created successfully");
      },
      onError: () => {
        toast.error("Failed to create loan");
      },
    });
  };

  return (
    <div className="p-4 space-y-6 ">
      <header className="flex items-center">
        <ArrowLeft onClick={() => router.back()} />
        <h2 className="text-2xl font-bold text-white mx-auto">Create Laon</h2>
        <div className="w-8" />
      </header>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div
              className="flex flex-col
            gap-y-4"
            >
              <FormField
                control={form.control}
                name="principalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Principal Amount</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Principal Amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker field={field} label="Start Date" />
                )}
              />
              <FormField
                control={form.control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Interest Rate" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loanType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row"
                      >
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value={LoanType.WEEKLY} />
                          </FormControl>
                          <FormLabel className="font-normal">WEEKLY</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center gap-3">
                          <FormControl>
                            <RadioGroupItem value={LoanType.MONTHLY} />
                          </FormControl>
                          <FormLabel className="font-normal">Monthly</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name="receiver"
                control={form.control}
                render={({ field }) => {
                  return (
                    <CustomSelect
                      placeholder={isLoading ? "Loading" : "Select Receiver"}
                      options={receivers}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
              {form.formState.errors.receiver && (
                <p className="text-destructive text-sm">
                  {form.formState.errors.receiver.message}
                </p>
              )}

              <button
                type="submit"
                disabled={false}
                className="bg-sky-400 w-full py-2 rounded-lg text-white font-bold text-lg"
              >
                Create Loan
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
