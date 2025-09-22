import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface LoanCreateRequest {
  principalAmount: string;
  interestRate: string;
  loanType: string;
  receiverId: number;
  userId: number;
}

const createLoan = async (newLoan: LoanCreateRequest) => {
  const res = await axios.post("http://localhost:8080/api/v1/loans", newLoan);
  return res.data;
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
  });

  return mutation;
};
