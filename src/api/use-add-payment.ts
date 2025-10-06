import useAxiosPrivate from "@/hooks/use-axios-private";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface AddPaymentRequest {
  loanId: number;
  amount: string;
  paymentType: string;
  paymentDate: string;
}

export const useAddPayment = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payment: AddPaymentRequest) => {
      const res = await axiosPrivate.put("/payment", payment);
      return res.data;
    },
    onSuccess: ({ loanId }) => {
      toast.success("Payment successfully");
      queryClient.invalidateQueries({ queryKey: ["loan", loanId] });
    },
    onError: () => {
      toast.error("Payment failed. Please try again.");
    },
  });

  return mutation;
};
