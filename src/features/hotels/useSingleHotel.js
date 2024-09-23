import { useQuery } from "@tanstack/react-query";
import { getSingleHotel } from "../../services/HotelsService";

function useSingleHotel(id) {
  const { data, isLoading } = useQuery({
    queryKey: ["getSingleHotel"],
    queryFn: () => getSingleHotel(id),
  });

  return { data, isLoading };
}

export default useSingleHotel;
