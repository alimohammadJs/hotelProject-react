import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookmark } from "../../services/BookmarksService";

export default function useDeleteBookmark() {
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteBookmarkItem } = useMutation({
    mutationFn: deleteBookmark,

    onSuccess: () => {
      queryClient.invalidateQueries("getBookmarks");
    },
  });

  return { deleteBookmarkItem, isPending };
}
