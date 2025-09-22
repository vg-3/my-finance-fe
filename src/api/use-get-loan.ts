import useAxiosPrivate from "@/hooks/use-axios-private";
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

export const useGetLoan = (loanId: number) => {
  const axiosPrivate = useAxiosPrivate();
  const query = useQuery({
    queryKey: ["loan", loanId],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/loans/${loanId}`);
      return res.data;
    },
  });
  return query;
};
