import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../useAxios";

export const getRefreshToken = async () => {
  const res = await axiosPrivate.post("/auth/refresh-token");
  return res.data;
};

export const useRefreshToken = () => {
  const mutation = useMutation({
    mutationFn: getRefreshToken,
    retry: false,
  });

  return mutation;
};
