import { z } from "zod";
import { LoanType } from "./enum";

export const createLoanSchema = z.object({
  principalAmount: z
    .string()
    .min(1, { message: "Principal amount is required" }),
  interestRate: z.string().min(1, { message: "Interest rate is required" }),
  loanType: z.enum(LoanType),
  startDate: z.date().min(1, { message: "Start date is required" }),
  receiver: z.string().min(1, { message: "Receiver is required" }),
});

export const createReceiverSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  contact: z.string().min(10, { message: "Phone number is required" }),
});

export const addPaymentSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  paymentType: z.string().min(1, { message: "Payment Type is required" }),
  paymentDate: z.date().min(1, { message: "Payment date is required" }),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "first name is required"),
  lastName: z.string().trim().min(1, "last name is required"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});
