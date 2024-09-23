import { useQuery } from "@tanstack/react-query";
import { getHotel } from "../services/HotelsService";

function useHotel() {
  const { data, isLoading } = useQuery({
    queryKey: ["getHotels"],
    queryFn: getHotel,
  });
  return { data, isLoading };
}

export default useHotel;
