import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/use-axios-private";

export const useGetReceivers = (lenderId: number) => {
  const axiosPrivate = useAxiosPrivate();
  const query = useQuery({
    queryKey: ["receivers", lenderId],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/receiver/${lenderId}`);
      return res.data;
    },
  });
  return query;
};
