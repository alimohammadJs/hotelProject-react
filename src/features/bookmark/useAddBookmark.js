import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddNewBookmark } from "../../services/BookmarksService";
import { useNavigate } from "react-router-dom";

export default function useAddBookmark() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: addnewBookmark } = useMutation({
    mutationFn: AddNewBookmark,

    onSuccess: () => {
      navigate("/bookmark");
      queryClient.invalidateQueries("getBookmarks");
    },
  });

  return { addnewBookmark, isPending };
}
