import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../../services/BookmarksService";

export default function useFilterBookmark() {
  const { data, isLoading } = useQuery({
    queryKey: ["getBookmarks"],
    queryFn: getBookmarks,
    
  });
  return { data,isLoading };
}
