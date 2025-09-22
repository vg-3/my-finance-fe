import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface ReceiverCreateRequest {
  name: string;
  contact: string;
  lenderId: number;
}

const createReceiver = async (receiver: ReceiverCreateRequest) => {
  const res = await axios.post(
    "http://localhost:8080/api/v1/receiver",
    receiver
  );
  return res.data;
};

export const useCreateReceiver = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReceiver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receivers"] });
    },
  });

  return mutation;
};
