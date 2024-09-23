import { useQuery } from "@tanstack/react-query";
import { getGeolocationInfo } from "../../services/BookmarksService";

export default function useConvertGeolocation(geolocaion) {
  const { data, isLoading } = useQuery({
    queryKey: ["getLocationInfo", geolocaion],
    queryFn: () => getGeolocationInfo(geolocaion),
  });
  return { data, isLoading };
}
