import useAxiosPrivate from "@/hooks/use-axios-private";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface LoanCreateRequest {
  principalAmount: string;
  interestRate: string;
  loanType: string;
  receiverId: number;
  userId: number;
}

export const useCreateLoan = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newLoan: LoanCreateRequest) => {
      const res = await axiosPrivate.post("/loans", newLoan);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
  });

  return mutation;
};
