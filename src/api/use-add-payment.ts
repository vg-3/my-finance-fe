import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export interface AddPaymentRequest {
  loanId: number;
  amount: string;
  paymentType: string;
}

const addPayment = async (payment: AddPaymentRequest) => {
  try {
    const res = await axios.put(
      "http://localhost:8080/api/v1/payment",
      payment
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const useAddPayment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPayment,
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
