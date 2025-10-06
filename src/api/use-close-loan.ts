import useAxiosPrivate from "@/hooks/use-axios-private";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCloseLoan = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (loanId: number) => {
      const res = await axiosPrivate.put(`loans/${loanId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
  });

  return mutation;
};
