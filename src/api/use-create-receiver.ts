import useAxiosPrivate from "@/hooks/use-axios-private";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface ReceiverCreateRequest {
  name: string;
  contact: string;
  lenderId: number;
}

export const useCreateReceiver = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (receiver: ReceiverCreateRequest) => {
      const res = await axiosPrivate.post("/receiver", receiver);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receivers"] });
    },
  });

  return mutation;
};
