import { useQuery } from "@tanstack/react-query";
import { getFilterHotel } from "../../services/HotelsService";

function useFilterHotels(queryString) {
  const { data ,isLoading} = useQuery({
    queryKey: ["getFilterHotels",queryString],
    queryFn: () => getFilterHotel(queryString),

  });
 
  return { data,isLoading };
}

export default useFilterHotels;
