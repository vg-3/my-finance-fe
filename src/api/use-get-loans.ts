import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getLoans = async (lenderId: number) => {
  const res = await axios.get(
    `http://localhost:8080/api/v1/loans/lender/${lenderId}`
  );
  return res.data;
};

export const useGetLoans = (lenderId: number) => {
  const query = useQuery({
    queryKey: ["loans", lenderId],
    queryFn: () => getLoans(lenderId),
  });
  return query;
};
