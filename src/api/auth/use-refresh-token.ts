import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../../hooks/axios";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";

export const getRefreshToken = async () => {
  const res = await axiosPrivate.post("/auth/refresh-token");
  return res.data;
};

export const useRefreshToken = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const mutation = useMutation({
    mutationFn: getRefreshToken,
    retry: false,
    onSuccess: (data) => {
      setAuth({ accessToken: data.accessToken, user: data.user });
    },
    onError: () => {
      router.replace("/sign-in");
    },
  });

  return mutation;
};
