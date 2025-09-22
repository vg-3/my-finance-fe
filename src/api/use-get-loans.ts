import useAxiosPrivate from "@/hooks/use-axios-private";
import { useQuery } from "@tanstack/react-query";

export const useGetLoans = (lenderId: number) => {
  const axiosPrivate = useAxiosPrivate();
  const query = useQuery({
    queryKey: ["loans", lenderId],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/loans/lender/${lenderId}`);
      return res.data;
    },
  });
  return query;
};
