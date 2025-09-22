import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getReceivers = async (lenderId: number) => {
  const res = await axios.get(
    `http://localhost:8080/api/v1/receiver/${lenderId}`
  );
  return res.data;
};

export const useGetReceivers = (lenderId: number) => {
  const query = useQuery({
    queryKey: ["receivers", lenderId],
    queryFn: () => getReceivers(lenderId),
  });
  return query;
};
