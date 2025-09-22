import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../useAxios";

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const signUp = async (user: SignUpRequest) => {
  const res = await axiosPrivate.post("/auth/register", user, {
    withCredentials: true,
  });
  return res.data;
};

export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: signUp,
  });

  return mutation;
};
