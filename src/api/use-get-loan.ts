import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type Payment = {
  id: number;
  paymentDate: string;
  amountPaid: number;
  paymentType: string;
};

export type Receiver = {
  id: number;
  name: string;
  contact?: number;
};
export type Lender = {
  id: number;
  name: string;
};
export type Loan = {
  loanId: number;
  principalAmount: number;
  interestRate: number;
  loanType: string;
  status: string;
  startDate: string;
  endDate: string;
  lender: Lender;
  receiver: Receiver;
  payments: Payment[] | [];
  remainingAmount: number;
};

export const getLoan = async (loanId: number) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/v1/loans/${loanId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const useGetLoan = (loanId: number) => {
  const query = useQuery({
    queryKey: ["loan", loanId],
    queryFn: () => getLoan(loanId),
  });
  return query;
};
