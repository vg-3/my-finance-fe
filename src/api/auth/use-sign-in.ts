import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../../hooks/axios";

export interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async (user: SignInRequest) => {
  const res = await axiosPrivate.post("/auth/authenticate", user);
  return res.data;
};

export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: signIn,
  });

  return mutation;
};
