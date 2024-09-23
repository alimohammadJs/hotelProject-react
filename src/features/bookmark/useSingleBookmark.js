import { useQuery } from "@tanstack/react-query";
import {getSingleBookmark } from "../../services/BookmarksService";

export default function useSingleBookmark(id) {
  const { data ,isLoading} = useQuery({
    queryKey: ["getSingleBookmark"],
    queryFn: ()=> getSingleBookmark(id),
  });
  return {data,isLoading}
}
